const { server, io } = require("./socket");
const result_consumer = require("./kafka/result-consumer");
const crawl_producer = require("./kafka/crawl-producer");
const SERVER_PORT = require("./env").SERVER_PORT;
const { TestCollection, productdetails, analyses } = require("./models");

function dotp(x, y) {
  function dotp_sum(a, b) {
    return a + b;
  }
  function dotp_times(a, i) {
    return x[i] * y[i];
  }
  return x.map(dotp_times).reduce(dotp_sum, 0);
}

function cosineSimilarity(A, B) {
  var similarity =
    dotp(A, B) /
    ((Math.sqrt(dotp(A, A)) + 0.00000001) *
      (Math.sqrt(dotp(B, B)) + 0.00000001));
  return similarity;
}

io.on("connection", function (socket) {
  console.log("connected", socket.id);

  crawl_producer.init();
  result_consumer.init();

  socket.on("send message", ({ searchItem }) => {
    const msg = searchItem;
    TestCollection.findOne({ keyword: msg })
      .then(async (keyword) => {
        if (keyword) {
          const { products } = keyword;
          let keywords = {};
          for (productRef in products) {
            const product = await productdetails.findById(
              products[productRef]["oid"]
            );
            const analysis = await analyses.findById(product.analysis["oid"]);
            const result = analysis.result;
            const key = Object.keys(result[0]);
            const values = Object.values(result[0]);
            for (let idx = 0; idx < key.length; idx++) {
              let value = values[idx]["POS"];
              if (key[idx] in keywords) {
                keywords[key[idx]] += value;
              } else {
                keywords[key[idx]] = value;
              }
            }
          }
          result = [];
          for (key in keywords) {
            temp = {};
            temp.keyword = key;
            temp.count = keywords[key];
            result.push(temp);
          }

          result.sort(function (a, b) {
            return b.count - a.count;
          });

          real = result.map((dict) => {
            return dict.keyword;
          });

          io.emit("keywords", real);
        } else {
          crawl_producer.sendMessage(msg);
        }
      })
      .catch((err) => {
        console.log(err);
        // crawl_producer.sendMessage(msg);
      });
  });

  socket.on("selected keywords", function ({ searchItem, likeword, hateword }) {
    TestCollection.findOne({ keyword: searchItem })
      .then(async (keyword) => {
        if (keyword) {
          const { products } = keyword;
          let productlist = [];
          const keywords = [];
          for (productRef in products) {
            let product = await productdetails.findById(
              products[productRef]["oid"]
            );
            const analy = await analyses.findById(product.analysis["oid"]);
            const allKeywords = Object.keys(analy["result"][0]);
            const posKeywords = likeword.filter(
              (keyword) =>
                allKeywords.includes(keyword) &&
                analy["result"][0][keyword]["POS"] >
                  analy["result"][0][keyword]["NEG"]
            );
            const negKeywords = hateword.filter(
              (keyword) =>
                allKeywords.includes(keyword) &&
                analy["result"][0][keyword]["POS"] <
                  analy["result"][0][keyword]["NEG"]
            );
            allKeywords.map((keyword) => {
              if (!keywords.includes(keyword)) keywords.push(keyword);
            });

            const { _id, imageUrl, name, price, url } = product._doc;
            productlist.push({
              _id,
              name,
              price,
              imageUrl,
              url,
              posKeywords,
              negKeywords,
              allKeywords: analy["result"][0],
            });
          }

          good_vec = [];
          bad_vec = [];

          keywords.map((keyword) => {
            good_vec.push(likeword.includes(keyword) ? 1 : 0);
            bad_vec.push(hateword.includes(keyword) ? 1 : 0);
          });

          for (product_ in productlist) {
            product = productlist[product_];
            const { allKeywords } = product;
            if (allKeywords) {
              const allKeywords_ = Object.keys(allKeywords);
              product_good_vec = [];
              product_bad_vec = [];
              for (keyword_ in keywords) {
                keyword = keywords[keyword_];
                if (
                  allKeywords_.includes(keyword) &&
                  likeword.includes(keyword)
                ) {
                  if (allKeywords[keyword]["POS"] == 0) {
                    product_good_vec.push(0);
                  } else {
                    product_good_vec.push(
                      allKeywords[keyword]["POS"] /
                        (allKeywords[keyword]["POS"] +
                          allKeywords[keyword]["NEG"])
                    );
                  }
                } else {
                  product_good_vec.push(0);
                }

                if (
                  allKeywords_.includes(keyword) &&
                  hateword.includes(keyword)
                ) {
                  if (allKeywords[keyword]["NEG"] == 0) {
                    product_bad_vec.push(0);
                  } else {
                    product_bad_vec.push(
                      allKeywords[keyword]["NEG"] /
                        (allKeywords[keyword]["POS"] +
                          allKeywords[keyword]["NEG"])
                    );
                  }
                } else {
                  product_bad_vec.push(0);
                }
              }

              good_sim = cosineSimilarity(good_vec, product_good_vec);
              bad_sim = cosineSimilarity(bad_vec, product_bad_vec);

              let alpha = 0;
              if (bad_sim != 0 || good_sim != 0) {
                alpha = bad_sim / (good_sim + bad_sim);
              }

              product["sim"] = good_sim - alpha;
            }
          }

          productlist.sort(function (a, b) {
            return b.sim - a.sim;
          });

          io.emit("productlist", productlist);
        }
      })
      .catch((err) => console.log(err));
  });

  socket.on("disconnect", function () {
    console.log("disconnected", socket.id);
  });
});

server.listen(+SERVER_PORT);
server.on("listening", () => {
  const addr = server.address();
  console.log(`Server running on ${addr.address}:${addr.port}`);
});

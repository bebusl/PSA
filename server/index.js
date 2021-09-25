const { server, io } = require("./socket");
const result_consumer = require("./kafka/result-consumer");
const crawl_producer = require("./kafka/crawl-producer");
const SERVER_PORT = require("./env").SERVER_PORT;
const { TestCollection, productdetails, analyses } = require("./models");

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
                        const product = await productdetails.findById(products[productRef]["oid"]);
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
                    for (productRef in products) {
                        let product = await productdetails.findById(products[productRef]["oid"]);
                        const analy = await analyses.findById(product.analysis["oid"]);
                        const allKeywords = Object.keys(analy["result"][0]);
                        const posKeywords = likeword.filter(
                            (keyword) =>
                                allKeywords.includes(keyword) &&
                                analy["result"][0][keyword]["POS"] > analy["result"][0][keyword]["NEG"]
                        );
                        const negKeywords = hateword.filter(
                            (keyword) =>
                                allKeywords.includes(keyword) &&
                                analy["result"][0][keyword]["POS"] < analy["result"][0][keyword]["NEG"]
                        );

                        const { _id, imageUrl, name, price, url } = product._doc;
                        product = { _id, name, price, imageUrl, url, posKeywords, negKeywords };
                        productlist.push(product);
                    }
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

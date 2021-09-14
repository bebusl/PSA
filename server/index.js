const { server, io } = require("./socket");
const result_consumer = require("./kafka/result-consumer");
const crawl_producer = require("./kafka/crawl-producer");
const { SERVER_PORT } = require("./env");
const { TestCollection, productdetails, analyses } = require("./models");

io.on("connection", function (socket) {
    console.log("connected");

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
                        for (idx in result) {
                            console.log(result[idx]);
                            const key = Object.keys(result[idx])[0];
                            const value = Object.values(result[idx])[0]["POS"];
                            if (key in keywords) {
                                keywords[key] += value;
                            } else {
                                keywords[key] = value;
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

                    console.log(real);

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
                        const product = await productdetails.findById(products[productRef]["oid"]);
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

const { Kafka } = require("kafkajs");
const { TestCollection, productdetails, analyses } = require("../models");
const { io } = require("../socket");

const { KAFKA_BOOTSTRAP_SERVER, RESULT_CLINET_ID, RESULT_GROUP_ID, RESULT_TOPIC } = require("../env");

const kafka = new Kafka({
    brokers: [KAFKA_BOOTSTRAP_SERVER],
    clientId: RESULT_CLINET_ID,
});

function sort_object(dict) {
    var sorted = [];
    for (var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    var tempDict = {};
    for (var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
}

const init = async () => {
    const consumer = kafka.consumer({ groupId: RESULT_GROUP_ID });
    await consumer.connect();
    await consumer.subscribe({ topic: RESULT_TOPIC });
    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (topic == RESULT_TOPIC) {
                keywordId = message.value.toString();
                try {
                    const keyword = await TestCollection.findById(keywordId);
                    const { products } = keyword;
                    let keywords = {};
                    for (productRef in products) {
                        const product = await productdetails.findById(products[productRef]["oid"]);
                        const analysis = await analyses.findById(product.analysis["oid"]);
                        const result = analysis.result;
                        const key = Object.keys(result[0]);
                        const values = Object.values(result[0]);

                        for (let idx = 0; idx < key.length; idx++) {
                            if (key[idx] in keywords) {
                                keywords[key[idx]] += values[idx]["POS"];
                            } else {
                                keywords[key[idx]] = values[idx]["POS"];
                            }
                        }
                    }
                    sorted_result = sort_object(keywords);
                    io.emit("keywords", Object.keys(sorted_result));
                } catch (e) {
                    console.log(e);
                }
            }
        },
    });

    return consumer;
};

module.exports = {
    init,
};

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
                    let poskeywords = {};
                    let negkeywords = {};
                    for (productRef in products) {
                      const product = await productdetails.findById(
                        products[productRef]["oid"]
                      );
                      const analysis = await analyses.findById(product.analysis["oid"]);
                      const result = analysis.result;
                      const key = Object.keys(result[0]);
                      const values = Object.values(result[0]);
                      for (let idx = 0; idx < key.length; idx++) {
                        let posvalue = values[idx]["POS"];
                        let negvalue = values[idx]["NEG"];
          
                        if (key[idx] in poskeywords) {
                          poskeywords[key[idx]] += posvalue;
                        } else {
                          poskeywords[key[idx]] = posvalue;
                        } //키워드에 대한 긍정적 키워드 수 카운트
          
                        if (key[idx] in negkeywords) {
                          negkeywords[key[idx]] += negvalue;
                        } else {
                          negkeywords[key[idx]] = negvalue;
                        } //키워드에 대한 부정적 키워드 수 카운트
                      }
                    }
                    let posresult = [];
                    let negresult = [];
                    for (key in poskeywords) {
                      temp = {};
                      temp.keyword = key;
                      temp.count = poskeywords[key];
                      if (temp.count !== 0) {
                        posresult.push(temp);
                      }
                    }
          
                    for (key in negkeywords) {
                      temp = {};
                      temp.keyword = key;
                      temp.count = negkeywords[key];
                      if (temp.count !== 0) {
                        negresult.push(temp);
                      }
                    }
          
                    posresult.sort(function (a, b) {
                      return b.count - a.count;
                    });
          
                    negresult.sort(function (a, b) {
                      return b.count - a.count;
                    });
          
                    posreal = posresult.map((dict) => dict.keyword);
                    negreal = negresult.map((dict) => dict.keyword);
          
                    io.emit("keywords", posreal, negreal);
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

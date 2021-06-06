const { Kafka } = require("kafkajs");

const {
  KAFKA_BOOTSTRAP_SERVER,
  CRAWL_CLIENT_ID,
  CRAWL_GROUP_ID,
  CRAWL_TOPIC,
} = require("../env");

const kafka = new Kafka({
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  clientId: CRAWL_CLIENT_ID,
});

const producer = kafka.producer({ groupId: CRAWL_GROUP_ID });

const sendMessage = (searchItem) => {
  return producer
    .send({
      topic: CRAWL_TOPIC,
      messages: [{ value: searchItem }],
    })
    .then(console.log)
    .catch((e) => console.error(`[result-producer] ${e.message}`, e));
};

const init = async () => {
  await producer.connect();
};

module.exports = {
  init,
  sendMessage,
};

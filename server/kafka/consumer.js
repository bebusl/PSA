const { Kafka } = require("kafkajs");

const {
  KAFKA_BOOTSTRAP_SERVER,
  CRAWL_CLINET_ID,
  CRAWL_GROUP_ID,
  CRAWL_TOPIC,
} = require("../env");

const kafka = new Kafka({
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  clientId: CRAWL_CLINET_ID,
});

const init = async () => {
  const consumer = kafka.consumer({ groupId: CRAWL_GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic: CRAWL_TOPIC });
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `topic: ${topic}, partition: ${partition}, message: ${message} `
      );
    },
  });

  return consumer;
};

module.exports = {
  init,
};

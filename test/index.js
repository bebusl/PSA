const { Kafka } = require("kafkajs");

const {
  KAFKA_BOOTSTRAP_SERVER,
  CRAWL_CLINET_ID,
  CRAWL_GROUP_ID,
  CRAWL_TOPIC,
} = require("./env");

const kafka = new Kafka({
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  clientId: CRAWL_CLINET_ID,
});

const producer = kafka.producer({ groupId: CRAWL_GROUP_ID });

const sendMessage = () => {
  return producer
    .send({
      topic: CRAWL_TOPIC,
      messages: [
        {
          value: "안녕하세요",
        },
      ],
    })
    .then(console.log)
    .catch((e) => console.error(`[test-producer] ${e.message}`, e));
};

const run = async () => {
  await producer.connect();
  setInterval(sendMessage, 1000);
};

run().catch((e) => console.error(`[test-producer] ${e.message}`, e));

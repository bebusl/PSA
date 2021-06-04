const { Kafka } = require("kafkajs");

const {
  KAFKA_BOOTSTRAP_SERVER,
  RESULT_CLINET_ID,
  RESULT_GROUP_ID,
  RESULT_TOPIC,
} = require("./env");

const kafka = new Kafka({
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  clientId: RESULT_CLINET_ID,
});

const producer = kafka.producer({ groupId: RESULT_GROUP_ID });

const sendMessage = () => {
  return producer
    .send({
      topic: RESULT_TOPIC,
      messages: [
        {
          value: "안녕하세요",
        },
      ],
    })
    .catch((e) => console.error(`[test-producer] ${e.message}`, e));
};

const run = async () => {
  await producer.connect();
  setInterval(sendMessage, 1000);
};

run().catch((e) => console.error(`[test-producer] ${e.message}`, e));

const { Kafka } = require("kafkajs");

const { KAFKA_BOOTSTRAP_SERVER, TEST_CLINET_ID, TEST_TOPIC } = require("./env");

const kafka = new Kafka({
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  clientId: TEST_CLINET_ID,
});

const producer = kafka.producer({});

const sendMessage = () => {
  return producer
    .send({
      topic: "result",
      messages: [
        {
          value: "안녕하세요",
        },
      ],
    })
    .then((data) => console.log(data))
    .catch((e) => console.error(`[test-producer] ${e.message}`, e));
};

const run = async () => {
  await producer.connect();
  setInterval(sendMessage, 10000);
};

run().catch((e) => console.error(`[test-producer] ${e.message}`, e));

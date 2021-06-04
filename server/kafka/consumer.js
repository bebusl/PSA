const { Kafka } = require("kafkajs");

const {
  KAFKA_BOOTSTRAP_SERVER,
  RESULT_CLINET_ID,
  RESULT_GROUP_ID,
  RESULT_TOPIC,
} = require("../env");

const kafka = new Kafka({
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  clientId: RESULT_CLINET_ID,
});

const init = async () => {
  const consumer = kafka.consumer({ groupId: RESULT_GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic: RESULT_TOPIC });
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

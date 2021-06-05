const { Kafka } = require("kafkajs");

const {
  KAFKA_BOOTSTRAP_SERVER,
  ANALYSIS_CLINET_ID,
  ANALYSIS_GROUP_ID,
  ANALYSIS_TOPIC,
} = require("../env");

const kafka = new Kafka({
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  clientId: ANALYSIS_CLINET_ID,
});

const init = async () => {
  const consumer = kafka.consumer({ groupId: ANALYSIS_GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic: ANALYSIS_TOPIC });
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

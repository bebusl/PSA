#from reloadr import autoreload
from kafka import KafkaConsumer, KafkaProducer

producer = KafkaProducer(bootstrap_servers='kafka:9092')
consumer = KafkaConsumer(
    'analysis',
    bootstrap_servers=['kafka:9092'])

print(consumer)

for message in consumer:
    message = message.value
    producer.send('result', b'test')
    print('{}'.format(message.decode()))

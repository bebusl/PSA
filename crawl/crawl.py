from os import error
import os
import requests
from bs4 import BeautifulSoup
import json
import re
import kss
import requests
import multiprocessing
import time
from models import setDB
from kafka import KafkaConsumer, KafkaProducer
from dotenv import load_dotenv
load_dotenv('../.env')


KAFKA_BOOTSTRAP_SERVER = os.getenv('KAFKA_BOOTSTRAP_SERVER')
CRAWL_CLIENT_ID=os.getenv('CRAWL_CLIENT_ID')
CRAWL_GROUP_ID=os.getenv('CRAWL_GROUP_ID')
CRAWL_TOPIC=os.getenv('CRAWL_TOPIC')


def crawlReviews(product):
    try:
        reviewList = []
        productTitle = product['productTitle']
        price = product['price']
        crUrl = product['crUrl']
        res = requests.get(crUrl)
        soup = BeautifulSoup(res.text, 'lxml')
        time.sleep(0.1)
        items = soup.find_all('p', class_="reviewItems_text__XIsTc")
        for item in items:
            reviews = re.sub('<.+?> *', '', str(item))
            reviews = re.sub('[^A-Za-z0-9가-힣x ]', '', reviews)
            reviews = ' '.join(reviews.split())
            for review in kss.split_sentences(reviews):
                if len(review) < 20:
                    continue
                reviewList.append(review)
        productData={"name":productTitle,"price":price,"url":crUrl,"reviews":reviewList}
        return productData
    except Exception as e:
        print(e)
        pass

if __name__ == "__main__":
    print("크롤러 실행 : ")
    consumer  = KafkaConsumer(
        'crawl',
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVER,
        group_id=CRAWL_GROUP_ID,
    )


    for message in consumer:
        print("Topic: %s, Partition: %d, Offset: %d, Key: %s, Value: %s" % ( message.topic, message.partition, message.offset, message.key, message.value ))
        keyword=message.value.decode('utf-8')
        print("크롤링 키워드 : ",keyword)
        start = time.time()
        rlist=[]
        ddd=[]

        headers = {
            'authority': 'search.shopping.naver.com',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'accept': 'application/json, text/plain, */*',
            'urlprefix': '/api',
            'sec-ch-ua-mobile': '?0',
            'logic': 'PART',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://search.shopping.naver.com/search/all?frm=NVSHMDL&origQuery=%EB%B0%98%EC%A7%80&pagingIndex=2&pagingSize=40&productSet=model&query=%EB%B0%98%EC%A7%80&sort=rel&timestamp=&viewType=list',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': 'NNB=V42OESNUSZ3VY; npic=R/BVLB+2rDvYpNTfjKTYpIWDdikDZJqprXScVSFSEE5Tch+vjhMFWuqK44bmj2PiCA==; NaverSuggestUse=use%26unuse; ASID=318f084a00000169623bbbbf0000004f; _ga_EP5X7Y3XQ9=GS1.1.1572518886.3.0.1572518886.60; pcview=pcview; NRTK=ag#20s_gr#1_ma#-1_si#1_en#1_sp#-2; _ga_4BKHBFKFK0=GS1.1.1600516689.2.1.1600516748.1; JSESSIONID=EC551AF5206F5C55370E512AA75731BA; AD_SHP_BID=4; nid_inf=274442339; NID_AUT=88IKtCuR93Q6euCTtTppexG5YxEMVemqtsMT1BUDX+IqUMbyJvd4NCPtluhOYiBE; NID_JKL=4FDs6KpxBlwVeXHucJUy8keWLS5e9jpF+ENSBela+n4=; nx_ssl=2; BMR=; _gid=GA1.2.501260938.1620824767; _ga=GA1.2.399916326.1566823557; _ga_7VKFYR6RV1=GS1.1.1620827571.185.1.1620828139.60; _shopboxeventlog=false; page_uid=h5zeUwp0YiRssP9dO4Nssssstl0-052084; spage_uid=h5zeUwp0YiRssP9dO4Nssssstl0-052084; sus_val=aVe8uoK8PWL6Wp0inQkMfacs; ncpa=218835|kojoe0jk|6a44da6522d0c6beb25c45711d3bce0f92f883fc|s_51122c3cf58f|09bf6ef4456ecb3bef7a5de656eb8ea047c584e2:245132|kojp0qg0|85b86aecfd440d74f976d416a5dab8d9e0a6123a|s_4b0b9a2c77c1529|e8f7c571765d0bb4aeca91fc8eb3ee7bee67c8f9:6|kojp3dco|b81b3a6578a2816fe9ffd03962f993d0af5861df|s_265212fbc481|94a07128cd5fbce2999382ac4d8b93127b7fd667:756970|kojp9zs0|a4dacf1ac2f1eb6dc7c33a669a5c93ca34eec317|s_22fee36073e3d|51c4aa0ae1a998a5c42c22866d922778a7bca422:2219428|kol5xzy8|18a995fd030398bf123e92be27bb95562ce2f96d|s_a39ba3f7540|84fd5b0d0d4da344c51e893d367fd9ab13bcf8fc:515934|kol60ba8|c3021544f2a04f23a4051b1a838e62638f32d160|s_1370ef1aa50d0|3cb9429ef91244b25cecdd130555383eaf71a961:856218|kol6b79c|8e61d9cad827fcc81ac49bbcd39dc3e8d1f33036|s_3ee50d4c2a5a|a4469aaafc936917b55fc89211e25093af9dacdd:95694|komm7x6g|c39cd6f6920216664b1ff452a30ba0b43d154243|null|e46e211a95d803bdd7ec428e549126b26d917582:663757|komm85o0|50249f07d060fe232811dee50f8b85a53592a4b1|s_3345c589a9a53|68b25c42b02e605a9c1108c2eca2c3a79c6eadd5:482644|komm8ggw|eef5de1443c38c4d3f40853589e8a83c5999f888|s_20117841854698384|0aada13fc14177c419b1ea571568d7f4a1c50adc; NID_SES=AAABoKDWd0oNdCclzA+PAqNHIutVINBX+ftX1n8S5jSL185XloM9UZjbc+Esi31kw1FtUeZz3kOgpK1BhQKkZNdcT25VPxshbkCt/QsLmgwkO5ajqV6v1J0Toxmnr0aXzy1RqHuQwSr/E7x0MRe6qBPCV74AucaQkx8uOxv/SQkPps8QwXPkKX9P+JMK/4bJS+Qn2XdznISDBOCdVECMauQDXJqIPm+GLQ5XnENE0vaw0rzk2TZYQTsw2O2cC5V99NQ3KiSWYOzWqOX1xz+ArFruAgqvZVPUh56FALR2Q/89z2UqRgqG+UXqMZ6+VXwmTJLyfmY9LmQ7arrlB1/lIyWRzRLIVnGP4j+5O41lf3casSzDP0BXRNnSf2BH5k7HpisXUjrYOyODKwDBodZZjwnXAJT4pAXiJzX04eJeBLrqckCHr8jEswjssSlDdzzf9kPe23y/WG9wCuoFUEcPOBmJEbTuQQwjCtdhSEY9ADgpjeJg+vfaLiFhue2j6gE68xLuqd7E5vYBLRwwOz827crvnsfmDrj8QxoLcDLVsN/kI6cp',
        }

        params = (
            ('sort', 'rel'),
            ('pagingIndex', '1'),
            ('pagingSize', '40'),
            ('viewType', 'list'),
            ('productSet', 'model'),
            ('deliveryFee', ''),
            ('deliveryTypeValue', ''),
            ('frm', 'NVSHMDL'),
            ('query', keyword),
            ('origQuery', keyword),
            ('iq', ''),
            ('eq', ''),
            ('xq', ''),
            ('window', ''),
        )

        response = requests.get('https://search.shopping.naver.com/search/all', headers=headers, params=params)

        result_dict = json.loads(response.text)
        

        if 'shoppingResult' in result_dict:
            products = result_dict['shoppingResult']['products']
            pool = multiprocessing.Pool(8)
            result = []
            print("크롤링 진행중...")

            for reviews in pool.map(crawlReviews, products):
                result.append(reviews)

            size = 0
            for r in result:
                size += len(r['reviews'])

            print("크롤링 소요시간 :" ,time.time() - start)
            print("크롤링 된 문장 개수 : ",size)
            print("DB저장 시작!: ")

            setDB(keyword,result)


        else:
            print('no such product')

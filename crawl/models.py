import pymongo
import os
from dotenv import load_dotenv
from bson.dbref import DBRef
import urllib.parse
import datetime

username = urllib.parse.quote_plus('root')
password = urllib.parse.quote_plus('root')

load_dotenv('../.env')
MONGO_MAIN_DB_URL = os.getenv('MONGO_MAIN_DB_URL')
MONGO_EXPIRE = int(os.getenv('MONGO_EXPIRE'))
client = pymongo.MongoClient("mongodb://%s:%s@mongo" % (username, password))
mydb = client['psa']
searchKeyword = mydb['searchkeywords']
productDetail = mydb['productdetails']
reviews = mydb['reviews']
reviewdetails = mydb['reviewdetails']
timestamp = datetime.datetime.now()

def addProductDetail(name, price, url, imageUrl, refId):
    productDetail.create_index("date", expireAfterSeconds=MONGO_EXPIRE)
    data = {
        "name": name,
        "price": price,
        "url": url,
        "imageUrl": imageUrl,
        "reviews": DBRef(collection='reviews', id=refId),
        "date": timestamp
    }
    try:
        productDetailId = productDetail.insert(data)
        return productDetailId
    except Exception as e:
        print("DETAILERR", e)

def addReview(review_):
    reviewdetails.create_index("date", expireAfterSeconds=MONGO_EXPIRE)
    data = {
        "review": review_,
        "analysis": [],
        "date": timestamp
    }
    try:
        reviewId = reviewdetails.insert(data)
        return reviewId
    except Exception as e:
        print(e)

def addReviews(reviews_):
    review_list = []

    for review_ in reviews_:
        review_list.append(addReview(review_))

    reviews.create_index("date", expireAfterSeconds=MONGO_EXPIRE)
    data = {
        "reviews": [],
        "date": timestamp
    }

    for refId in review_list:
        data['reviews'].append(DBRef(collection='reviewdetails', id=refId))

    try:
        id = reviews.insert(data)
        return id
    except Exception as e:
        print("REVIEWS ERROR", e)
        
    return 0


def addKeyword(keyword, refIds):
    searchKeyword.create_index("date", expireAfterSeconds=MONGO_EXPIRE)
    data = {
        'keyword': keyword,
        "date": timestamp,
        'products': []
    }
    for refId in refIds:
        data['products'].append(DBRef(collection='productdetails', id=refId))
    try:
        id = searchKeyword.insert(data)
        return id
    except Exception as e:
        print("KEYWORDERR", e)

    return 0


def setDB(keyword, productData):
    print("SETDB start")
    # productData={"name":productTitle,"price":price,"url":crUrl,"reviews":reviewList}
    try:
        detailIds = []
        for i in productData:
            reviewId = addReviews(i["reviews"])
            detailIds.append(addProductDetail(
                i["name"], i["price"], i["url"], i["imageUrl"], reviewId))

        return addKeyword(keyword, detailIds)
    except Exception as e:
        print(e)

    return 0

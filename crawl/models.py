import pymongo
import os
from dotenv import load_dotenv
from bson.dbref import DBRef
import urllib.parse

username = urllib.parse.quote_plus('root')
password = urllib.parse.quote_plus('root')

load_dotenv('../.env')
MONGO_MAIN_DB_URL = os.getenv('MONGO_MAIN_DB_URL')
client = pymongo.MongoClient("mongodb://%s:%s@mongo" % (username, password))
mydb = client['psa']
searchKeyword = mydb['searchkeywords']
productDetail = mydb['productdetails']
reviews = mydb['reviews']



def addProductDetail(name, price, url, imageUrl, refId):
    data = {
        "name": name,
        "price": price,
        "url": url,
        "imageUrl": imageUrl,
        "reviews": DBRef(collection='reviews', id=refId)
    }
    try:
        productDetailId = productDetail.insert(data)
        return productDetailId
    except Exception as e:
        print("DETAILERR", e)
        pass


def addReviews(review):
    data = {
        "reviews": review
    }
    try:
        id = reviews.insert(data)
        return id
    except Exception as e:
        print("REVIEWS ERROR", e)
        pass
    return 0


def addKeyword(keyword, refIds):
    data = {
        'keyword': keyword,
        'products': []
    }
    for refId in refIds:
        data['products'].append(DBRef(collection='productdetails', id=refId))
    try:
        id = searchKeyword.insert(data)
        return id
    except Exception as e:
        print("KEYWORDERR", e)
        pass
    return 0


def setDB(keyword, productData):
    print("SETDB start")
    # productData={"name":productTitle,"price":price,"url":crUrl,"reviews":reviewList}
    detailIds = []
    for i in productData:
        reviewId = addReviews(i["reviews"])
        detailIds.append(addProductDetail(
            i["name"], i["price"], i["url"], i["imageUrl"], reviewId))

    return addKeyword(keyword, detailIds)

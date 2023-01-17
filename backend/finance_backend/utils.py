
from pymongo import MongoClient
client1 = pymongo.MongoClient(
    'mongodb+srv://nodejs:nodejsdatapass@db1.ewt09.mongodb.net/?retryWrites=true&w=majority')
client2 = pymongo.MongoClient(
    'mongodb+srv://nodejs:nodejsdatapass@db2.ewt09.mongodb.net/?retryWrites=true&w=majority')

db1 = client1['user_2']
db2 = client2['user_2']

print(db1.list_collection_names())
print(db2.list_collection_names())

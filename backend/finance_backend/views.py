from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from finance_backend.serializers import SymbolSerializer, InsertIdSerializer, PositionSerializer


from pymongo import MongoClient
import json
import asyncio
from websocket import create_connection
from decouple import config
import threading

global url 
url = config('binance_url')
ws = create_connection(url)
def open_connection():
    global ws
    if ws.connected==False:
        ws = create_connection(url)
        
def keep_alive():
    while True:
        if ws.connected:
            result = json.loads(ws.recv())
            # process the result
        else:
            try:
                open_connection()
            except:
                # Handle connection error
                pass

thread = threading.Thread(target=keep_alive)
thread.start()



client2 = MongoClient(config('client2'))
client1 = MongoClient(config('client1'))


@api_view()
def createSocket(request):
    result = json.loads(ws.recv())
    return Response(result)

@api_view(['GET'])
def getRoutes(request):
    # db1 = client2['user_2']
    # collection = db1['symbols']
    # # inserted_id = collection.insert_one({'pair': 'BTCUSDT', 'entryPrice': 1000,
    # #                                      'exitPrice': 2000, 'quantity': 1, 'position': 'long', 'pnlusdt': 1000, 'pnlpercent': 100, 'profit': 1000}).inserted_id
    # # print(inserted_id)
    # db2 = client1['user_2']
    # collection2 = db2['positions']
    # # inserted_id = collection2.insert_one({'pair': 'BTCUSDT', 'entryPrice': 1000, 'exitPrice': 2000,
    # #                                      'quantity': 1, 'position': 'long', 'pnlusdt': 1000, 'pnlpercent': 100, 'profit': 1000}).inserted_id
    # # one_instance = collection.find_one({'pair': 'BTCUSDT'})
    # two_instance = collection2.find_one({'pair': 'BTCUSDT'})
    # # print('first', one_instance)
    # # print('second', two_instance)
    return Response("hello")

def extractSymbol(symbol, tickerData):
    for i in tickerData:
        if i["s"] == symbol:
            return i["a"]

def extractSymbolsAsDict(symbol_list, tickerData):
    symbol_dict = {}
    for i in tickerData:
        if i["s"] in symbol_list:
            symbol_dict[i["s"]] = i["a"]
    return symbol_dict

calculatePnl = lambda entryPrice, exitPrice, qty: (exitPrice - entryPrice) * qty
calculatePosition = lambda position, positionValue: 1 if position ==  "LONG" else -1 if position == "SHORT" else 0

@api_view(['GET'])
def getSymbols(request):
    db1 = client1['user_2']
    collection = db1['symbols']
    symbols = collection.find()
    serializer = SymbolSerializer(symbols, many=True)
    result = json.loads(ws.recv())
    open_connection()
    tickerData = result["data"]
    symbol = "BTCUSDT"
    extractSymbol(symbol, tickerData)
    
    return Response(serializer.data)

@api_view(['POST'])
def createSymbol(request):
    data = request.data
    db1 = client1['user_2']
    collection = db1['symbols']
    
    result= collection.insert_one({'pair': data['pair'],'marketSymbol': data['market_symbol'], 'entryPrice': None,
                                       'position': None})
    if result.acknowledged:
        return Response({'Success': 'Symbol created successfully'})
    else:
        return Response({'Error': 'Symbol not created'})

    

@api_view(['PUT'])
def updateSymbol(request):
    data = request.data
    db1 = client1['user_2']
    collection = db1['symbols']
    db2 = client2['user_2']
    collection2 = db2['positions']
    open_connection()
    ws_result = json.loads(ws.recv())
    tickerData = ws_result["data"]
    price = float(extractSymbol(data['market_symbol'], tickerData))

    print(price)
    if data['position'] == 'LONG' or data['position'] == 'SHORT':
        
        result = collection.update_one({'marketSymbol': data['market_symbol']}, {'$set': {'entryPrice': price, 'position': data['position']}})
        result2 = collection2.insert_one({'pair': data['market_symbol'], 'entryPrice': price, 'qty': 1,
                                        'position': data['position'], 'pnlusdt' : None, 'pnlpercent': None, 'profit': None})
    elif data['position'] == 'CLOSE':
        
        symbol = collection.find_one({'marketSymbol': data['market_symbol']})
        entryPrice = symbol['entryPrice']
        position = symbol['position']
        pos_to_sign = lambda pos: 1 if pos == "LONG" else -1 if pos == "SHORT" else 0
        
        pnl_usdt = (price - float(entryPrice)) * pos_to_sign(position)
       
        pnl_percent = (pnl_usdt / float(entryPrice)) * 100
        
        profit = lambda pnl: "true" if pnl > 0 else "false" if pnl < 0 else None

        result = collection.update_one({'marketSymbol': data['market_symbol']}, {'$set': {'position': data['position']}})
        result2 = collection2.update_one({'pair': data['market_symbol']}, {'$set': {'exitPrice': price, 'position': data['position'], 'pnlusdt' : pnl_usdt, 'pnlpercent': pnl_percent, 'profit': profit(pnl_usdt)}})
    if result.acknowledged and result2.acknowledged:
        return Response({'Success': 'Updated successfully'})
    else:
        return Response({'Error': 'Not updated'})
    

@api_view(['DELETE'])
def deleteSymbol(request,pk):
    data = request.data
    db1 = client1['user_2']
    collection = db1['symbols']
    print(pk)
    result = collection.delete_one({'marketSymbol': pk})
    print(result.acknowledged)
    
    if result.acknowledged:
        return Response({'Success': 'Symbol deleted successfully'})
    else:
        return Response({'Error': 'Symbol not deleted'})

@api_view(['DELETE'])
def deleteAllSymbols(request):
    db1 = client1['user_2']
    collection = db1['symbols']
    result = collection.delete_many({})
    
    if result.acknowledged:
        return Response({'Success': 'All symbols deleted successfully'})
    else:
        return Response({'Error': 'Symbols not deleted'})


@api_view(['GET'])
def getPositions(request):
    db2 = client2['user_2']
    collection2 = db2['positions']
    positions = collection2.find()
    serializer = PositionSerializer(positions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createPosition(request):
    data = request.data
    db2 = client2['user_2']
    collection2 = db2['positions']
    result= collection2.insert_one({'pair': data['pair'], 'entryPrice': data['entry_price'],
                                       'position': data['position'], 'quantity': 1, 'pnlusdt': None, 'pnlpercent': None, 'profit': None})
    if result.acknowledged:
        return Response({'Success': 'Position created successfully'})
    else:
        return Response({'Error': 'Position not created'})

@api_view(['PUT'])
def updatePosition(request):
    data = request.data
    db2 = client2['user_2']
    collection2 = db2['positions']
    result = collection2.update_one({'pair': data['pair']}, {'$set': {'exitPrice': data['exit_price'], 'pnlusdt': data['pnl_usdt'], 'pnlpercent': data['pnl_percent'], 'profit': data['profit']}})

    if result.acknowledged:
        return Response({'Success': 'Position updated successfully'})
    else:
        return Response({'Error': 'Position not updated'})

@api_view(['DELETE'])
def deletePosition(request):
    data = request.data
    db2 = client2['user_2']
    collection2 = db2['positions']
    result = collection2.delete_one({'pair': data['pair']})

    if result.acknowledged:
        return Response({'Success': 'Position deleted successfully'})
    else:
        return Response({'Error': 'Position not deleted'})

@api_view(['DELETE'])
def deleteAllPositions(request):
    db2 = client2['user_2']
    collection = db2['positions']
    result = collection.delete_many({})

    if result.acknowledged:
        return Response({'Success': 'All positions deleted successfully'})
    else:
        return Response({'Error': 'Positions not deleted'})

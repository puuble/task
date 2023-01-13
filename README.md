# Task

## Multiple MONGODB DATABASE and WEBSOCKET

#### Task'ın amacı.

İki tane farklı MongoDB adreslerine bağlanarak bir form yapısı kurmanız gerekiyor.

**Birinci DB**

```ssh 
mongodb+srv://nodejs:nodejsdatapass@db1.ewt09.mongodb.net/?retryWrites=true&w=majority
```

**İkinci DB**

```ssh 
mongodb+srv://nodejs:nodejsdatapass@db2.ewt09.mongodb.net/?retryWrites=true&w=majority
```

Projede gerekli sayfalar:
- Market Price Listeleme sayfası **Birinci DB**
- Market Price listelenmesi için symbol ekleme sayfası **Birinci DB**
- BUY SELL buttonlarına basarak kayıt ettiğimiz verileri listeleyen sayfa **İkinci DB**

#### Bu github projesini forklayınız. Ve Adınıza ait Branch oluşturunuz. Ardından aşağıdaki adımları takip ediniz.

##### Buradaki amaç:

Satmak veya almak istediğimiz coinleri **İkinci DB** üzerine kayıt etmek için aşağıdaki fieldlar ile oluşturulmuş bir form ve formdaki kayıtları listeyebileceğimiz HTML table. Bu HTML table da price alanı anlık WS üzerinden güncellenecektir. MARKET SYMBOL'leri veriyi çekmeniz için önemlidir.

Bu fieldlar BUY veya SELL buttonlarına bastığımızda o anki fiyat ve diğer bilgiler ile **Birinci DB**'ye kayıt edilecek şekilde, **İkinci DB** 'de yer alan fieldları bir tablo içerisinde listelemenizi istiyoruz. Aşağıdaki fieldlar ile bir HTML form oluşturmanız ve aşağıdaki fieldları bu HTML form sayesinde eklemeniz gerekiyor.

Aşağıdaki form yapısında ise  **İkinci DB** üzerinde istediğimiz fieldlar yer almaktadır. **İkinci DB** adresine **symbols** collectionına oluşturmanızı istiyoruz.

- Pair
- Market Symbol
- Position

| pair | market_symbol | price | action |
| ------ | ------ | ------ | ------ |
| Bitcoin | BTCUSDT  | 17,252.28 | BUY veya SELL |
| Ethereum | ETHUSDT  | 1,327.88 | BUY veya SELL |


!Lütfen örnekteki coinleri yükleyiniz.

 [Binance](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md) - WEB SOCKET APISI
 
Yukarıda oluşturulan tabloya anlık fiyat bilgilerini WEB SOCKET API dan çekmenizi ve güncellemenizi istiyoruz.
websocketi dinlemek için HTML/JS kullanabilirsiniz. Socket.io kütüphanesi gibi diğer kütüphanelerde kullanılabilir.
websocketi nodejs,python gibi backend tarafında da dinleyebilirsiniz.

BUY veya SELL buttonuna basıldığında  **Birinci DB** üzerinde sizden istediğimiz fieldlar aşağıdadır.

- Pair
- Entry Price
- Exit Price
- Quantity
- Position (LONG||SHORT)
- PNLUSDT
- PNLPERCENT
- Profit

Yukarıdaki fieldları **Birinci DB**  adresine **positions** collectionın içine yüklemenizi istiyoruz.
Daha sonra HTML formatında yapacağınız table list ile elemanlarını yukarıdaki fieldlara göre oluşturduktan sonra, bu collectionı listeyecek bir function istiyoruz. (HTML olarak)


| pair |entry_price | exit_price | qty | position |pnl_usdt | pnl_percent | profit
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| BTCUSDT | 17,252.28  | 18,252.28 | 1 | LONG| 1000 | 5.80% | true
| ETHUSDT | 1,527.88  | 1,327.88 | 1 | LONG | -200 | -13.09% | false
| XRPUSDT | 0.3705  | 0.30 | 250 | SHORT | 17.63 | 19.03% | true


```js
position = position == LONG ? 1 : -1;
```

```js
PNLUSDT: ((Exit Price - Entry Price) * Qty) * position 
```
```txt
https://www.binance.com/en/futures/BTCUSDT/calculator
```

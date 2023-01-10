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


#### Bu github projesini forklayınız. Ve Adınıza ait Branch oluşturunuz. Ardından aşağıdaki adımları takip ediniz.


Bu form yapısında **Birinci DB** üzerinde sizden istediğimiz fieldlar aşağıdadır.
- Pair
- Buy Price
- Sell Price
- Amount

Yukarıdaki fieldları **Birinci DB**  adresine **pairs** collectionın içine yüklemenizi istiyoruz.
Daha sonra HTML formatında yapacağınız form'u ve elemanlarını yukarıdaki fieldlara göre oluşturduktan sonra, bu collectionın içine kaydedecek şekilde bir fonksiyon oluşturmanızı istiyoruz.

Aşağıdaki form yapısında ise  **İkinci DB** üzerinde istediğimiz fieldlar yer almaktadır.
Bu fieldlardan oluşturduğunuz HTML form'u kayıt ettikten sonra, **İkinci DB** 'de yer alan bilgileri bir tablo içerisinde listelemenizi istiyoruz.

- Pair
- Market Symbol

| pair | market_symbol | price |
| ------ | ------ | ------ |
| Bitcoin | BTCUSDT  | 17,252.28
| Ethereum | ETHUSDT  | 1,327.88

!Lütfen örnekteki coinleri yükleyiniz.

 [Binance](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md) - WEB SOCKET APISI
 
Yukarıda oluşturulan tabloya anlık fiyat bilgilerini WEB SOCKET API dan çekmenizi ve güncellemenizi istiyoruz.

websocketi dinlemek için HTML/JS kullanabilirsiniz. Socket.io kütüphanesi gibi diğer kütüphanelerde kullanılabilir.

websocketi nodejs,python gibi backend tarafında da dinleyebilirsiniz.

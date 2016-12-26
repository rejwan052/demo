# websocket demo

簡易股票報價系統


server.js
```
Listening on 4080
client[0] subscribe 2330
client[0] subscribe 2498
client[0] unsubscribe 2330
destroy 0
client[1] subscribe 2330
client[1] subscribe 2498
client[1] unsubscribe 2330
destroy 1
client[2] subscribe 2330
client[2] subscribe 2498
client[2] unsubscribe 2330
destroy 2
```

client.js
```
receive string {"type":"quote","data":{"symbol":"2498","last":94.11628165926447}}
receive string {"type":"quote","data":{"symbol":"2498","last":3.713211880454703}}
receive string {"type":"quote","data":{"symbol":"2498","last":63.952606343045474}}
receive string {"type":"quote","data":{"symbol":"2498","last":43.10721436789922}}
```

'use strict'

const WebSocket = require('ws');


function main() {
  const ws = new WebSocket('ws://localhost:4080/quote');

  ws.on('open', () => {
    console.log('open')
    ws.send(JSON.stringify({type: 'subscribe', symbol: '2330'}))
    ws.send(JSON.stringify({type: 'subscribe', symbol: '2498'}))
    ws.send(JSON.stringify({type: 'unsubscribe', symbol: '2330'}))
  });

  ws.on('message', (data, flags) => {
    console.log('receive', typeof(data), data)
  });

  ws.on('error', err => {
    console.error(err)
  })
}


if (require.main === module) {
  main()
}

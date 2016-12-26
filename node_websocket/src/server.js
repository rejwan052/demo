'use strict'

const http = require('http')
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , express = require('express')


class SymbolRegistry {
  constructor() {
    this._symbol2Client = new Map()  // symbol -> set(id)
  }

  subscribe(clientSession, symbol) {
    let ids = this._symbol2Client.get(symbol)
    if (ids == null) {
      ids = new Set()
      this._symbol2Client.set(symbol, ids)
    }

    ids.add(clientSession.id)
  }

  unsubscribe(clientSession, symbol) {
    const ids = this._symbol2Client.get(symbol)
    if (ids == null)
      return

    ids.delete(clientSession.id)

    if (!ids.size) {
      this._symbol2Client.delete(symbol)
    }
  }

  getSubscriber(symbol) {
    return this._symbol2Client.get(symbol)
  }
}


class ClientAgent {
  // static __genNum = 0

  constructor(wss) {
    this._wss = wss
    this._sessions = new Map()  // id -> ClientSession
    this._registry = new SymbolRegistry()

    this.subscribeSymbol = this._registry.subscribe.bind(this._registry)
    this.unsubscribeSymbol = this._registry.unsubscribe.bind(this._registry)
    this.onQuote = this.onQuote.bind(this)

    wss.on('connection', (ws) => {
      const id = ClientAgent.__genNum++
      const session = new ClientSession(this, id, ws)
      this._sessions.set(id, session)
    })
  }

  onQuote(data) {
    const msg = {type: 'quote', data}
    const json = JSON.stringify(msg)

    const ids = this._registry.getSubscriber(data.symbol)
    if (ids) {
      for (let id of ids) {
        const clientSession = this._sessions.get(id)
        clientSession.send(json)
      }
    }
  }
}

ClientAgent.__genNum = 0


class ClientSession {
  constructor(clientAgent, id, ws) {
    this._clientAgent = clientAgent
    this._id = id
    this._ws = ws
    this._symbols = new Set()

    ws.onmessage = this._onmessage.bind(this)
    ws.onclose = this._onclose.bind(this)
    ws.onerror = console.log
  }

  _onclose() {
    // unsubscribe all symbols
    for (let symbol of this._symbols) {
      this._clientAgent.unsubscribeSymbol(this, symbol)
    }
    this._symbols.clear()

    console.log('destroy', this._id)
  }

  _onmessage(event) {
    const obj = JSON.parse(event.data)
    switch (obj.type) {
      case 'subscribe':
      case 'unsubscribe':
        break
      default:
        return  // skip
    }
    const handler = this['_on_' + obj.type]
    if (handler) {
      handler.call(this, obj)
    }
  }

  get id() {
    return this._id
  }

  _on_subscribe({symbol}) {
    console.log('client[%s] subscribe %s', this._id, symbol)
    this._symbols.add(symbol)
    this._clientAgent.subscribeSymbol(this, symbol)
  }

  _on_unsubscribe({symbol}) {
    console.log('client[%s] unsubscribe %s', this._id, symbol)
    this._symbols.delete(symbol)
    this._clientAgent.unsubscribeSymbol(this, symbol)
  }

  send(msg) {
    this._ws.send(msg)
  }
}


class MockQuoteSvc {
  constructor() {
    this._symbols = ['2330', '2498', '1101']
    this._produceQuote = this._produceQuote.bind(this)
  }

  _produceQuote() {
    const idx = Math.floor(Math.random() * this._symbols.length)
    const symbol = this._symbols[idx]
    const last = Math.random() * 100
    this._ondata({symbol, last})
  }

  set ondata(ondata) {
    this._ondata = ondata
  }

  start() {
    setInterval(this._produceQuote, 1000)
  }
}


function main() {
  const server = http.createServer()
  const wss = new WebSocketServer({server, path: '/quote', clientTracking: true})
  const app = express()
  const port = 4080

  const clientAgent = new ClientAgent(wss)
  const quoteSvc = new MockQuoteSvc()
  quoteSvc.ondata = clientAgent.onQuote
  quoteSvc.start()

  server.on('request', app)
  server.listen(port, () => {
    console.log('Listening on ' + server.address().port)
  });
}


if (require.main === module) {
  main()
}

const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const DataProvider = require('./data-provider/mongo')
const historyRouter = require('./routers/history')

if (require.main === module) {
  MongoClient.connect('mongodb://192.168.1.104:27017/twdb', function(err, db) {
    const dataProvider = new DataProvider(db)
    const app = express()
    app.set('__DEV__', app.get('env') === 'development')
    app.set('data-provider', dataProvider)
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/', historyRouter)
    app.listen(3000)

    console.log('App listening on port 3000')
  })
}

const sqlite3 = require('sqlite3')


function formatDate(d) {
  var month = '' + (d.getMonth() + 1)
  var day = '' + d.getDate()
  var year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return year+'-'+month+'-'+day
}


function migrateFields(fields) {
  return fields.split(',').map(s => {
    s = s.trim()
    const newName = fieldMigrateMapper(s)

    return s + ' as ' + newName
  }).join(',')
}


function fieldMigrateMapper(field) {
  switch (field) {
    case "Date": return "date";
    case "Symbol": return "sid";
    case "Close": return "close";
    case "Open": return "open";
    case "High": return "high";
    case "Low": return "low";
    case "Vol": return "vol";
    case "Txs": return "txn";
    case "Amount": return "amount";
    case "PriceChg": return "chg";
    case "PriceRef": return "priceref";
    case "BestBid": return "best_bid";
    case "BestAsk": return "best_ask";
    case "BestBidVol": return "best_bidsize";
    case "BestAskVol": return "best_asksize";
    case "Market": return "market";
    default: return field;
  }
}


class SqliteDataProvider {
  constructor(dburl) {
    this._proddb = new sqlite3.Database(dburl)
  }

  getHistoryByDate(sid, beginDate, endDate) {
    const begin_date = formatDate(beginDate)
    const end_date = formatDate(endDate)
    return new Promise((resolve, reject) => {
      const fields = migrateFields('Date, Close, Vol, Txs, Amount, Open, High, Low, PriceChg')
      this._proddb.all(`SELECT ${fields} FROM Quote WHERE symbol=? AND date BETWEEN ? AND ?`, sid, begin_date, end_date, (err, rows) => {
        if (err)
          return reject(err)

        resolve(rows)
      })
    })
  }

  getHistoryByCount(sid, latestDate, count) {
    const date = formatDate(latestDate)
    return new Promise((resolve, reject) => {
      const fields = migrateFields('Date, Close, Vol, Txs, Amount, Open, High, Low, PriceChg')
      this._proddb.all(`SELECT ${fields} FROM Quote WHERE symbol=? AND date < ? ORDER BY date DESC LIMIT ?`, sid, date, count, (err, rows) => {
        if (err)
          return reject(err)

        resolve(rows.reverse())
      })
    })
  }
}


module.exports = SqliteDataProvider


function main() {
  const dburl = '/mnt/hd1/twrepo/prod.sqlite'
  const dataProvider = new SqliteDataProvider(dburl)
  // dataProvider._proddb.on('trace', (sql) => {
  //   console.log('run', sql)
  // })
  dataProvider.getHistoryByDate('2330', new Date('2016-09-01'), new Date('2016-11-01')).then(rows => {
    console.log(rows)
  }).catch(err => {
    console.log(err)
  })

  dataProvider.getHistoryByCount('2330', new Date('2016-10-01'), 5).then(rows => {
    console.log(rows)
  }).catch(err => {
    console.log(err)
  })
}


if (require.main === module) {
  main()
}

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const {Sid, Market, Sector, SecurityType} = require('../fields')


class MongodbDataProvider {
  constructor(db) {
    this._db = db
    this._security = db.collection('security')
    this._quote = db.collection('quote')
    this._index = db.collection('index')
    this._projectInfo = {_id: 0, sid: 1, sname: 1, market:1, stype: 1, sector: 1}
    this._projectHistory = {_id: 0, date: 1, open: 1, high: 1, low: 1, close: 1, vol: 1, chg: 1}
  }

  getCollectionBySid(sid) {
    if (sid === Sid.twse_index) {
      // FIXME
      return this._index
    } else {
      return this._quote
    }
  }

  getSecurity(sid) {
    return this._security.find({sid}).project(this._projectInfo).limit(1).next()
  }

  getHistoryByDate(sid, beginDate, endDate) {
    const coll = this.getCollectionBySid(sid)
    return coll.find({sid, date: {$gte: beginDate, $lt: endDate}})
      .project(this._projectHistory)
      .sort({date: 1})
  }

  _filterLastEmpty(data) {
    const len = data.length
    let n = len
    for (let i = len - 1; i >= 0; i--) {
      const d = data[i]
      if (d.close == null) {
        n = i
      } else {
        break
      }
    }

    if (n !== len) {
      data.length = n
    }

    return data
  }

  getHistoryByCount(sid, latestDate, count) {
    const coll = this.getCollectionBySid(sid)
    const query = {sid, date: {$lt: latestDate}}
    return coll.count(query)
      .then(total => {
        const skipCount = total - count > 0 ? total - count : 0
        // console.log(total, count, skipCount)
        return coll.find(query)
          .project(this._projectHistory)
          .skip(skipCount)
          .sort({date: 1})
          .limit(count)
          .toArray()
      })
      .then(this._filterLastEmpty)
  }
}


module.exports = MongodbDataProvider


function main() {
  MongoClient.connect('mongodb://192.168.1.104:27017/twdb', function(err, db) {
    const dp = new MongodbDataProvider(db)
    dp.getHistoryByCount('2330', new Date(), 10)
      .then(docs => console.log(docs))
      .catch(err => console.error(err))

    // dp.getSecurity('2330')
    //   .then(docs => console.log(docs))
    //   .catch(err => console.error(err))
  })
}


if (require.main === module) {
  main()
}

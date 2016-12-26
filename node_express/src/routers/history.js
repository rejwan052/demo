const express = require('express')
const joi = require('joi')

const errors = require('../errors')
const {Errors} = errors


const router = express.Router()

const valid = {
  field: {
    sid: joi.string().required().min(2).max(8).regex(/^[.]?[0-9a-zA-Z]+$/),
  },
  query: {
    date: joi.date().format('YYYY-MM-DD').min('1970-01-01'),
    count: joi.number().integer().min(1).max(1000),
  },
}

// router.use((req, res, next) => {
//   console.log('use', req.app.get('__DEV__'))
//   if (req.app.get('__DEV__')) {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
//     console.log('set access')
//   }
//   next()
// })

router.get('/history/:sid', (req, res, next) => {
  const dataProvider = req.app.get('data-provider')
  const sid = joi.attempt(req.params.sid, valid.field.sid, 'sid')
  const latest = joi.attempt(req.query.latest, valid.query.date, 'latest') || new Date('3000-01-01') // XXX max date
  const count = joi.attempt(req.query.count, valid.query.count, 'count') || 200

  Promise.all([
    dataProvider.getSecurity(sid),
    dataProvider.getHistoryByCount(sid, latest, 5000),
  ]).then(([security, data]) => {
    if (security == null) {
      res.json({
        error: Errors.SID_NOT_FOUND.code,
        sid,
      })
    } else {
      const result = Object.assign({}, security)
      result.data = data
      res.json(result)
    }
  }).catch(err => {
    next(err)
  })
})


module.exports = router

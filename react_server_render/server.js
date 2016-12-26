'use strict'
const path = require('path')

const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const createServerRenderContext = require('react-router/createServerRenderContext').default

const ReactHBS = require('./src/ReactHBS')
const config = require('./webpack.config')
const Home = require('./__components__/Home')


const app = express()

const __DEV__ = app.get('env') === 'development'

if (__DEV__) {
  // Run Webpack dev server in development mode
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
  app.use(webpackHotMiddleware(compiler))
  app.locals.__DEV__ = __DEV__
}

const helpers = {
  Home(location, context) {
    return ReactHBS.render(Home, this, location, context)
  },

  json(context) {
    return new hbs.handlebars.SafeString(JSON.stringify(context))
  },
}

// view engine setup
hbs.registerHelper(helpers)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const getPage = (req, res) => {
  const context = createServerRenderContext()
  const location = req.url

  const __INITIAL_STATE__ = {
    brand: 'Btrie',
    items: [
      {title: 'Home', link: '/'},
      {title: 'Features', link: '/features'},
      {title: 'Contact', link: '/contact'},
    ],
  }

  res.render('index', {
    __INITIAL_STATE__,
    title: 'Fullstack',
    App: helpers.Home.bind(null, location, context),
  })
}

app.get('/', getPage)
app.get('/features', getPage)
app.get('/contact', getPage)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
if (__DEV__) {
  // development error handler
  // will print stacktrace
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
    })
  })
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {},
    })
  })
}

app.listen(3000, () => {
  console.log('listen port 3000')
})

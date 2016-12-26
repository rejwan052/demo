const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Handlebars = require('hbs').handlebars
const ServerRouter = require('react-router/ServerRouter').default


function render(component, props, location, context) {
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ServerRouter, {location, context},
      React.createElement(component, props, null))
  )

  return new Handlebars.SafeString(html)
}

exports.render = render

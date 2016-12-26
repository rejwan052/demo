'use strict'
const React = require('react')
const Carousel = require('react-bootstrap/lib/Carousel')
const Match = require('react-router/Match').default

const Header = require('./Header')
const Footer = require('./Footer')


class InfoBox extends React.Component {
  render() {
    return (
      <div className="container content">
        <Carousel >
          <Carousel.Item>
            <img alt="900x500" src="Coverr-lamp.jpg" />
            <Carousel.Caption>
              <h3>Coverr lamp</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img alt="900x500" src="Typing.jpg" />
            <Carousel.Caption>
              <h3>Typing</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img alt="900x500" src="Walk-The-Dog.jpg" />
            <Carousel.Caption>
              <h3>Walk The Dog</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}


const Content = (props) => {
  return (
    <div className="container content">
      <div className="row marketing">
        <div className="item col-sm-6 col-md-4">
          <div className="thumbnail">
            <i className="ion-ios-desktop"></i>
            <h2>Desktop</h2>
            <p><a className="btn btn-default" href="#" role="button">Download »</a></p>
          </div>
        </div>
        <div className="item col-sm-6 col-md-4">
          <div className="thumbnail">
            <i className="ion-logo-apple"></i>
            <h2>iPhone</h2>
            <p><a className="btn btn-default" href="#" role="button">Download »</a></p>
          </div>
        </div>
        <div className="item col-sm-6 col-md-4">
          <div className="thumbnail">
            <i className="ion-logo-android"></i>
            <h2>Android</h2>
            <p><a className="btn btn-default" href="#" role="button">Download »</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}


const Home = () => {
  return (
    <div>
      <InfoBox />
      <Content />
    </div>
  )
}


const Features = () => {
  return (
    <div>features</div>
  )
}


const Contact = () => {
  return (
    <div>Contact</div>
  )
}


class App extends React.Component {
  render() {
    const {brand, items} = this.props
    return (
      <div className="cover-container">
        <Header brand={brand} items={items} />
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/features" component={Features} />
        <Match pattern="/contact" component={Contact} />
        <Footer />
      </div>
    )
  }
}


module.exports = App

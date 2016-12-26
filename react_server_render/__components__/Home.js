const React = require('react');
const Carousel = require('react-bootstrap/lib/Carousel');
const Match = require('react-router/Match').default;

const Header = require('./Header');
const Footer = require('./Footer');

class InfoBox extends React.Component {
  render() {
    return React.createElement(
      'div',
      { className: 'container content' },
      React.createElement(
        Carousel,
        null,
        React.createElement(
          Carousel.Item,
          null,
          React.createElement('img', { width: 900, height: 500, alt: '900x500', src: 'Coverr-lamp.jpg' }),
          React.createElement(
            Carousel.Caption,
            null,
            React.createElement(
              'h3',
              null,
              'Coverr lamp'
            ),
            React.createElement(
              'p',
              null,
              'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            )
          )
        ),
        React.createElement(
          Carousel.Item,
          null,
          React.createElement('img', { width: 900, height: 500, alt: '900x500', src: 'Typing.jpg' }),
          React.createElement(
            Carousel.Caption,
            null,
            React.createElement(
              'h3',
              null,
              'Typing'
            ),
            React.createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            )
          )
        ),
        React.createElement(
          Carousel.Item,
          null,
          React.createElement('img', { width: 900, height: 500, alt: '900x500', src: 'Walk-The-Dog.jpg' }),
          React.createElement(
            Carousel.Caption,
            null,
            React.createElement(
              'h3',
              null,
              'Walk The Dog'
            ),
            React.createElement(
              'p',
              null,
              'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            )
          )
        )
      )
    );
  }
}

const Content = props => {
  return React.createElement(
    'div',
    { className: 'container content' },
    React.createElement(
      'div',
      { className: 'marketing item col-lg-4' },
      React.createElement('i', { className: 'ion-ios-desktop' }),
      React.createElement(
        'h2',
        null,
        'Desktop'
      ),
      React.createElement(
        'p',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', href: '#', role: 'button' },
          'Download »'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'marketing item col-lg-4' },
      React.createElement('i', { className: 'ion-logo-apple' }),
      React.createElement(
        'h2',
        null,
        'iPhone'
      ),
      React.createElement(
        'p',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', href: '#', role: 'button' },
          'Download »'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'marketing item col-lg-4' },
      React.createElement('i', { className: 'ion-logo-android' }),
      React.createElement(
        'h2',
        null,
        'Android'
      ),
      React.createElement(
        'p',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', href: '#', role: 'button' },
          'Download »'
        )
      )
    )
  );
};

const Home = () => {
  return React.createElement(
    'div',
    null,
    React.createElement(InfoBox, null),
    React.createElement(Content, null)
  );
};

const Features = () => {
  return React.createElement(
    'div',
    null,
    'features'
  );
};

const Contact = () => {
  return React.createElement(
    'div',
    null,
    'Contact'
  );
};

class App extends React.Component {
  render() {
    const { brand, items } = this.props;
    return React.createElement(
      'div',
      { className: 'cover-container' },
      React.createElement(Header, { brand: brand, items: items }),
      React.createElement(Match, { exactly: true, pattern: '/', component: Home }),
      React.createElement(Match, { pattern: '/features', component: Features }),
      React.createElement(Match, { pattern: '/contact', component: Contact }),
      React.createElement(Footer, null)
    );
  }
}

module.exports = App;
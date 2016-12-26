const React = require('react');
const Link = require('react-router/Link').default;

const Brand = ({ brand }) => {
  return React.createElement(
    'h3',
    { className: 'masthead-brand' },
    brand
  );
};

const Nav = ({ items = [] }) => {
  const lis = items.map((item, index) => React.createElement(
    Link,
    { key: index, activeOnlyWhenExact: true, to: item.link, activeClassName: 'active' },
    ({ isActive, onClick, href }) => React.createElement(
      'li',
      { className: isActive ? "active" : null },
      React.createElement(
        'a',
        { href: href, onClick: onClick },
        item.title
      )
    )
  ));

  return React.createElement(
    'nav',
    null,
    React.createElement(
      'ul',
      { className: 'nav masthead-nav' },
      lis
    )
  );
};

const Header = ({ items, brand }) => {
  return React.createElement(
    'div',
    { className: 'center' },
    React.createElement(
      'div',
      { className: 'masthead' },
      React.createElement(
        'div',
        { className: 'inner' },
        React.createElement(Brand, { brand: brand }),
        React.createElement(Nav, { items: items })
      )
    )
  );
};

module.exports = Header;
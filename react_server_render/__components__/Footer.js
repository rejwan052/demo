const React = require('react');

const Footer = props => {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "inner" },
      React.createElement(
        "p",
        null,
        "By ",
        React.createElement(
          "a",
          { href: "https://github.com/btrie/fullstack-boilerplate" },
          "@btrie/fullstack-boilerplate"
        ),
        "."
      )
    )
  );
};

module.exports = Footer;
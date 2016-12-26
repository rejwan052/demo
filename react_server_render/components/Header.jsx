'use strict'
const React = require('react')
const Link = require('react-router/Link').default


const Brand = ({brand}) => {
  return (
    <h3 className="masthead-brand">{brand}</h3>
  )
}


const Nav = ({items=[]}) => {
  const lis = items.map((item, index) => (
    <Link key={index} activeOnlyWhenExact to={item.link} activeClassName="active">
      {({ isActive, onClick, href }) => (
        <li className={isActive ? "active" : null}>
          <a href={href} onClick={onClick}>{item.title}</a>
        </li>
      )}
    </Link>
  ))

  return (
    <nav>
      <ul className="nav masthead-nav">
        {lis}
      </ul>
    </nav>
  )
}


const Header = ({items, brand}) => {
  return (
    <div className="center" >
      <div className="masthead">
        <div className="inner">
          <Brand brand={brand} />
          <Nav items={items}/>
        </div>
      </div>
    </div>
  )
}


module.exports = Header

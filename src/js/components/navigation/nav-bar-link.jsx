import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const NavBarLink = props => {
  let navs = props.links.map((link, i) => {
    return (
      <li key={`nav-${i}`}>
        <Link
          to={link.url}
          className={`Navbar-link ${
            props.location.pathname.indexOf(link.url) > -1 ? 'is-active' : ''
          }`}
        >
          {link.text}&nbsp; | &nbsp;
        </Link>
      </li>
    )
  })

  return <ul className='Nav-container'>{navs}</ul>
}

export default withRouter(NavBarLink)

import React from 'react'

import NavBarLink from './nav-bar-link'

const NavBar = props => {
  return (
    <div className={`Navbar ${props.className || ''}`}>
      <NavBarLink
        links={[
          { url: '/badge', text: 'make badge' },
          { url: '/explorer', text: 'explore' }
        ]}
      />
    </div>
  )
}

export default NavBar

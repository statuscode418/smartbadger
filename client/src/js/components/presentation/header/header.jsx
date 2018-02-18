import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import NavBar from 'components/navigation/nav-bar'

import Logo from 'presentation/logos/logo'

import 'styles/components/header.scss'

const Header = props => {
  return (
    <header className='Header'>
      <Link to='/'>
        <Logo full={true} />
      </Link>
    </header>
  )
}

export default withRouter(Header)

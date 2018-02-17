import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import NavBar from 'components/navigation/nav-bar'

import Logo from 'presentation/logos/logo'
// import SubHeader from './sub-header'

import 'styles/components/header.scss'

const Header = props => {
  return (
    <header className='Header'>
      <Link to='/'>
        <Logo full={true} />
      </Link>
      <h1> V </h1>
      <NavBar user={props.user} />
    </header>
  )
}

export default withRouter(Header)

//< SubHeader openModal = { props.openModal } user = { props.user } />

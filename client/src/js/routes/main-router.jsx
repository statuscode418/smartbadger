import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import LandingContainer from 'components/landing'
import LoadingScreen from 'layout/loading-screen'
import BadgeContainer from 'components/badge/badge-container'
import ExploreContainer from 'components/explore/explore-container'
import FourOhFour from 'pages/four-oh-four.jsx'

const MainRouter = () => {
    return (
      <main id='main-content'>
        <Switch>
          <Route exact path='/' component={LandingContainer} />
          <Route exact path='/explorer' component={ExploreContainer} />
          <Route exact path='/badge' component={BadgeContainer} />
          <Route path='*' component={FourOhFour} />
        </Switch>
      </main>
    )
}

const mapStateToProps = state => {
  return {
    // user: state.user || {}
  }
}

export default withRouter(connect(mapStateToProps)(MainRouter))
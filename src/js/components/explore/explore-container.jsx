import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import 'styles/components/home'

class ExploreContainer extends React.Component {


  componentWillReceiveProps = async newProps => {
    if (newProps.getUser && !this.props.getUser) {
      try {
        // await newProps.getUser()
      } catch (err) {
        console.log('get user error: ', err) // eslint-disable-line no-console
      }
    }
  };

  componentDidMount = async () => {
    if (this.props.getUser) {
      try {
        // await this.props.getUser()
      } catch (err) {
        console.log('get user error: ', err) // eslint-disable-line no-console
      }
    }
  };

  render() {
    return (
      <div className='Home'>
        <div className='Home-content'>
          <h2>Explore</h2>
          <p>
            graphs and stuffs
          </p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer)

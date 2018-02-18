import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateBadge } from 'redux-store/actions/badgeActions'
import 'styles/components/home'
import BadgeFormContainer from '../forms/badge-form/badge-form-container'

class BadgeContainer extends React.Component {
  state = {
    badges: [],
  }

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

  updateBadge = (badges) => {
    this.setState({
      badges
    })
  }

  render() {
    const { badges } = this.state
    const deconstructedBadges = badges.map((badge, i) => {
        return (
        <div key={i}>
          <a href={badge.link} target='_blank' dangerouslySetInnerHTML={{ __html: badge.badge }}></a>
          <br></br>
          <blockquote> <code> {badge.md} </code> </blockquote>
        </div> )
      })
    return (
      <div className='Home'>
        <div className='Home-content'>
          <h2>CREATE A BADGE</h2>
          <BadgeFormContainer updateBadge={this.updateBadge}/>
          { badges.length && (
            <div>
              <h3> YOUR BADGES & MARKDOWN: </h3>
              { deconstructedBadges } 
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBadge: address => dispatch(updateBadge(address))
  }
}

const mapStateToProps = state => {
  return {
    badge: state.badge
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BadgeContainer)

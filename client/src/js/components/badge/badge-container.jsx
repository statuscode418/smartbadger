import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateBadge } from 'redux-store/actions/badgeActions'
import 'styles/components/home'
import BadgeFormContainer from '../forms/badge-form/badge-form-container'

class BadgeContainer extends React.Component {
  state = {
    badge: '',
    markdown: ''
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

  updateBadge = (markdown, badge) => {
    this.setState({
      markdown,
      badge
    })
  }

  render() {
    const { badge, markdown } = this.state
    const { svg, link } = badge
    return (
      <div className='Home'>
        <div className='Home-content'>
          <h2>CREATE A BADGE</h2>
          <BadgeFormContainer updateBadge={this.updateBadge}/>
          { badge && markdown && (
            <div>
              <h3> YOUR BADGE & MARKDOWN:  </h3>
              <a href={link} target='_blank' dangerouslySetInnerHTML={{ __html: svg}}></a>
              <blockquote> <code> {markdown} </code> </blockquote> 
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

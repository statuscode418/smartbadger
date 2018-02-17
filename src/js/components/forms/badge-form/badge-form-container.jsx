import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alertActions'

import BadgeForm from './presentation/badge-form'

class BadgeFormContainer extends React.Component {

  generateBadge (contractAddress) {
    return 'im a badge:' + contractAddress
  }

  submitForm = (formData) => {
    console.log('FORM DATA', formData)
    const badge = this.generateBadge(formData.address)
    this.props.updateBadge(badge)
  }

  render() {
    const fieldNames = [
      'address',
    ]

    const validationHelp = {
      dictionary: {
        'must-be-json': testData =>
          testData !== 'bloop' ? 'Field is not valid JSON' : null
      }
    }

    return (
      <Form
        id='badge-form'
        fieldNames={fieldNames}
        submitForm={this.submitForm}
        validationHelp={validationHelp}
      >
        <BadgeForm />
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (message, style = 'warning') =>
      dispatch(addAlert(message, style)),
    createUser: userData => dispatch(createUser(userData))
  }
}

const mapStateToProps = state => {
  return {
    badge: state.badge || ''
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BadgeFormContainer)
)

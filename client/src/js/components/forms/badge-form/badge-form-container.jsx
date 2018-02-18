import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form } from 'bloom-forms'
import { addAlert } from 'redux-store/actions/alertActions'
import config from 'config/config.json'
import BadgeForm from './presentation/badge-form'

class BadgeFormContainer extends React.Component {

  generateMarkdown(contractAddress, type) {
    return `[![SMART BADGER](${config.api.url}/${type}.svg)](https://etherscan.io/address/${contractAddress})`
  }

  async generateBadges(contractAddress) {  
    const generic = await WebService.getSampleBadge()
    const balance = await WebService.getBalanceBadge(contractAddress)
    const activity = await WebService.getActivityBadge(contractAddress) 
    const link = `https://etherscan.io/address/${contractAddress}`
    return Promise.resolve([
      { badge: generic, md: this.generateMarkdown(contractAddress, 'sample'), link },
      { badge: balance, md: this.generateMarkdown(contractAddress, 'balance'), link },
      { badge: activity, md: this.generateMarkdown(contractAddress, 'activity'), link }
    ])
  }

  submitForm = async (formData) => {
    const badges = await this.generateBadges(formData.address)
    this.props.updateBadge(badges)
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
    badge: state.badge
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BadgeFormContainer)
)

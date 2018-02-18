import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alertActions'

import BadgeForm from './presentation/badge-form'

class BadgeFormContainer extends React.Component {

  getBadge(contractAddress){
    // make request to server with contract address to see what can get
  }

  generateMarkdown(contractAddress) {
    return `[![SMART BADGER](https://img.shields.io/badge/smart_badger-contract_verified-brightgreen.svg?colorA=172ECF&colorB=2599FF&style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHBhdGggZD0iTTUuNjI2IDEuMzUybDIuNS0uMjYzLS44MDcgNS4xOSAyLjE4NC0uMjMtMi42MjIgNy4yMzcuMDY5LTUuNDc0LTIuMjY0LjIzOHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg%3D%3D)](https://etherscan.io/address/${contractAddress})`
  }

  generateBadge(contractAddress) {
    // will be result of getBadge
    const svg = 'https://img.shields.io/badge/smart_badger-contract_verified-brightgreen.svg?colorA=172ECF&colorB=2599FF&style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHBhdGggZD0iTTUuNjI2IDEuMzUybDIuNS0uMjYzLS44MDcgNS4xOSAyLjE4NC0uMjMtMi42MjIgNy4yMzcuMDY5LTUuNDc0LTIuMjY0LjIzOHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg%3D%3D'
    const link = `https://etherscan.io/address/${contractAddress}`
    return { svg, link }
  }

  submitForm = (formData) => {
    const markdown = this.generateMarkdown(formData.address)
    const badge = this.generateBadge(formData.address)
    this.props.updateBadge(markdown, badge)
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

import React from 'react'
import {
  Button,
  TextInput
} from 'bloom-forms'

const BadgeForm = props => {
  const formData = props.formData || {
    address: null
  }

  return (
    <form id='badge-form' className='Form AuthForm' noValidate>
      <h4 className='AuthForm-header'>Enter contract address to obtain badge</h4>
      <TextInput
        id='address'
        name='address'
        label=''
        showLabel
        value={formData.address ? formData.address.value : ''}
        onChange={props.updateForm}
        placeholder='Enter contract address'
      />
      <Button
        onClick={props.submitForm}
        contents='Submit Button'
        className='AuthForm-submit-button u-justify-center btn-badger'
      />
    </form>
  )
}

export default BadgeForm

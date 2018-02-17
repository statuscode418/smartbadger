import React from 'react'
import {
  Button,
  TextInput
} from 'bloom-forms'

const BadgeForm = props => {
  const formData = props.formData || {
    textinput: null
  }

  return (
    <form id='badge-form' className='Form AuthForm' noValidate>
      <h3 className='AuthForm-header'>Enter contract address to obtain badge</h3>
      <TextInput
        id='textinput'
        name='textinput'
        label=''
        showLabel
        value={formData.textinput ? formData.textinput.value : ''}
        onChange={props.updateForm}
        placeholder='Enter contract address'
      />
      <Button
        onClick={props.submitForm}
        contents='Submit Button'
        className='Btn AuthForm-submit-button u-justify-center'
      />
    </form>
  )
}

export default BadgeForm

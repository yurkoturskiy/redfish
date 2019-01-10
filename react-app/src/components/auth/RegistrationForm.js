import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormWrapper from '../FormWrapper'
import FormField from '../FormField'
import PasswordValidation from './PasswordValidation'

const theme = {
  background: '#f0f0f0',
}

let RegistrationForm = props => {
  const { error, handleSubmit, passValidate } = props
  return (
    <FormWrapper theme={theme}>
      <form onSubmit={handleSubmit}>
        <h3>Registration</h3>
        <Field
          name="username" 
          type="text"
          label="Username"
          component={FormField} 
        />
        <Field 
          name="email" 
          type="email" 
          label="Email"
          component={FormField}
        />
        <Field 
          name="password1" 
          label="Password"
          type="password"
          component={FormField}
          showPassIcon={true}
          onChange={passValidate}
        />
        <PasswordValidation />
        <input type="submit" value="Submit" />
        {error && <strong>{error}</strong>}
      </form>
    </FormWrapper>
  )
}

RegistrationForm = reduxForm({
  form: 'registrationForm',
})(RegistrationForm)

export default RegistrationForm

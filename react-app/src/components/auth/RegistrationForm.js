import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormWrapper from '../FormWrapper'
import FormField from '../FormField'

const theme = {
  background: '#f0f0f0',
};

var validation = undefined

let RegistrationForm = props => {
  const {handleSubmit, validate} = props
  validation = validate
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
          type="password"
          label="Password"
          component={FormField}
        />
        <input type="submit" value="Submit" />
      </form>
    </FormWrapper>
  )
}

RegistrationForm = reduxForm({
  form: 'registrationForm',
  validation,
})(RegistrationForm)

export default RegistrationForm

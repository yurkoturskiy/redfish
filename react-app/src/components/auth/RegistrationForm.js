import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormWrapper from '../FormWrapper'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const theme = {
  background: '#f0f0f0',
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let RegistrationForm = props => {
  console.log(props)
  const {handleSubmit} = props
  return (
    <FormWrapper theme={theme}>
      <form onSubmit={handleSubmit}>
        <h3>Registration</h3>
        <Field 
          name="username" 
          type="text"
          label="Username"
          component={renderField} 
        />
        <Field 
          name="email" 
          type="email" 
          label="Email"
          component={renderField}
        />
        <Field 
          name="password1" 
          type="password"
          label="Password"
          component={renderField}
        />
        <input type="submit" value="Submit" />
      </form>
    </FormWrapper>
  )
}

RegistrationForm = reduxForm({
  form: 'registrationForm',
})(RegistrationForm)

export default RegistrationForm

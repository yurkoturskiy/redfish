import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import FormWrapper from '../FormWrapper'
import FormField from '../FormField'

const theme = {
  background: '#f0f0f0',
};

let PasswordResetForm = props => {
  const { error, handleSubmit } = props
  return (
    <FormWrapper theme={theme}>
      <form onSubmit={handleSubmit}>
        <h3>Password reset</h3>
        <Field 
          name="email" 
          type="text"
          label="Email address"
          component={FormField} 
        />
        <input type="submit" value="Reset password"/>
        {error && <strong>{error}</strong>}
      </form>
    </FormWrapper>
  )
}

PasswordResetForm = reduxForm({
  form: 'passwordResetForm'
})(PasswordResetForm)

export default PasswordResetForm
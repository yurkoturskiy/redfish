import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import FormWrapper from '../FormWrapper'

let PasswordResetForm = props => {
  const { handleSubmit } = props
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <h3>Password reset</h3>
        <label for="email">Email address</label>
        <Field id="email" name="email" component="input" type="text" />
        <input type="submit" value="Reset password"/>
      </form>
    </FormWrapper>
  )
}


PasswordResetForm = reduxForm({
  form: 'passwordResetForm'
})(PasswordResetForm)


export default PasswordResetForm

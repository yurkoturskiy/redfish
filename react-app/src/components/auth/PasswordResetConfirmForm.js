import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import FormWrapper from '../FormWrapper'


const validate = values => {
  const errors = {}
  if (!values.new_password1) {
    errors.new_password1 = 'Required'
  }
  if (!values.new_password2) {
    errors.new_password2 = 'Required'
  }
  if (values.new_password1 != values.new_password2) {
    errors.match = 'give passwords should be the same'
  }
}

let PasswordResetConfirmForm = props => {
  const { handleSubmit } = props
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <h3>Password reset</h3>
        <label for="new_pass">New password</label>
        <Field id="new_pass" name="new_password1" component="input" type="password" />
        <label for="rep_pass">Repeat password</label>
        <Field id="rep_pass" name="new_password2" component="input" type="password" />
        <input type="submit" value="Set new password"/>
      </form>
    </FormWrapper>
  )
}


PasswordResetConfirmForm = reduxForm({
  form: 'passwordResetConfirmForm', validate
})(PasswordResetConfirmForm)


export default PasswordResetConfirmForm

import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'


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
    <form onSubmit={handleSubmit}>
      <h3>Password reset</h3>
      <label>
        New password:
        <Field name="new_password1" component="input" type="password" /><br/>
        Repeat password:
        <Field name="new_password2" component="input" type="password" /><br/>
      </label>
      <button type="submit">
        Set new password
      </button>
    </form>
  )
}


PasswordResetConfirmForm = reduxForm({
  form: 'passwordResetConfirmForm', validate
})(PasswordResetConfirmForm)


export default PasswordResetConfirmForm

import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

let PasswordResetForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <h3>Password reset</h3>
      <label>
        Email address:
        <Field name="email" component="input" type="text" /><br/>
      </label>
      <button type="submit">
        Reset password
      </button>
    </form>
  )
}


PasswordResetForm = reduxForm({
  form: 'passwordResetForm'
})(PasswordResetForm)


export default PasswordResetForm

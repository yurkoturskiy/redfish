import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import FormWrapper from '../FormWrapper'

let PasswordResetForm = props => {
  const { handleSubmit } = props
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3 className='title'>Password reset</h3>
        <label>
          Email address:
          <Field name="email" component="input" type="text" /><br/>
        </label>
        <button type="submit">
          Reset password
        </button>
      </form>
    </FormWrapper>
  )
}


PasswordResetForm = reduxForm({
  form: 'passwordResetForm'
})(PasswordResetForm)


export default PasswordResetForm

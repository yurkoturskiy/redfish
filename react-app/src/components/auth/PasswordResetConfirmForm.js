import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import FormWrapper from '../FormWrapper'
import FormField from '../FormField'

const theme = {
  background: '#f0f0f0',
}

let PasswordResetConfirmForm = props => {
  const { 
    error, 
    handleSubmit,
  } = props
  return (
    <FormWrapper theme={theme}>
      <form onSubmit={handleSubmit}>
        <h3>Password reset</h3>
        <Field 
          name="new_password1" 
          label="New password"
          type="password"
          component={FormField}
          showPassIcon={true}
        />
        <input type="submit" value="Set new password"/>
        {error && <strong>{error}</strong>}
      </form>
    </FormWrapper>
  )
}


PasswordResetConfirmForm = reduxForm({
  form: 'passwordResetConfirmForm'
})(PasswordResetConfirmForm)


export default PasswordResetConfirmForm

import React from "react"
import { Field, reduxForm } from 'redux-form'
// presentational components
import FormWrapper from '../FormWrapper'
import MaterialTextField from '../../components/MaterialTextField'
import Button from '@material/react-button'

const theme = {
  background: '#f0f0f0',
}

let PasswordResetConfirmForm = ({
  // general props
  error, // state
  handleSubmit, // actions

  // Password field props
  showPassState, passwordHelperText, // state
  passwordTralingIconOnClick, passwordOnChange, //actions
}) => (
  <FormWrapper theme={theme}>
    <form onSubmit={handleSubmit}>
      <h3>Password reset</h3>
      <Field 
        name="new_password1" 
        label="New password"
        type={showPassState ? 'text' : 'password'}
        helperText={passwordHelperText}
        tralingIcon={showPassState ? 'visibility' : 'visibility_off'}
        tralingIconOnClick={passwordTralingIconOnClick}
        onChange={passwordOnChange}
        component={MaterialTextField}
      />
      <Button type="submit" className="form-button">Set new password</Button>
      {error && <strong>{error}</strong>}
    </form>
  </FormWrapper>
)


PasswordResetConfirmForm = reduxForm({
  form: 'passwordResetConfirmForm'
})(PasswordResetConfirmForm)


export default PasswordResetConfirmForm

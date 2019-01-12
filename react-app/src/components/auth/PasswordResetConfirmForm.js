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
  error, requestCondition, // state
  handleSubmit, // actions

  // Password field props
  passwordVisibilityCondition, passwordHelperText, // state
  passwordTralingIconOnClick, passwordOnChange, //actions
}) => (
  <FormWrapper theme={theme}>
    <form onSubmit={handleSubmit}>
      <h3>Password reset</h3>
      <Field 
        name="new_password1" 
        label="New password"
        type={passwordVisibilityCondition ? 'text' : 'password'}
        helperText={passwordHelperText}
        tralingIcon={passwordVisibilityCondition ? 'visibility' : 'visibility_off'}
        tralingIconOnClick={passwordTralingIconOnClick}
        onChange={passwordOnChange}
        component={MaterialTextField}
      />
      <Button 
        type="submit" 
        className="form-button"
        disabled={requestCondition === 1}
      >
        Set new password
      </Button>
      {error && <strong>{error}</strong>}
    </form>
  </FormWrapper>
)


PasswordResetConfirmForm = reduxForm({
  form: 'passwordResetConfirmForm'
})(PasswordResetConfirmForm)


export default PasswordResetConfirmForm

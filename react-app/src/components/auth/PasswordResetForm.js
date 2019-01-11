import React from "react"
import { Field, reduxForm } from 'redux-form'
// presentational components
import FormWrapper from '../FormWrapper'
import MaterialTextField from '../../components/MaterialTextField'
import Button from '@material/react-button'

const theme = {
  background: '#f0f0f0',
}

let PasswordResetForm = ({
  // general props
  error, // state
  handleSubmit, // actions
}) => (
  <FormWrapper theme={theme}>
    <form onSubmit={handleSubmit}>
      <h3>Password reset</h3>
      <Field 
        name="email" 
        type="text"
        label="Email address"
        component={MaterialTextField} 
      />
      <Button type="submit" className="form-button">Reset password</Button>
      {error && <strong>{error}</strong>}
    </form>
  </FormWrapper>
)

PasswordResetForm = reduxForm({
  form: 'passwordResetForm'
})(PasswordResetForm)

export default PasswordResetForm
import React from "react"
import { Field, reduxForm } from 'redux-form'
// presentational components
import FormWrapper from '../../components/FormWrapper'
import MaterialTextField from '../../components/MaterialTextField'
import Button from '@material/react-button';

const theme = {
  background: '#f0f0f0',
}

let RegistrationForm = ({
  // general props
  error, requestCondition, // state
  handleSubmit, // actions

  // Password field props
  passwordVisibilityCondition, passwordHelperText, // state
  passwordTralingIconOnClick, passwordOnChange, //actions
}) => (
  <FormWrapper theme={theme}>
    <form onSubmit={handleSubmit}>
      <h3>Registration</h3>
      <Field
        id="username"
        name="username" 
        type="text"
        label="Username"
        component={MaterialTextField} 
      />
      <Field 
        id="email"
        name="email" 
        type="email" 
        label="Email"
        component={MaterialTextField}
      />
      <Field 
        id="password"
        name="password1" 
        label="Password"
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
        Submit
      </Button>
      {error && <strong>{error}</strong>}
    </form>
  </FormWrapper>
)

RegistrationForm = reduxForm({
  form: 'registrationForm',
})(RegistrationForm)

export default RegistrationForm

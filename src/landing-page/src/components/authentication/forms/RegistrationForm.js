import React, { useState } from 'react'
import { Form, Field } from 'formik'
// Local components
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import Button from '@material/react-button'

function RegistrationForm(props) {
  const [
    passwordVisibilityCondition,
    setPasswordVisibilityCondition,
  ] = useState(false)
  const switchPasswordVisibility = () => {
    setPasswordVisibilityCondition(
      passwordVisibilityCondition => !passwordVisibilityCondition
    )
  }
  const {
    status,
    isSubmitting,
    passwordOnChange,
    onChange,
    passwordHelperText,
  } = props

  return (
    <Form>
      <h3 className="form-header">Sign Up</h3>
      <Field
        id="username"
        label="Username"
        name="username"
        type="text"
        component={FormikMaterialTextField}
      />
      <Field
        id="email"
        label="email"
        name="email"
        type="email"
        component={FormikMaterialTextField}
      />
      <Field
        id="password"
        label="password"
        name="password1"
        type={passwordVisibilityCondition ? 'text' : 'password'}
        tralingIcon={
          passwordVisibilityCondition ? 'visibility' : 'visibility_off'
        }
        tralingIconOnClick={switchPasswordVisibility}
        component={FormikMaterialTextField}
        onChange={e => {
          onChange(e)
          passwordOnChange(e)
        }}
        helperText={passwordHelperText}
      />
      <div className="subform-container">
        {status && status.non_field_errors && (
          <div className="non-fields-error">
            <span>{status.non_field_errors}</span>
          </div>
        )}
        <div className="form-buttons-wrapper">
          <Button
            unelevated
            type="submit"
            className="material-button"
            solid={'true'}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default RegistrationForm

import React, { useState } from 'react'
import { Form, Field } from 'formik'
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import Button from '@material/react-button'

function PasswordResetConfirmForm(props) {
  const [
    passwordVisibilityCondition,
    setPasswordVisibilityCondition,
  ] = useState(false)

  const switchPasswordVisibility = () => {
    setPasswordVisibilityCondition(
      passwordVisibilityCondition => !passwordVisibilityCondition
    )
  }

  const { status, isSubmitting } = props
  return (
    <Form>
      <h3 className="form-header">Enter your new password</h3>
      <Field
        id="new_password1"
        label="New password"
        name="new_password1"
        type={passwordVisibilityCondition ? 'text' : 'password'}
        tralingIcon={
          passwordVisibilityCondition ? 'visibility' : 'visibility_off'
        }
        tralingIconOnClick={switchPasswordVisibility}
        component={FormikMaterialTextField}
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

export default PasswordResetConfirmForm

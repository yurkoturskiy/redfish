import React, { useState } from 'react'
import { Form, Field } from 'formik'
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import Button from '@material/react-button'

class PasswordResetForm extends React.Component {}

function PasswordResetForm(props) {
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
      <h3 className="form-header">Reset password</h3>
      <Field
        id="email"
        label="Email address"
        name="email"
        type="email"
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
            type="button"
            className="material-button"
            onClick={() => props.setRoute('login')}
          >
            go back
          </Button>
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

export default PasswordResetForm

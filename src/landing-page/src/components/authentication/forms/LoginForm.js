import React, { useState } from 'react'
import { Form, Field } from 'formik'
import { Link } from 'gatsby'
import { navigate } from 'gatsby'
// Local components
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import Button from '@material/react-button'
import Checkbox from '@material/react-checkbox'

function LoginForm(props) {
  const { status, isSubmitting } = props
  const [
    passwordVisibilityCondition,
    setPasswordVisibilityCondition,
  ] = useState(false)

  const switchPasswordVisibility = () => {
    setPasswordVisibilityCondition(
      passwordVisibilityCondition => !passwordVisibilityCondition
    )
  }

  return (
    <Form>
      <h3 className="form-header">Login to continue</h3>
      <Field
        id="username"
        label="username or email"
        name="username"
        type="text"
        component={FormikMaterialTextField}
      />
      <Field
        id="password"
        label="password"
        name="password"
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
            type="button"
            className="material-button"
            disabled={isSubmitting}
            onClick={() => props.setRoute('password-reset')}
          >
            Reset password
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

export default LoginForm

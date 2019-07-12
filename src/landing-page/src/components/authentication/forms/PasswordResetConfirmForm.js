import React from 'react'
import { Form, Field } from 'formik'
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import Button from '@material/react-button'

class PasswordResetConfirmForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordVisibilityCondition: false,
    }
    this.switchPasswordVisibility = this.switchPasswordVisibility.bind(this)
  }
  switchPasswordVisibility() {
    this.setState({
      passwordVisibilityCondition: this.state.passwordVisibilityCondition
        ? false
        : true,
    })
  }
  render() {
    const { status, isSubmitting } = this.props
    return (
      <Form>
        <h3>Enter your new password</h3>
        <Field
          id="new_password1"
          label="New password"
          name="new_password1"
          type={this.state.passwordVisibilityCondition ? 'text' : 'password'}
          tralingIcon={
            this.state.passwordVisibilityCondition
              ? 'visibility'
              : 'visibility_off'
          }
          tralingIconOnClick={this.switchPasswordVisibility}
          component={FormikMaterialTextField}
        />
        <Button type="submit" className="form-button" disabled={isSubmitting}>
          Set new password
        </Button>
        <span>{status && status.non_field_errors}</span>
      </Form>
    )
  }
}

export default PasswordResetConfirmForm

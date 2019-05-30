import React from 'react'
import { Form, Field } from 'formik'
import FormikMaterialTextField from './FormikMaterialTextField'
import FormWrapper from './FormWrapper'
// import Button from '@material/react-button';
import Button from '@material-ui/core/Button'

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
      <FormWrapper>
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
          <Button
            variant="text"
            type="submit"
            className="form-button"
            disabled={isSubmitting}
          >
            Set new password
          </Button>
          <span>{status && status.non_field_errors}</span>
        </Form>
      </FormWrapper>
    )
  }
}

export default PasswordResetConfirmForm

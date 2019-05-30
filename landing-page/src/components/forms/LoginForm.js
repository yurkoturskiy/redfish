import React from 'react'
import { Form, Field } from 'formik'
import { Link } from 'gatsby'

import FormWrapper from './FormWrapper'
import FormikMaterialTextField from './FormikMaterialTextField'
// import Button from '@material/react-button';
import Button from '@material-ui/core/Button'
import FacebookAuth from './FacebookAuth'
import GitHubAuth from './GitHubAuth'

class LoginForm extends React.Component {
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
      <FormWrapper theme={theme}>
        <Form>
          <h3>Welcome back!</h3>
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
            type={this.state.passwordVisibilityCondition ? 'text' : 'password'}
            tralingIcon={
              this.state.passwordVisibilityCondition
                ? 'visibility'
                : 'visibility_off'
            }
            tralingIconOnClick={this.switchPasswordVisibility}
            component={FormikMaterialTextField}
          />
          <div className="subform-container">
            <span className="non-fields-error">
              {status && status.non_field_errors}
            </span>
            <Link className="reset-password" to={'/password-reset'}>
              Reset password
            </Link>
            <Button
              variant="text"
              type="submit"
              className="form-button"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
          <FacebookAuth />
        </Form>
        <GitHubAuth />
      </FormWrapper>
    )
  }
}

export default LoginForm

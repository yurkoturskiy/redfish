import React from 'react'
import { Form, Field } from 'formik'
import { Link } from 'gatsby'
import { navigate } from 'gatsby'
// Local components
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import Button from '@material/react-button'
import Checkbox from '@material/react-checkbox'

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
      <Form>
        <h3>Login to continue</h3>
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
          <div>
            <Button
              type="button"
              className="material-button"
              disabled={isSubmitting}
              onClick={() => this.props.setRoute('password-reset')}
            >
              Reset password
            </Button>
            <Button
              unelevated
              type="submit"
              className="material-button"
              solid={true}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    )
  }
}

export default LoginForm

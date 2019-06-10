import React from 'react'
import { Form, Field } from 'formik'
import { navigate } from '@reach/router'
// Local components
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import FormWrapper from '../../styledUIElements/FormWrapper'
// import Button from '@material/react-button';
import Button from '@material-ui/core/Button'

class RegistrationForm extends React.Component {
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
    const {
      status,
      isSubmitting,
      passwordOnChange,
      onChange,
      passwordHelperText,
    } = this.props
    return (
      <Form>
        <h3>Sign Up</h3>
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
          type={this.state.passwordVisibilityCondition ? 'text' : 'password'}
          tralingIcon={
            this.state.passwordVisibilityCondition
              ? 'visibility'
              : 'visibility_off'
          }
          tralingIconOnClick={this.switchPasswordVisibility}
          component={FormikMaterialTextField}
          onChange={e => {
            onChange(e)
            passwordOnChange(e)
          }}
          helperText={passwordHelperText}
        />
        <div className="subform-container">
          <span className="non-fields-error">
            {status && status.non_field_errors}
          </span>
          <Button
            variant="text"
            type="button"
            className="form-button"
            disabled={isSubmitting}
            onClick={() => navigate('/authentication/login')}
          >
            Login
          </Button>
          <Button
            variant="contained"
            type="submit"
            className="form-button"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </Form>
    )
  }
}

export default RegistrationForm

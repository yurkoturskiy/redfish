import React from 'react';
import { Form, Field } from 'formik';
import { Link } from "gatsby";

import FormWrapper from './FormWrapper'
import FormikMaterialTextField from './FormikMaterialTextField'
import Button from '@material/react-button';

const theme = {
  background: '#f0f0f0',
}

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
      passwordVisibilityCondition: this.state.passwordVisibilityCondition ? false : true
    })
  }
  render() {
    const {status, isSubmitting} = this.props
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
            tralingIcon={this.state.passwordVisibilityCondition ? 'visibility' : 'visibility_off'}
            tralingIconOnClick={this.switchPasswordVisibility}
            component={FormikMaterialTextField}       
          />
          <Button type="submit" className="form-button" disabled={isSubmitting}>
            Submit
          </Button>
          <span>{status && status.non_field_errors}</span>
          <Link to={"/password-reset"}>Forgot password?</Link>
        </Form>
      </FormWrapper>
    )
  }
}

export default LoginForm
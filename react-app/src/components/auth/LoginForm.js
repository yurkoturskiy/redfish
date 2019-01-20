import React from 'react';
import { Form, Field } from 'formik';
import FormikMaterialTextField from '../FormikMaterialTextField'
import FormWrapper from '../FormWrapper'
import Button from '@material/react-button';
import { Link } from "react-router-dom";
import { endpoints } from '../../containers/AutoRouterContainer'

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
    const {status, touched, isSubmitting, errors} = this.props
    return (
      <FormWrapper theme={theme}>
        <Form>
          <h3>Login</h3>
          <Field
            id="email"
            label="username or email"
            name="email"
            type="email"
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
          <Link to={endpoints.passwordReset}>Forgot password?</Link>
        </Form>
      </FormWrapper>
    )
  }
}

export default LoginForm
import React from 'react';
import { Form, Field } from 'formik';
import FormikMaterialTextField from './FormikMaterialTextField'
import FormWrapper from './FormWrapper'
import Button from '@material/react-button';

const theme = {
  background: '#f0f0f0',
}

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
      passwordVisibilityCondition: this.state.passwordVisibilityCondition ? false : true
    })
  }
  render() {
    const {status, isSubmitting, passwordOnChange, onChange, passwordHelperText} = this.props
    return (
      <FormWrapper theme={theme}>
        <Form>
          <h3>Registration</h3>
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
            tralingIcon={this.state.passwordVisibilityCondition ? 'visibility' : 'visibility_off'}
            tralingIconOnClick={this.switchPasswordVisibility}
            component={FormikMaterialTextField}
            onChange={(e) => {onChange(e); passwordOnChange(e)}}
            helperText={passwordHelperText}
          />
          <Button type="submit" className="form-button" disabled={isSubmitting}>
            Submit
          </Button>
          <span>{status && status.non_field_errors}</span>
        </Form>
      </FormWrapper>
    )
  }
}

export default RegistrationForm
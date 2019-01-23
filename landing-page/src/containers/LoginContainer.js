import React from 'react'
import { Formik, Form, Field } from 'formik';
import LoginForm from '../components/forms/LoginForm'
import FormsMaster from './FormsMaster'


class Login extends FormsMaster {
  constructor(props) {
    super(props)
    this.endpoint = 'rest-auth/login/'
    this.handleResponse = this.handleResponse.bind(this)
  }
  handleResponse(response) {
    localStorage.setItem('token', response.data.key);
    console.log('Token received and saved')
  }
  render() {
  return ( 
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={this.handleSubmit}
      >
        {({ status, touched, isSubmitting, errors }) => (
          <LoginForm 
            status={status}
            touched={touched}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        )}
      </Formik>
    );
  }
}

export default Login
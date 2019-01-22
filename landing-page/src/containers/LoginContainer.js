import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios'
import FormWrapper from '../components/FormWrapper'
import Button from '@material/react-button';
// import LoginForm from '../components/auth/LoginForm'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(
    values, { setSubmitting, setErrors, setStatus }
  ) {
    axios({
      method: 'post',
      url: 'http://localhost:9000/rest-auth/login/',
      data: values
    })
      .then(response => {
        localStorage.setItem('token', response.data.key);
        console.log('Token received')
        setSubmitting(false)
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
        } else if (error.request) {
          console.log('Something wrong with a server')
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        setSubmitting(false)
      })
  }
  render() {
  return ( 
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={this.handleSubmit}
      >
        {({ status, touched, isSubmitting, errors }) => (
          <FormWrapper>
            <Form>
              <h3>Login</h3>
              <Field
                type="text"
                name="username"
              />
              <Field
                type="password"
                name="password"
              />
              <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </Form>
          </FormWrapper>
        )}
      </Formik>
    );
  }
}

export default Login
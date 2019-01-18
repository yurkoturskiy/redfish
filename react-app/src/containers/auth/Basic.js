import React from 'react';
import {connect} from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormWrapper from '../../components/FormWrapper'
import { login, } from '../../actions/restAuth'

class Basic extends React.Component {
  render() {
  return (
      <FormWrapper>
        <h3>Login</h3>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setFieldError, setErrors }) => {
            setTimeout(() => {
              this.props.login(values)
                .then(res => {
                  if (res.error) {
                    console.log(res)
                    let errors = res.payload.response
                    // setFieldError('email', 'aaa')
                    // setErrors({email: 'aaa', password: 'lol'})
                    setErrors(errors)
                  }
                })
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    );
  }
}


// const mapStatetoProps = state => ({
//     requestCondition: state.requestCondition.login,
// })

const mapDispatchToProps = dispatch => ({
    login: (values) => dispatch(login(values)),
})

export default connect(undefined, mapDispatchToProps)(Basic)
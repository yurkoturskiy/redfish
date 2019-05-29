import React from 'react'
import { Formik } from 'formik'

import FormsMaster from './FormsMaster'
import PasswordResetForm from '../components/forms/PasswordResetForm'

class PasswordReset extends FormsMaster {
  constructor(props) {
    super(props)
    this.endpoint = 'rest-auth/password/reset/'
    this.handleResponse = this.handleResponse.bind(this)
    this.state = {
      requestIsSucceed: false,
    }
  }
  handleResponse(response) {
    this.setState({ requestIsSucceed: true })
  }
  render() {
    if (this.state.requestIsSucceed) {
      return <h3>Check your email</h3>
    } else {
      return (
        <Formik
          initialValues={{ email: undefined }}
          onSubmit={this.handleSubmit}
        >
          {({ status, touched, isSubmitting, errors }) => (
            <PasswordResetForm
              status={status}
              touched={touched}
              isSubmitting={isSubmitting}
              errors={errors}
            />
          )}
        </Formik>
      )
    }
  }
}

export default PasswordReset

import React from 'react'
import { Formik } from 'formik'

import FormsMaster from './FormsMaster'
import PasswordResetConfirmForm from '../components/forms/PasswordResetConfirmForm'

class PasswordResetConfirm extends FormsMaster {
  constructor(props) {
    super(props)
    this.endpoint = 'rest-auth/password/reset/confirm/'
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      requestIsSucceed: false,
    }
  }
  prepareValues(values) {
    values['uid'] = this.props.uid
    values['token'] = this.props.token
    values['new_password2'] = values.new_password1
    return values
  }
  handleResponse(response) {
    this.setState({ requestIsSucceed: true })
  }
  render() {
    if (this.state.requestIsSucceed) {
      return <h1>password reset is succeed</h1>
    } else {
      return (
        <Formik
          initialValues={{ new_password1: undefined }}
          onSubmit={this.handleSubmit}
        >
          {({ status, touched, isSubmitting, errors }) => (
            <PasswordResetConfirmForm
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

export default PasswordResetConfirm

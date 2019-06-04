import React from 'react'
import { Formik } from 'formik'
import zxcvbn from 'zxcvbn'
import FormsMaster from '../FormsMaster'
import RegistrationForm from './RegistrationForm'

class RegistrationFormContainer extends FormsMaster {
  constructor(props) {
    super(props)
    this.endpoint = 'rest-auth/registration/'
    this.passwordStrengthValidation = this.passwordStrengthValidation.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.prepareValues = this.prepareValues.bind(this)
    this.state = {
      requestIsSucceed: false,
      passwordStrengthScore: undefined,
    }
  }
  prepareValues(values) {
    values['password2'] = values.password1
    return values
  }
  handleResponse(response) {
    this.setState({ requestIsSucceed: true })
  }
  passwordStrengthValidation(payload) {
    let fieldIsEmpty = payload.target.value.length === 0 ? true : false
    let evaluate = zxcvbn(payload.target.value)
    let helperText =
      (evaluate.score === 0 && 'too guessable') ||
      (evaluate.score === 1 && 'very guessable') ||
      (evaluate.score === 2 && 'somewhat guessable') ||
      (evaluate.score === 3 && 'safely unguessable') ||
      (evaluate.score === 4 && 'very unguessable')
    this.setState({
      passwordStrengthScore: fieldIsEmpty ? undefined : helperText,
    })
  }
  render() {
    if (this.state.requestIsSucceed) {
      return <h1>Confirm your email address</h1>
    } else {
      return (
        <Formik
          initialValues={{
            username: undefined,
            email: undefined,
            password1: undefined,
          }}
          onSubmit={this.handleSubmit}
        >
          {({ status, touched, isSubmitting, errors, handleChange }) => (
            <RegistrationForm
              status={status}
              touched={touched}
              isSubmitting={isSubmitting}
              errors={errors}
              onChange={handleChange}
              passwordOnChange={this.passwordStrengthValidation}
              passwordHelperText={this.state.passwordStrengthScore}
            />
          )}
        </Formik>
      )
    }
  }
}

export default RegistrationFormContainer

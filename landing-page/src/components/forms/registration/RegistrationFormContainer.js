import React, { useState } from 'react'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import zxcvbn from 'zxcvbn'
// Components
import RegistrationForm from './RegistrationForm'

const SUBMIT_REGISTRATION = gql`
  mutation registration(
    $username: String = ""
    $email: String = ""
    $password1: String = ""
  ) {
    registration(
      input: {
        username: $username
        email: $email
        password1: $password1
        password2: $password1
      }
    ) {
      key
    }
  }
`

function RegistrationFormContainer(props) {
  const [submitRegistration] = useMutation(SUBMIT_REGISTRATION)
  const [requestIsSucceed, setRequestIsSucceed] = useState(false)
  const [passwordStrengthScore, setPasswordStrengthScore] = useState(undefined)

  const handleSubmit = (values, { setSubmitting, setErrors, setStatus }) => {
    submitRegistration({ variables: values })
      .then(response => {
        setRequestIsSucceed(true)
        setSubmitting(false)
      })
      .catch(error => {
        if (error.graphQLErrors[0]) {
          let error_message = JSON.parse(error.graphQLErrors[0].message)
          setErrors(error_message)
          setStatus({ non_field_errors: error_message.non_field_errors })
        } else if (!error.graphQLErrors[0]) {
          setStatus({ non_field_errors: 'Something wrong with a server' })
          console.log('Something wrong with a server')
        } else {
          console.log('Error', error.graphQLErrors)
        }
        setSubmitting(false)
      })
  }

  const passwordStrengthValidation = payload => {
    let fieldIsEmpty = payload.target.value.length === 0 ? true : false
    let evaluate = zxcvbn(payload.target.value)
    let helperText =
      (evaluate.score === 0 && 'too guessable') ||
      (evaluate.score === 1 && 'very guessable') ||
      (evaluate.score === 2 && 'somewhat guessable') ||
      (evaluate.score === 3 && 'safely unguessable') ||
      (evaluate.score === 4 && 'very unguessable')
    setPasswordStrengthScore(fieldIsEmpty ? undefined : helperText)
  }
  if (requestIsSucceed) {
    return <h1>Confirm your email address</h1>
  } else {
    return (
      <Formik
        initialValues={{
          username: undefined,
          email: undefined,
          password1: undefined,
        }}
        onSubmit={handleSubmit}
      >
        {({ status, touched, isSubmitting, errors, handleChange }) => (
          <RegistrationForm
            status={status}
            touched={touched}
            isSubmitting={isSubmitting}
            errors={errors}
            onChange={handleChange}
            passwordOnChange={passwordStrengthValidation}
            passwordHelperText={passwordStrengthScore}
          />
        )}
      </Formik>
    )
  }
}

export default RegistrationFormContainer

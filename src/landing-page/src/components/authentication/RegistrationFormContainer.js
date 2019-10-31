import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import zxcvbn from 'zxcvbn'
import Button from '@material/react-button'
// Components
import RegistrationForm from './forms/RegistrationForm'
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

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
  const [submitRegistration, { loading: mutationLoading }] = useMutation(
    SUBMIT_REGISTRATION
  )
  const [requestIsSucceed, setRequestIsSucceed] = useState(false)
  const [passwordStrengthScore, setPasswordStrengthScore] = useState(undefined)

  // Turn on spinner
  const client = useApolloClient()
  useEffect(() => {
    client.writeData({ data: { sending: mutationLoading } })
  }, [mutationLoading])

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
  return (
    <React.Fragment>
      <div className="form-card">
        {requestIsSucceed ? (
          <h3 className="succeed-message">Confirm your email address</h3>
        ) : (
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
                setRoute={props.setRoute}
              />
            )}
          </Formik>
        )}
      </div>
      <div className="authentication-footer">
        <Button
          type="button"
          className="material-button"
          outlined={true}
          onClick={() => props.setRoute('login')}
        >
          Login
        </Button>
        <AuthWithFacebook densed={true} />
        <AuthWithGitHub densed={true} />
      </div>
    </React.Fragment>
  )
}

export default RegistrationFormContainer

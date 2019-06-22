import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Formik } from 'formik'
// Components
import LoginForm from './forms/LoginForm'
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

const SUBMIT_LOGIN = gql`
  mutation login($username: String = "", $password: String = "") {
    login(input: { username: $username, password: $password }) {
      key
    }
  }
`

function LoginFormContainer(props) {
  const [submitLogin] = useMutation(SUBMIT_LOGIN)
  const [isAuth, setIsAuth] = useState(false)

  const handleSubmit = (values, { setSubmitting, setErrors, setStatus }) => {
    submitLogin({ variables: values })
      .then(response => {
        handleResponse(response)
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

  const handleResponse = response => {
    localStorage.setItem('token', response.data.login.key)
    setIsAuth(true)
    console.log('Token received and saved', localStorage.getItem('token'))
  }

  useEffect(() => {
    if (isAuth) {
      window.location.replace(process.env.REDFISH_APP_URL)
    }
  })

  return (
    <React.Fragment>
      <Formik
        initialValues={{ username: undefined, password: undefined }}
        onSubmit={handleSubmit}
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
      <div>or</div>
      <div>
        <p>Continue with: </p>
        <AuthWithFacebook>Sign in with Facebook</AuthWithFacebook>
        <AuthWithGitHub>Sign in with GitHub</AuthWithGitHub>
      </div>
    </React.Fragment>
  )
}

export default LoginFormContainer

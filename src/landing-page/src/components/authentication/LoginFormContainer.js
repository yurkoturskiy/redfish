import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import Button from '@material/react-button'
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
  const [submitLogin, { loading: mutationLoading }] = useMutation(SUBMIT_LOGIN)
  const [isAuth, setIsAuth] = useState(false)

  // Turn on spinner
  const client = useApolloClient()
  useEffect(() => {
    client.writeData({ data: { sending: mutationLoading || isAuth } })
  }, [mutationLoading, isAuth])

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
      window.location.replace(process.env.GATSBY_APP_URL)
    }
  })

  return (
    <React.Fragment>
      <div className="form-card">
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
              setRoute={props.setRoute}
            />
          )}
        </Formik>
      </div>
      <div className="authentication-footer">
        <Button
          type="button"
          className="material-button"
          outlined={true}
          onClick={() => props.setRoute('signup')}
        >
          Sign up
        </Button>
        <AuthWithFacebook densed={true} />
        <AuthWithGitHub densed={true} />
      </div>
    </React.Fragment>
  )
}

export default LoginFormContainer

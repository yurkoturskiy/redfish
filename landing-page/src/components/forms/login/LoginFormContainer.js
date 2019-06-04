import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Formik } from 'formik'

import LoginForm from './LoginForm'

const SUBMIT_LOGIN = gql`
  mutation login($username: String = "", $password: String = "") {
    login(input: { username: $username, password: $password }) {
      key
    }
  }
`

function LoginFormContainer(props) {
  const [submitLogin, { error, data }] = useMutation(SUBMIT_LOGIN)
  const [endpoint] = useState('rest-auth/login/')
  const [isAuth, setIsAuth] = useState(false)

  const handleSubmit = (values, { setSubmitting, setErrors, setStatus }) => {
    let preparedValues = prepareValues(values)
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

  const prepareValues = values => {
    return values
  }

  const handleResponse = response => {
    localStorage.setItem('token', response.data.login.key)
    setIsAuth(true)
    console.log('Token received and saved')
  }
  useEffect(() => {
    if (isAuth) {
      window.location.replace(process.env.REDFISH_APP_URL)
    }
  })

  return (
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
  )
}

export default LoginFormContainer

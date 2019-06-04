import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import axios from 'axios'

import LoginForm from './LoginForm'

function LoginFormContainer(props) {
  const [endpoint] = useState('rest-auth/login/')
  const [isAuth, setIsAuth] = useState(false)

  const handleSubmit = (values, { setSubmitting, setErrors, setStatus }) => {
    let preparedValues = prepareValues(values)
    postValues(preparedValues)
      .then(response => {
        handleResponse(response)
        setSubmitting(false)
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          setErrors(error.response.data)
          setStatus({ non_field_errors: error.response.data.non_field_errors })
        } else if (error.request) {
          setStatus({ non_field_errors: 'Something wrong with a server' })
          console.log('Something wrong with a server')
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        setSubmitting(false)
      })
  }

  const prepareValues = values => {
    return values
  }

  const postValues = values => {
    return axios({
      method: 'post',
      url: 'http://localhost:9000/' + endpoint,
      data: values,
    })
  }

  const handleResponse = response => {
    localStorage.setItem('token', response.data.key)
    setIsAuth(true)
    console.log('Token received and saved')
  }
  useEffect(() => {
    if (isAuth) {
      window.location.replace('http://localhost:3006/')
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

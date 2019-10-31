import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import Button from '@material/react-button'
// Components
import PasswordResetForm from './forms/PasswordResetForm'
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

const PASSWORD_RESET = gql`
  mutation passwordReset($email: String = "") {
    passwordReset(input: { email: $email }) {
      detail
    }
  }
`

function PasswordResetFormContainer(props) {
  const [passwordReset, { loading: mutationLoading }] = useMutation(
    PASSWORD_RESET
  )
  const [requestIsSucceed, setRequestIsSucceed] = useState(false)

  // Turn on spinner
  const client = useApolloClient()
  useEffect(() => {
    client.writeData({ data: { sending: mutationLoading } })
  }, [mutationLoading])

  const handleSubmit = (values, { setSubmitting, setErrors, setStatus }) => {
    passwordReset({ variables: values })
      .then(response => {
        handleResponse()
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

  const handleResponse = () => {
    setRequestIsSucceed(true)
  }

  return (
    <React.Fragment>
      <div className="form-card">
        {requestIsSucceed ? (
          <h3 className="succeed-message">Check your email</h3>
        ) : (
          <Formik initialValues={{ email: undefined }} onSubmit={handleSubmit}>
            {({ status, touched, isSubmitting, errors }) => (
              <PasswordResetForm
                status={status}
                touched={touched}
                isSubmitting={isSubmitting}
                errors={errors}
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

export default PasswordResetFormContainer

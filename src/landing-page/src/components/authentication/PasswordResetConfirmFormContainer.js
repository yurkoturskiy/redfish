import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import Button from '@material/react-button'
// Components
import PasswordResetConfirmForm from './forms/PasswordResetConfirmForm'
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

const PASSWORD_RESET_CONFIRM = gql`
  mutation passwordResetConfirm(
    $uid: String = ""
    $token: String = ""
    $newPassword1: String = ""
  ) {
    passwordResetConfirm(
      input: {
        uid: $uid
        token: $token
        newPassword1: $newPassword1
        newPassword2: $newPassword1
      }
    ) {
      detail
    }
  }
`

function PasswordResetConfirmFormContainer(props) {
  const [passwordResetConfirm, { loading: mutationLoading }] = useMutation(
    PASSWORD_RESET_CONFIRM
  )
  const [requestIsSucceed, setRequestIsSucceed] = useState(false)

  // Turn on spinner
  const client = useApolloClient()
  useEffect(() => {
    client.writeData({ data: { sending: mutationLoading } })
  }, [mutationLoading])

  const prepareValues = values => {
    values['uid'] = props.uid
    values['token'] = props.token
    values['newPassword1'] = values.new_password1
    values['newPassword2'] = values.new_password1
    return values
  }

  const handleSubmit = (values, { setSubmitting, setErrors, setStatus }) => {
    passwordResetConfirm({ variables: prepareValues(values) })
      .then(response => {
        setRequestIsSucceed(true)
        setSubmitting(false)
      })
      .catch(error => {
        if (error.graphQLErrors[0]) {
          console.log(error.graphQLErrors[0])
          let error_message = JSON.parse(error.graphQLErrors[0].message)
          error_message.new_password1 = error_message.new_password2
          if (error_message.token)
            error_message.non_field_errors = 'Invalid token'
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

  return (
    <React.Fragment>
      <div className="form-card">
        {requestIsSucceed ? (
          <h3 className="succeed-message">Password reset is succeed</h3>
        ) : (
          <Formik
            initialValues={{ new_password1: undefined }}
            onSubmit={handleSubmit}
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
        )}
      </div>
    </React.Fragment>
  )
}

export default PasswordResetConfirmFormContainer

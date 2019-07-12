import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const CONFIRM_EMAIL = gql`
  mutation confirmEmail($key: String!) {
    confirmEmail(input: { key: $key }) {
      detail
    }
  }
`

function ConfirmEmail(props) {
  const [confirmEmail, { error, data }] = useMutation(CONFIRM_EMAIL)
  useEffect(() => {
    confirmEmail({ variables: { key: props.activationKey } })
  }, [])
  if (!data) {
    return <div>confirming</div>
  } else if (error) {
    return <div>{error}</div>
  } else {
    return <div>{data.confirmEmail.detail}</div>
  }
}

export default ConfirmEmail

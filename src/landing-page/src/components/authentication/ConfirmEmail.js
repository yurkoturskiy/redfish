import React, { useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Button from '@material/react-button'
// Components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

const CONFIRM_EMAIL = gql`
  mutation confirmEmail($key: String!) {
    confirmEmail(input: { key: $key }) {
      detail
    }
  }
`

function ConfirmEmail(props) {
  const [confirmEmail, { loading: mutationLoading, error, data }] = useMutation(
    CONFIRM_EMAIL
  )

  // Turn on spinner
  const client = useApolloClient()
  useEffect(() => {
    client.writeData({ data: { sending: mutationLoading } })
  }, [mutationLoading])

  useEffect(() => {
    confirmEmail({ variables: { key: props.activationKey } })
  }, [])

  return (
    <React.Fragment>
      <div className="form-card">
        {mutationLoading && <h3 className="succeed-message">Confirming...</h3>}
        {data && <h3 className="succeed-message">Email confirmed</h3>}
        {error && <h3 className="succeed-message">{error}</h3>}
      </div>
    </React.Fragment>
  )
}

export default ConfirmEmail

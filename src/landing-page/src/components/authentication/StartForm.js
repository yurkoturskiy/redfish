import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Button from '@material/react-button'
// Local components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'
import Spinner from '../styledUIElements/Spinner'

const query = gql`
  query {
    sending @client
  }
`

function StartForm(props) {
  const { loading, error, data } = useQuery(query)

  const formWrapperStyle = {
    '--authentication-start-form-pointer-event': data.sending ? 'none' : 'auto',
    '--authentication-start-form-opacity': data.sending ? '0.2' : '1',
  }

  return (
    <div>
      {data.sending && <Spinner size="middle" />}
      <div className="authentication-start-form" style={formWrapperStyle}>
        <h5 className="header">Pick the way to go</h5>
        <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
        <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
        <div className="start-form-buttons-wrapper">
          <Button
            className="material-button"
            outlined={true}
            onClick={() => props.setRoute('login')}
          >
            Log in
          </Button>
          <Button
            className="material-button"
            outlined={true}
            onClick={() => props.setRoute('signup')}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StartForm

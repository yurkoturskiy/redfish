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
    spinner @client
  }
`

function StartForm(props) {
  const {
    loading,
    error,
    data: { spinner },
  } = useQuery(query)
  !loading && !error && console.log('spinner state data', spinner)
  return (
    <div className="authentication-start-form">
      {spinner && <Spinner />}
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
  )
}

export default StartForm

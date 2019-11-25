import React from 'react'
import Button from '@material/react-button'
// Local components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

function StartForm(props) {
  return (
    <div className="authentication-start-form">
      <h5 className="header">Pick the way to go</h5>
      {/*<AuthWithFacebook>Continue with Facebook</AuthWithFacebook>*/}
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

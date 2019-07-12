import React from 'react'
import { navigate } from 'gatsby'
import Button from '@material/react-button'
// Local components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

function AuthenticationContainer() {
  return (
    <div className="authentication">
      <h5 className="header">Authorize to continue, please</h5>
      <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
      <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
      <div className="separator">
        <p>Or via email</p>
      </div>
      <div className="buttonsWrapper">
        <Button onClick={() => navigate('/authentication/login')}>
          Log in
        </Button>
        <Button onClick={() => navigate('/authentication/signup')}>
          Sign up
        </Button>
      </div>
    </div>
  )
}

export default AuthenticationContainer

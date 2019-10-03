import React from 'react'
import Button from '@material/react-button'
// Local components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

function StartForm(props) {
  return (
    <React.Fragment>
      <h5 className="header">Authorize to continue, please</h5>
      <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
      <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
      <div className="separator">
        <p>Or via email</p>
      </div>
      <div className="buttonsWrapper">
        <Button onClick={() => props.setRoute('login')}>Log in</Button>
        <Button onClick={() => props.setRoute('signup')}>Sign up</Button>
      </div>
    </React.Fragment>
  )
}

export default StartForm

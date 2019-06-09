import React from 'react'
import { css } from 'linaria'
// Local components
import AuthWithFacebook from './authentication/AuthWithFacebook'
import AuthWithGitHub from './authentication/AuthWithGitHub'
// Styled elements
import Button from './styledUIElements/Button'

const wrapper = css`
  width: 300px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  padding: 24px;
  border: 1px solid lightgrey;
`

function AuthenticationContainer(props) {
  return (
    <div className={wrapper}>
      <h5>Choose the way you want to be authorized</h5>
      <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
      <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
      <p>Or via email</p>
      <Button>Log in</Button>
      <Button>Sign up</Button>
    </div>
  )
}

export default AuthenticationContainer

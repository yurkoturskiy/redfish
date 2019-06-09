import React from 'react'
import { css } from 'linaria'
// Local components
import AuthWithFacebook from './authentication/AuthWithFacebook'
import AuthWithGitHub from './authentication/AuthWithGitHub'

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
      <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
      <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
    </div>
  )
}

export default AuthenticationContainer

import React, { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import { css } from 'linaria'
// Local components
import AuthWithFacebook from './authentication/AuthWithFacebook'
import AuthWithGitHub from './authentication/AuthWithGitHub'
import LoginFormContainer from './forms/login/LoginFormContainer'
import RegistrationFormContainer from './forms/registration/RegistrationFormContainer'
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
  const [lastAuthAction] = useState(localStorage.getItem('lastAuthAction'))
  if (props.method === 'navigate') {
    !lastAuthAction && navigate('/authentication')
    lastAuthAction === 'facebook' && navigate('/authentication')
    lastAuthAction === 'github' && navigate('/authentication')
    lastAuthAction === 'login' && navigate('/authentication/login')
    lastAuthAction === 'signup' && navigate('/authentication/signup')
  }

  var content
  if (!props.method) {
    content = (
      <React.Fragment>
        <h5>Choose the way you want to be authorized</h5>
        <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
        <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
        <p>Or via email</p>
        <Link to="/authentication/login/">
          <Button>Log in</Button>
        </Link>
        <Link to="/authentication/signup/">
          <Button>Sign up</Button>
        </Link>
      </React.Fragment>
    )
  } else if (props.method === 'login') {
    content = <h5>Login</h5>
  } else if (props.method === 'signup') {
    content = <h5>Sign up</h5>
  }
  return <div className={wrapper}>{content}</div>
}

export default AuthenticationContainer

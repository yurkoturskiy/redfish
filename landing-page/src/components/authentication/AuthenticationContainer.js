import React, { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import { css } from 'linaria'
// Local components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'
// Styled elements
import Button from '../styledUIElements/Button'

function AuthenticationContainer(props) {
  return (
    <React.Fragment>
      <h5>Choose the way you want to be authorized</h5>
      <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
      <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
      <p>Or via email</p>
      <Button onClick={() => navigate('/authentication/login')}>Log in</Button>
      <Button onClick={() => navigate('/authentication/signup')}>
        Sign up
      </Button>
    </React.Fragment>
  )
}

export default AuthenticationContainer

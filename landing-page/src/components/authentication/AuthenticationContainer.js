import React from 'react'
import { navigate } from '@reach/router'
import { css } from 'linaria' // eslint-disable-line
import Button from '@material/react-button'
// Local components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

const header = css`
  font-size: 1.5rem;
  font-weight: 300;
  color: #aaaeb8;
  text-align: center;
  margin: 0px;
  padding: 16px 0 8px 0;
`

const separator = css`
  display: block;
  margin: 8px auto 8px auto;
  text-align: center;
`

const buttonsWrapper = css`
  display: block;
  margin: 8px auto 8px auto;
`

const button = css`
  display: block;
`

function AuthenticationContainer(props) {
  return (
    <React.Fragment>
      <h5 className={header}>Authorize to continue, please</h5>
      <AuthWithFacebook>Continue with Facebook</AuthWithFacebook>
      <AuthWithGitHub>Continue with GitHub</AuthWithGitHub>
      <div className={separator}>
        <p>Or via email</p>
      </div>
      <div className={buttonsWrapper}>
        <Button
          className={button}
          onClick={() => navigate('/authentication/login')}
        >
          Log in
        </Button>
        <Button
          className={button}
          onClick={() => navigate('/authentication/signup')}
        >
          Sign up
        </Button>
      </div>
    </React.Fragment>
  )
}

export default AuthenticationContainer

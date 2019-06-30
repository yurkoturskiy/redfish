import React from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import Button from '@material/react-button'
// Local components
import AuthWithFacebook from './AuthWithFacebook'
import AuthWithGitHub from './AuthWithGitHub'

function AuthenticationContainer({ className }) {
  return (
    <div className={className}>
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

const StyledComp = styled(AuthenticationContainer)`
  .header {
    font-size: 1.5rem;
    font-weight: 300;
    color: #aaaeb8;
    text-align: center;
    margin: 0px;
    padding: 16px 0 8px 0;
  }

  .separator {
    display: block;
    margin: 8px auto 8px auto;
    text-align: center;
  }

  .buttonsWrapper {
    display: flex;
    justify-content: center;
    margin: 8px auto 8px auto;
  }
`

export default StyledComp

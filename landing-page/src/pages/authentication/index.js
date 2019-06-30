import React from 'react'
import { Router } from '@reach/router'
import styled from 'styled-components'
// Local components
import Layout from '../../components/layout'
import Navigator from '../../components/authentication/Navigator'
import AuthenticationContainer from '../../components/authentication/AuthenticationContainer'
import LoginFormContainer from '../../components/authentication/LoginFormContainer'
import RegistrationFormContainer from '../../components/authentication/RegistrationFormContainer'
import PasswordResetFormContainer from '../../components/authentication/PasswordResetFormContainer'
import PasswordResetConfirmFormContainer from '../../components/authentication/PasswordResetConfirmFormContainer'

const AuthenticationIndex = ({ className }) => {
  return (
    <Layout>
      <div className={className}>
        <Router>
          <Navigator path="authentication/navigate" />
          <AuthenticationContainer path="authentication" />
          <LoginFormContainer path="authentication/login" />
          <RegistrationFormContainer path="authentication/signup" />
          <PasswordResetFormContainer path="authentication/password-reset" />
          <PasswordResetConfirmFormContainer path="authentication/password-reset/confirm/:uid/:token" />
        </Router>
      </div>
    </Layout>
  )
}

const StyledComp = styled(AuthenticationIndex)`
  width: 512px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  border: 1px solid lightgrey;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`

export default StyledComp

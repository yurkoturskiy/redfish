import React from 'react'
import { Router } from '@reach/router'
import { css } from 'linaria'
// Local components
import Layout from '../../components/layout'
import Navigator from '../../components/authentication/Navigator'
import AuthenticationContainer from '../../components/authentication/AuthenticationContainer'
import LoginFormContainer from '../../components/authentication/LoginFormContainer'
import RegistrationFormContainer from '../../components/authentication/RegistrationFormContainer'
import PasswordResetFormContainer from '../../components/authentication/PasswordResetFormContainer'
import PasswordResetConfirmFormContainer from '../../components/authentication/PasswordResetConfirmFormContainer'

const wrapper = css`
  width: 300px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  padding: 24px;
  border: 1px solid lightgrey;
`

export default () => {
  return (
    <Layout>
      <div className={wrapper}>
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

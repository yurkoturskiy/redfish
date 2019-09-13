import React from 'react'
import { Router } from '@reach/router'
// Local components
import Layout from '../../components/layout'
import Navigator from '../../components/authentication/Navigator'
import AuthenticationContainer from '../../components/authentication/AuthenticationContainer'
import LoginFormContainer from '../../components/authentication/LoginFormContainer'
import RegistrationFormContainer from '../../components/authentication/RegistrationFormContainer'
import PasswordResetFormContainer from '../../components/authentication/PasswordResetFormContainer'
import PasswordResetConfirmFormContainer from '../../components/authentication/PasswordResetConfirmFormContainer'

const AuthenticationIndex = () => {
  return (
    <Layout>
      <div className="authentication-page">
        <div className="authentication-container">
          <Router>
            <Navigator path="authentication/navigate" />
            <AuthenticationContainer path="authentication" />
            <LoginFormContainer path="authentication/login" />
            <RegistrationFormContainer path="authentication/signup" />
            <PasswordResetFormContainer path="authentication/password-reset" />
            <PasswordResetConfirmFormContainer path="authentication/password-reset/confirm/:uid/:token" />
          </Router>
        </div>
      </div>
    </Layout>
  )
}

export default AuthenticationIndex

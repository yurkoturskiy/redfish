import React from 'react'
import { Router } from '@reach/router'
// Local components
import Layout from '../../components/layout'
import AuthenticationContainer from '../../components/authentication/AuthenticationContainer'
import PasswordResetConfirmFormContainer from '../../components/authentication/PasswordResetConfirmFormContainer'
import ConfirmEmail from '../../components/authentication/ConfirmEmail'
import Background from '../../components/authentication/Background'

const AuthenticationIndex = props => {
  return (
    <Layout path={props.path}>
      <div className="authentication-page">
        <div className="authentication-container">
          <Background />
          <AuthenticationContainer>
            <Router>
              <PasswordResetConfirmFormContainer path="confirm/password-reset/:uid/:token" />
              <ConfirmEmail path="confirm/email/:activationKey" />
            </Router>
          </AuthenticationContainer>
        </div>
      </div>
    </Layout>
  )
}

export default AuthenticationIndex

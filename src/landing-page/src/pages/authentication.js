import React from 'react'
// Local components
import Layout from '../components/layout'
import AuthenticationContainer from '../components/authentication/AuthenticationContainer'
import Background from '../components/authentication/Background'

const AuthenticationIndex = () => {
  return (
    <Layout>
      <div className="authentication-page">
        <div className="authentication-container">
          <Background />
          <AuthenticationContainer path="authentication" />
        </div>
      </div>
    </Layout>
  )
}

export default AuthenticationIndex

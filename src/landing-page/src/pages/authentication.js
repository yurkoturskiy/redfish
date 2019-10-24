import React from 'react'
// Local components
import Layout from '../components/layout'
import AuthenticationContainer from '../components/authentication/AuthenticationContainer'
import Background from '../components/authentication/Background'

const AuthenticationIndex = props => {
  console.log('authentication props', props)
  return (
    <Layout path={props.path}>
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

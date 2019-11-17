import React from 'react'
// Local components
import Layout from '../components/layout'
import SEO from '../components/seo'
import OnStartAuthentication from '../components/OnStartAuthentication'
import AuthenticationContainer from '../components/authentication/AuthenticationContainer'
import Background from '../components/authentication/Background'

const AuthenticationIndex = props => {
  if (typeof window !== `undefined`) {
    if (window.localStorage.getItem('token')) return <OnStartAuthentication />
  }
  return (
    <Layout path={props.path}>
      <SEO title="Authentication" />
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

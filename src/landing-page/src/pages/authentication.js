import React from 'react'
// Local components
import Layout from '../components/layout'
import SEO from '../components/seo'
import AuthenticationContainer from '../components/authentication/AuthenticationContainer'
import Background from '../components/authentication/Background'

const AuthenticationIndex = props => {
  return (
    <Layout path={props.path}>
      <SEO
        title="Authentication"
        keywords={[
          `redfish`,
          `application`,
          `react`,
          `gatsby`,
          `django`,
          `python`,
          `graphql`,
        ]}
      />
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

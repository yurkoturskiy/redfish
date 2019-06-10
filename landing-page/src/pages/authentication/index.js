import React from 'react'
import { Router } from '@reach/router'
// Local components
import Layout from '../../components/layout'
import AuthenticationContainer from '../../components/AuthenticationContainer'

export default () => {
  return (
    <Layout>
      <Router>
        <AuthenticationContainer path="authentication" />
        <AuthenticationContainer path="authentication/:method" />
      </Router>
    </Layout>
  )
}

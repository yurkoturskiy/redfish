import React from 'react'
import { Router } from '@reach/router'
// Components
import Layout from '../../components/layout'
import ConfirmEmail from '../../components/ConfirmEmail'

export default () => {
  return (
    <Layout>
      <Router>
        <ConfirmEmail path="confirm-email/:activationKey" />
      </Router>
    </Layout>
  )
}

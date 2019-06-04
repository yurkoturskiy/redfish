import React from 'react'
import { Router } from '@reach/router'

import Layout from '../../components/layout'
import PasswordResetFormContainer from '../../components/forms/passwordReset/PasswordResetFormContainer'
import PasswordResetConfirmFormContainer from '../../components/forms/passwordResetConfirm/PasswordResetConfirmFormContainer'

export default () => {
  return (
    <Layout>
      <Router>
        <PasswordResetFormContainer path="password-reset" />
        <PasswordResetConfirmFormContainer path="password-reset/confirm/:uid/:token" />
      </Router>
    </Layout>
  )
}

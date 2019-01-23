import React from "react"
import { Router } from "@reach/router";

import Layout from "../../components/layout"
import PasswordResetContainer from "../../containers/PasswordResetContainer"
import PasswordResetConfirmContainer from "../../containers/PasswordResetConfirmContainer"


export default () => {
  return (
    <Layout>
      <Router>
        <PasswordResetContainer path="password-reset" />
        <PasswordResetConfirmContainer path="password-reset/confirm/:uid/:token" />
      </Router>
    </Layout>
  )
}
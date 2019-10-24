import React from 'react'
import Layout from '../components/layout'
import PasswordResetFormContainer from '../components/authentication/PasswordResetFormContainer'

export default props => {
  return (
    <Layout path={props.path}>
      <PasswordResetFormContainer />
    </Layout>
  )
}

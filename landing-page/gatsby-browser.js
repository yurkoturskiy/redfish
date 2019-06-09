/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from './apolloClient'

import OnStartAuthentication from './src/components/OnStartAuthentication'

export const wrapRootElement = ({ element }) => {
  if (window.location.pathname.indexOf('iframe') === -1) {
    // Behave as usual if pathname is not for iframe
    return (
      <ApolloProvider client={apolloClient}>
        <OnStartAuthentication>{element}</OnStartAuthentication>
      </ApolloProvider>
    )
  } else {
    return <React.Fragment>{element}</React.Fragment>
  }
}

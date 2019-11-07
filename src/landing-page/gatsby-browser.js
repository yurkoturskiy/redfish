/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from './apolloClient'
// require('prismjs/themes/prism.css')

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
}

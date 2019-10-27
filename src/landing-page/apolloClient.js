import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'

const cache = new InMemoryCache()

const defaultState = () => ({
  spinner: false,
  isAuthenticated: false,
  selectedNotes: [],
})

const stateLink = withClientState({
  cache,
  defaults: defaultState(),
})

const httpLink = createHttpLink({
  uri: process.env.GATSBY_SERVER_URL + process.env.GATSBY_GRAPHQL_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Token ${localStorage.getItem('token')}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
  cache,
})

export default apolloClient

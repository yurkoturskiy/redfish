import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { RestLink } from 'apollo-link-rest'

const cache = new InMemoryCache()

const defaultState = () => ({
  isAuthenticated: false,
  selectedNotes: [],
})

const stateLink = withClientState({
  cache,
  defaults: defaultState(),
})

const httpLink = createHttpLink({
  uri: process.env.REDFISH_GRAPHQL_API_URL,
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

const restLink = new RestLink({
  uri: process.env.REDFISH_REST_URL,
})

const apolloClient = new ApolloClient({
  link: ApolloLink.from([restLink, stateLink, authLink.concat(httpLink)]),
  cache,
})

export default apolloClient

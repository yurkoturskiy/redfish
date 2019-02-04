import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const cache = new InMemoryCache()

const defaultState = {
  appState: {
    __typename: 'appState',
    isAuth: localStorage.getItem('token') ? true : false,
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      logout: (_, __, { cache }) => {
        const query = gql`
          query {
            appState @client {
              isAuth
            }
          }
        `
        localStorage.removeItem('token')
        const previous = cache.readQuery({query})
        const data = {
          appState: {
            ...previous.appState,
            isAuth: false,
          }
        }
        console.log('logout')
        console.log('previous state', previous)
        cache.writeData({ query, data })
        console.log('current state', data)
        return null
      }
    }
  }
})


const httpLink = createHttpLink({
  uri: "http://localhost:9000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Token ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    authLink.concat(httpLink),
  ]),
  cache,
});

export default apolloClient
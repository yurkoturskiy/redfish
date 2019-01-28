import React from "react";
import { connect } from 'react-redux'
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class GrapheneProvider extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isAuth && !this.props.isAuth) {
      client.resetStore()
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}

const mapStateToProps = state => ({
    isAuth: state.restAuth.isAuth,
})

export default connect(mapStateToProps, undefined)(GrapheneProvider)
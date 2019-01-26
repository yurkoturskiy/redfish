import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Notes } from "./containers/Notes"

const client = new ApolloClient({
  uri: "http://localhost:9000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Notes/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

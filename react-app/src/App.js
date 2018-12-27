import {connect} from 'react-redux'
import React, { Component } from 'react';
import {snippets, users} from './actions/snippets'
import {withRouter} from 'react-router'

import Content from './containers/ContentContainer'
import Navigation from './containers/NavigationContainer'


class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Content />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.snippets.token,
    snippets: state.snippets.snippets,
    users: state.snippets.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putSnippets: (payload) => dispatch(snippets(payload)),
    putUsers: (payload) => dispatch(users(payload)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


import {connect} from 'react-redux'
import React, { Component } from 'react';
import {snippets} from '../actions/snippets'
import {user} from '../actions/restAuth'
import {withRouter} from 'react-router'

import AutoRouter from './AutoRouterContainer'
import NavigationContainer from './NavigationContainer'
import General from '../components/General'



class GeneralContainer extends Component {
  render() {
    return (
      <AutoRouter>
        <NavigationContainer>
          <p>auth: {((this.props.isAuth) ? 'true' : 'false')}</p>
          <p>token: {this.props.token}</p>
        </NavigationContainer>
      </AutoRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.restAuth.isAuth,
    token: localStorage.getItem('token'),
    snippets: state.snippets.snippets,
    users: state.snippets.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putSnippets: (payload) => dispatch(snippets(payload)),
    getUser: (payload) => dispatch(user(payload)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneralContainer))


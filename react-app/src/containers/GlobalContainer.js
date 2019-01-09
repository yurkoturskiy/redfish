import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
// container components
import AutoRouter from './AutoRouterContainer'
import NavigationContainer from './NavigationContainer'
// styled components
import GlobalStyle from '../components/GlobalStyle'
// actions
import { user } from '../actions/restAuth'
import { snippets } from '../actions/snippets'


class GlobalContainer extends React.Component {
  render() {
    return (
      <AutoRouter>
        <GlobalStyle/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalContainer))


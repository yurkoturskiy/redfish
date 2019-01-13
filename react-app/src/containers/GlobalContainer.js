import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
// container components
import AutoRouter from './AutoRouterContainer'
import NavigationContainer from './NavigationContainer'
// styled components
import GlobalStyle from '../components/GlobalStyle'
// actions
import { snippets } from '../actions/snippets'


class GlobalContainer extends React.Component {
  render() {
    console.log('is authenticated: ' + this.props.isAuth)
    console.log('token: ' + this.props.token)
    return (
      <AutoRouter>
        <GlobalStyle/>
        <NavigationContainer/>
      </AutoRouter>
    )
  }
}

const mapStateToProps = state => ({
    isAuth: state.restAuth.isAuth,
    token: localStorage.getItem('token'),
    snippets: state.snippets.snippets,
    users: state.snippets.users,
})

const mapDispatchToProps = dispatch => ({
    putSnippets: (payload) => dispatch(snippets(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalContainer))


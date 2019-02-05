import React from 'react'
import { withRouter } from 'react-router'
import { compose, graphql } from 'react-apollo'
// container components
import AutoRouter from './AutoRouterContainer'
import NavigationContainer from './NavigationContainer'
// styled components
import GlobalStyle from '../components/GlobalStyle'
// queries
import appState from '../graphql/appState'
import login from '../graphql/login'


class GlobalContainer extends React.Component {
  render() {
    console.log('is authenticated: ' + this.props.isAuth)
    console.log('token: ' + localStorage.getItem('token'))
    return (
      <AutoRouter>
        <GlobalStyle/>
        <NavigationContainer/>
      </AutoRouter>
    )
  }
}

export default withRouter(compose(
  graphql(appState, {
    props: ({ data: { isAuth } }) => ({
      isAuth
    })
  }),
)(GlobalContainer))
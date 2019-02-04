import React from 'react'
import { withRouter } from 'react-router'
import { withApollo, compose, graphql } from 'react-apollo'
// container components
import AutoRouter from './AutoRouterContainer'
import NavigationContainer from './NavigationContainer'
// styled components
import GlobalStyle from '../components/GlobalStyle'
//graphql
import appState from '../graphql/appState'


class GlobalContainer extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.appState.isAuth && !this.props.appState.isAuth) {
      this.props.client.resetStore()
    }
  }
  render() {
    console.log('is authenticated: ' + this.props.appState.isAuth)
    console.log('token: ' + localStorage.getItem('token'))
    return (
      <AutoRouter>
        <GlobalStyle/>
        <NavigationContainer/>
      </AutoRouter>
    )
  }
}

const mapIsAuthToProps = ({data: { appState: {isAuth} } }) => ({isAuth})

export default withRouter(withApollo(compose(
  graphql(appState, {
    props: ({ data: { appState } }) => ({
      appState
    })
  }),
)(GlobalContainer)))
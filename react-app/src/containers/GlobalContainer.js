import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
// container components
import AutoRouter from './AutoRouterContainer'
import NavigationContainer from './NavigationContainer'
// styled components
import GlobalStyle from '../components/GlobalStyle'
import GrapheneProvider from './GrapheneProvider'


class GlobalContainer extends React.Component {
  render() {
    
    console.log('is authenticated: ' + this.props.isAuth)
    console.log('token: ' + this.props.token)
    return (
      <GrapheneProvider>
        <AutoRouter>
          <GlobalStyle/>
          <NavigationContainer/>
        </AutoRouter>
      </GrapheneProvider>
    )
  }
}

const mapStateToProps = state => ({
    isAuth: state.restAuth.isAuth,
    users: state.restAuth.schema,
    token: localStorage.getItem('token'),
    snippets: state.snippets.snippets,
    users: state.snippets.users,
})

export default withRouter(connect(mapStateToProps, undefined)(GlobalContainer))


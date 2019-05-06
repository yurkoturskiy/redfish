import React from 'react'
import { withRouter } from 'react-router'
import { compose, graphql } from 'react-apollo'
// container components
import AutoRouter from './AutoRouter'
import NavigationContainer from './NavigationContainer'
// queries
import appState from '../graphql/appState'


// global style
import { css } from 'linaria'
import '@material/react-text-field/dist/text-field.css';
import '@material/react-button/dist/button.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-fab/dist/fab.css';
export const globals = css`
  :global() {
    @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css');
    @import url('https://fonts.googleapis.com/css?family=Fira+Sans');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

    body {
      font-family: 'Fira Sans', sans-serif;
      margin: 0;
      padding: 0;
    }    
  }
`
// const GlobalStyle = createGlobalStyle`
//   @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css');
//   @import url('https://fonts.googleapis.com/css?family=Fira+Sans');
//   @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

//   body {
//     font-family: 'Fira Sans', sans-serif;
//     margin: 0;
//     padding: 0;
//   }
// `

const authEndpoints = [
  '/profile',
  '/app',
]

const notAuthEndpoints = [
  '/',
  '/login',
  '/registration',
  '/password-reset',
]



class GlobalContainer extends React.Component {
  render() {
    console.log('is authenticated: ' + this.props.isAuth)
    console.log('token: ' + localStorage.getItem('token'))
    return (
      <AutoRouter>
        <NavigationContainer/>
      </AutoRouter>
    )
  }
}

export default compose(
  graphql(appState, {
    props: ({ data: { isAuth } }) => ({
      isAuth
    })
  }),
)(withRouter(GlobalContainer))
import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
// container components
import Main from './MainContainer'
import Application from './ApplicationContainer'
import Login from './auth/LoginContainer'
import Basic from './auth/Basic'
import Registration from './auth/RegistrationContainer'
import VerifyEmail from './auth/VerifyEmailContainer'
import Profile from './auth/ProfileContainer'
import PasswordReset from './auth/PasswordResetContainer'
import PasswordResetConfirm from './auth/PasswordResetConfirmContainer'

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


class AutoRouter extends React.Component {
  constructor(props) {
    super(props)
    this.checkPermission()
  }
  componentDidUpdate() {
    this.checkPermission()
  }
  checkPermission() {
    if (this.props.isAuth) {
      for (let i in notAuthEndpoints) {
        if (this.props.location.pathname === notAuthEndpoints[i]) {
          console.log('you logged in')
          this.props.history.push('/app')
        }
      } 
    } else {
      for (let i in authEndpoints) {
        if (this.props.location.pathname === authEndpoints[i]) {
          this.props.history.push('/login')
        }
      }
    } 
  }
  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <Switch>
        {/* for not loged in users */}
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login}/>
          <Route path="/basic" component={Basic}/>
          <Route path="/registration" component={Registration}/>
          <Route path="/rest-auth/registration/account-confirm-email/:key/" component={VerifyEmail}/>
          <Route exact path="/password-reset" component={PasswordReset}/>
          <Route path="/password-reset/confirm/:uid/:token" component={PasswordResetConfirm}/>
        {/* auth required */}
          <Route path="/profile" component={Profile}/>
          <Route path="/app" component={Application} />
        {/* neutral */}
          <Route path="/product" component={Main}/>
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    token: localStorage.getItem('token'),
    isAuth: state.restAuth.isAuth,
})

export default withRouter(connect(mapStateToProps, undefined)(AutoRouter))
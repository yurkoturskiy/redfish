import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// presentational components
import Navigation from '../components/Navigation'
// actions
import { logout } from '../actions/restAuth'


class NavigationContainer extends React.Component {
  render() {
    if (this.props.isAuth) {
      return (
        <Navigation>
          <ul>
            <Link to="/app"><li>redject</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
            <div onClick={this.props.logout}>
              <li>
                Logout
              </li>
            </div>
          </ul>
          {this.props.children}
        </Navigation>
      )
    } else {
      return (
        <Navigation>
          <ul>
            <Link to="/"><li>redject</li></Link>
            <Link to="/login"><li>Login</li></Link>
            <Link to="/registration"><li>Registration</li></Link>
          </ul>
          {this.props.children}
        </Navigation>
      )
    }
  }
}

const mapStateToProps = state => ({
  isAuth: state.restAuth.isAuth,
  username: state.restAuth.user.username
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer)

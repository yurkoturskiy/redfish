import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {logout} from '../actions/restAuth'

import Navigation from '../components/Navigation'


class NavigationContainer extends React.Component {
  render() {
    console.log(this.props.children)
    if (this.props.isAuth == true) {
      return (
        <Navigation>
          <ul className='elements'>
            <Link to="/app"><li className='element'>redject</li></Link>
            <Link to="/profile"><li className='element'>Profile</li></Link>
            <div onClick={this.props.logout}>
              <li className='element'>
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
          <ul className='elements'>
            <Link to="/"><li className='element'>redject</li></Link>
            <Link to="/login"><li className='element'>Login</li></Link>
            <Link to="/registration"><li className='element'>Registration</li></Link>
          </ul>
          {this.props.children}
        </Navigation>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.restAuth.isAuth,
    username: state.restAuth.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationContainer))

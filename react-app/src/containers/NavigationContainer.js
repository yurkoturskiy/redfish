import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {logout} from '../actions/restAuth'

class Navigation extends React.Component {
	render() {
		if (this.props.isAuth == true) {
			var bar = (
				<nav>
					<Link to="/app">redject</Link>
					<ul className="menu">
						<li><Link to="/profile">Profile</Link></li>
						<li>
							<div onClick={this.props.logout}>Logout</div>
						</li>
					</ul>
				</nav>
			)
		} else {
			var bar = (
				<nav>
					<Link to="/">redject</Link>
					<ul className="menu">
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/registration">Registration</Link></li>
					</ul>
				</nav>
			)
		}
		return bar
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))

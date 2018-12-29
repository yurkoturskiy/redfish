import React from "react"
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {user} from '../actions/restAuth'


class Application extends React.Component {
	componentDidMount() {
		if (this.props.isAuth) {
			this.props.getUser()	
		}
	}
	render() {
		return (
			<React.Fragment>
		    	<h1>Application</h1>
		    	<h5>{this.props.user.pk}</h5>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
  return {
  	isAuth: state.restAuth.isAuth,
    user: state.restAuth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(user()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Application))
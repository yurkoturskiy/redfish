import React from "react"
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import history from '../history'


class Main extends React.Component {
	componentDidMount() {
		if (this.props.isAuth) {
			history.push('/app')
		}
	}
	render() {
		return (
			<React.Fragment>
			    <h1>Main</h1>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
  return {
    	isAuth: state.restAuth.isAuth,
  }
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		wsSend: (msg) => (dispatch(send(msg)))
// 	}
// }

export default withRouter(connect(mapStateToProps, undefined)(Main))
import React from "react"
import {connect} from 'react-redux'
import {withRouter} from 'react-router'


class Main extends React.Component {
	render() {
		return (
			<React.Fragment>
		    <h1>Main</h1>
			</React.Fragment>
		)
	}
}

// const mapStateToProps = state => {
//   return {
    
//   }
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		wsSend: (msg) => (dispatch(send(msg)))
// 	}
// }

export default withRouter(connect(undefined, undefined)(Main))
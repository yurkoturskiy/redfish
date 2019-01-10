import React from 'react'
import { connect } from 'react-redux'

class PasswordValidation extends React.Component {
	render() {
		return (
			<div>
				<p>{this.props.score}</p>
				<p>{this.props.suggestions.map(suggestion => <p>{suggestion}</p>)}</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	score: state.ui.passwordValidation.score,
	suggestions: state.ui.passwordValidation.feedback.suggestions,
	warning: state.ui.passwordValidation.feedback.warning,
})

export default connect(mapStateToProps, undefined)(PasswordValidation)
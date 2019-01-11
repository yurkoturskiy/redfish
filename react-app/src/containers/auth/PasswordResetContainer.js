import React from 'react';
import {connect} from 'react-redux'
// presentational components
import PasswordResetForm from '../../components/auth/PasswordResetForm'
// actions
import {passwordReset, validate} from '../../actions/restAuth'


class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isSent = false
  }
  handleSubmit(values) {
    return this.props.passwordReset(values)
      .then(res => this.props.validate(res))
  }
  componentWillUpdate(prevProps) {
    // set isSent to true after success sending email
    if (this.props.numPassResetSucceed !== prevProps.numPassResetSucceed) {
      this.isSent = true
    }
  }
  render() {
    if (this.props.uiFreeze) {
      return <p>requesting</p>
    } else if (this.isSent) {
      return <p>Check your email</p>
    } else {
      return <PasswordResetForm onSubmit={this.handleSubmit} />
    }
  }
}

const mapStateToProps = state => ({
  uiFreeze: state.restAuth.uiFreeze,
  numPassResetSucceed: state.restAuth.numPassResetSucceed,
})

const mapDispatchToProps = dispatch => ({
  passwordReset: (email) => dispatch(passwordReset(email)),
  validate: (res) => dispatch(validate(res)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
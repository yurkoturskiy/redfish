import {connect} from 'react-redux'
import React, { Component } from 'react';
import PasswordResetForm from '../../components/auth/PasswordResetForm'
import {passwordReset} from '../../actions/restAuth'
import {withRouter} from 'react-router'
import {SubmissionError} from 'redux-form'

class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isSent = false
  }
  handleSubmit(values) {
    return this.props.passwordReset(values)
      .then(res => {
        // server-side validation
        if (res.payload.status === 400) {
          res.payload.response._error = res.payload.response.non_field_errors
          throw new SubmissionError(res.payload.response)
        }
    })
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

const mapStateToProps = state => {
  return {
    uiFreeze: state.restAuth.uiFreeze,
    numPassResetSucceed: state.restAuth.numPassResetSucceed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    passwordReset: (email) => dispatch(passwordReset(email)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset))
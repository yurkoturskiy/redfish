import {connect} from 'react-redux'
import React, { Component } from 'react';
import PasswordResetConfirmForm from '../../components/auth/PasswordResetConfirmForm'
import {passwordResetConfirm} from '../../actions/restAuth'
import {withRouter} from 'react-router'

class PasswordResetConfirm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isSent = false
  }
  handleSubmit(values) {
    let params = {
      'uid': this.props.match.params.uid,
      'token': this.props.match.params.token,
      'new_password1': values.new_password1,
      'new_password2': values.new_password2,
    }
    this.props.passwordResetConfirm(params)
  }
  componentWillUpdate(prevProps) {
    if (this.props.numPassResetConfirmSucceed !== prevProps.numPassResetConfirmSucceed) {
      this.isSent = true
    }
  }
  render() {
    if (this.props.uiFreeze) {
      return <p>requesting</p>
    } else if (this.isSent) {
      return <p>password reset is succeed</p>
    } else {
      return <PasswordResetConfirmForm onSubmit={this.handleSubmit} />
    }
  }
}

const mapStateToProps = state => {
  return {
    uiFreeze: state.restAuth.uiFreeze,
    numPassResetConfirmSucceed: state.restAuth.numPassResetConfirmSucceed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    passwordResetConfirm: (values) => dispatch(passwordResetConfirm(values)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirm))
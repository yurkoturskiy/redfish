import {connect} from 'react-redux'
import React, { Component } from 'react';
import PasswordResetConfirmForm from '../../components/auth/PasswordResetConfirmForm'
import {passwordResetConfirm} from '../../actions/restAuth'
import {withRouter} from 'react-router'

class PasswordResetConfirm extends Component {
  render() {

    const handleSubmit = values => {
      let params = {
        'uid': this.props.match.params.uid,
        'token': this.props.match.params.token,
        'new_password1': values.new_password1,
        'new_password2': values.new_password2,
      }
      this.props.passwordResetConfirm(params)
      console.log(params)
    }
    console.log(this.props)
    return (
      <div className="App">
        <p>{this.props.match.params.uid}</p>
        <p>{this.props.match.params.token}</p>

        <PasswordResetConfirmForm onSubmit={handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    passwordResetConfirm: (values) => dispatch(passwordResetConfirm(values)),
  }
}

export default withRouter(connect(undefined, mapDispatchToProps)(PasswordResetConfirm))
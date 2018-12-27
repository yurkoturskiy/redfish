import {connect} from 'react-redux'
import React, { Component } from 'react';
import PasswordResetForm from '../../components/auth/PasswordResetForm'
import {passwordReset} from '../../actions/snippets'
import {withRouter} from 'react-router'

class PasswordReset extends Component {
  render() {
    return (
      <div className="App">
        <PasswordResetForm onSubmit={this.props.passwordReset} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    passwordReset: (email) => dispatch(passwordReset(email)),
  }
}

export default withRouter(connect(undefined, mapDispatchToProps)(PasswordReset))
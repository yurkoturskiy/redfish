import {connect} from 'react-redux'
import React, { Component } from 'react';
import LoginForm from '../../components/auth/LoginForm'
import {login} from '../../actions/restAuth'
import {withRouter} from 'react-router'

class Login extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm onSubmit={this.props.login} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (values) => dispatch(login(values)),
  }
}

export default withRouter(connect(undefined, mapDispatchToProps)(Login))
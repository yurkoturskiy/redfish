import {connect} from 'react-redux'
import React, { Component } from 'react';
import LoginForm from '../../components/auth/LoginForm'
import {login, validate} from '../../actions/restAuth'
import {withRouter} from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(values) {
    // submit values to the server
    return this.props.login(values)
      .then(res => this.props.validate(res))
  }
  render() {
    return (
      <div className="App">
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (values) => dispatch(login(values)),
    validate: (res) => dispatch(validate(res)),
  }
}

export default withRouter(connect(undefined, mapDispatchToProps)(Login))
import React from 'react';
import { connect } from 'react-redux'
// presentational components
import LoginForm from '../../components/auth/LoginForm'
// actions
import { login, validate } from '../../actions/restAuth'

class Login extends React.Component {
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
    return <LoginForm onSubmit={this.handleSubmit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (values) => dispatch(login(values)),
    validate: (res) => dispatch(validate(res)),
  }
}

export default connect(undefined, mapDispatchToProps)(Login)
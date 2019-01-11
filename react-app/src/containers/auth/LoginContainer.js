import React from 'react';
import { connect } from 'react-redux'
// presentational components
import LoginForm from '../../components/auth/LoginForm'
// actions
import { login, validate } from '../../actions/restAuth'
import { showHidePass } from '../../actions/ui'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.forgotPasswordEndpoint = '/password-reset'
    if (this.props.showPassState) {
      this.props.showHidePass()
    }
  }
  handleSubmit(values) {
    // submit values to the server
    return this.props.login(values)
      .then(res => this.props.validate(res))
  }
  render() {
    return (
      <LoginForm 
        onSubmit={this.handleSubmit}
        showPassState={this.props.showPassState}
        passwordTralingIconOnClick={this.props.showHidePass}
        forgotPasswordEndpoint={this.forgotPasswordEndpoint}
       />
    )
  }
}

const mapStatetoProps = state => {
  return {
    showPassState: state.ui.showPassState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (values) => dispatch(login(values)),
    validate: (res) => dispatch(validate(res)),
    showHidePass: () => dispatch(showHidePass()),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Login)
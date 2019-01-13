import React from 'react';
import { connect } from 'react-redux'
// presentational components
import LoginForm from '../../components/auth/LoginForm'
// actions
import {
  login,
  validate,
} from '../../actions/restAuth'
import { switchPasswordVisibility } from '../../actions/conditions'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.forgotPasswordEndpoint = '/password-reset'
    if (this.props.passwordVisibilityCondition) {
      this.props.switchPasswordVisibility()
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
        passwordVisibilityCondition={this.props.passwordVisibilityCondition}
        passwordTralingIconOnClick={this.props.switchPasswordVisibility}
        forgotPasswordEndpoint={this.forgotPasswordEndpoint}
        requestCondition={this.props.requestCondition}
       />
    )
  }
}

const mapStatetoProps = state => ({
    passwordVisibilityCondition: state.ui.passwordVisibilityCondition,
    requestCondition: state.requestCondition.login,
})

const mapDispatchToProps = dispatch => ({
    login: (values) => dispatch(login(values)),
    validate: (res) => dispatch(validate(res)),
    switchPasswordVisibility: () => dispatch(switchPasswordVisibility()),
})

export default connect(mapStatetoProps, mapDispatchToProps)(Login)
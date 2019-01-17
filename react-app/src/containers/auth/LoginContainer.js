import React from 'react';
import { connect } from 'react-redux'
// presentational components
import LoginForm from '../../components/auth/LoginForm'
// actions
import {
  login,
  validateFormResponse,
} from '../../actions/restAuth'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordVisibilityCondition: false
    }
    this.switchPasswordVisibility = this.switchPasswordVisibility.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.forgotPasswordEndpoint = '/password-reset'
    if (this.props.passwordVisibilityCondition) {
      this.props.switchPasswordVisibility()
    }
  }
  handleSubmit(values) {
    // submit values to the server
    return this.props.login(values)
      .then(res => this.props.validateFormResponse(res))
  }
  switchPasswordVisibility() {
    this.setState({
      passwordVisibilityCondition: this.state.passwordVisibilityCondition ? false : true
    })
  }
  render() {
    return (
      <LoginForm 
        onSubmit={this.handleSubmit}
        passwordVisibilityCondition={this.state.passwordVisibilityCondition}
        passwordTralingIconOnClick={this.switchPasswordVisibility}
        forgotPasswordEndpoint={this.forgotPasswordEndpoint}
        requestCondition={this.props.requestCondition}
       />
    )
  }
}

const mapStatetoProps = state => ({
    requestCondition: state.requestCondition.login,
})

const mapDispatchToProps = dispatch => ({
    login: (values) => dispatch(login(values)),
    validateFormResponse: (res) => dispatch(validateFormResponse(res)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(Login)

import React from 'react'
import { connect } from 'react-redux'
// presentational components
import RegistrationForm from '../../components/auth/RegistrationForm'
// actions
import {
  registration,
  validateFormResponse, 
  passValidate
} from '../../actions/restAuth'
import { resetRequestCondition } from '../../actions/conditions'


class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordVisibilityCondition: false
    }
    this.switchPasswordVisibility = this.switchPasswordVisibility.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    if (this.props.passwordVisibilityCondition) {
      this.props.switchPasswordVisibility()
    }
  }
  handleSubmit(values) {
    // prepare values
    values.password2 = values.password1 
    // submit values to the api
    return this.props.registration(values)
      .then(res => this.props.validateFormResponse(res))
  }
  switchPasswordVisibility() {
    this.setState({
      passwordVisibilityCondition: this.state.passwordVisibilityCondition ? false : true
    })
  }
  render() {
    if (this.props.requestCondition === 2) {
      return <p>Confirm your email address</p>
    } else { 
      return (
        <RegistrationForm 
          onSubmit={this.handleSubmit} 
          passwordVisibilityCondition={this.state.passwordVisibilityCondition}
          passwordHelperText={this.props.passwordScore}
          passwordTralingIconOnClick={this.switchPasswordVisibility}
          passwordOnChange={this.props.passValidate}
          requestCondition={this.props.requestCondition}
        />
      )
    }
  }
  componentWillUnmount() {
    this.props.resetRequestCondition('registration')
  }
}

const mapStatetoProps = state => ({
  requestCondition: state.requestCondition.registration,
  // password field
  passwordScore: state.ui.passwordValidation.score,
})

const mapDispatchToProps = dispatch => ({
  registration: (values) => dispatch(registration(values)),
  resetRequestCondition: (payload) => dispatch(resetRequestCondition(payload)),
  validateFormResponse: (res) => dispatch(validateFormResponse(res)),
  passValidate: (payload) => dispatch(passValidate(payload)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(Registration)
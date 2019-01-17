import React from 'react'
import {connect} from 'react-redux'
// presentational components
import PasswordResetConfirmForm from '../../components/auth/PasswordResetConfirmForm'
// actions
import {
  passwordResetConfirm, 
  validateFormResponse, 
  passValidate,
} from '../../actions/restAuth'
import { resetRequestCondition } from '../../actions/conditions'


class PasswordResetConfirm extends React.Component {
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
    values['uid'] = this.props.match.params.uid
    values['token'] = this.props.match.params.token
    values['new_password2'] = values.new_password1
    return this.props.passwordResetConfirm(values)
      .then(res => this.props.validateFormResponse(res))
  }
  switchPasswordVisibility() {
    this.setState({
      passwordVisibilityCondition: this.state.passwordVisibilityCondition ? false : true
    })
  }
  render() {
    if (this.props.requestCondition === 2) {
      return <p>password reset is succeed</p>
    } else {
      return (
        <PasswordResetConfirmForm 
          // form submit handling method
          onSubmit={this.handleSubmit}
          // state of the show/hide password button
          passwordVisibilityCondition={this.state.passwordVisibilityCondition}
          // zxcvbn password strength
          passwordHelperText={this.props.passwordScore}
          // show/hide password button method
          passwordTralingIconOnClick={this.switchPasswordVisibility}
          // zxcvbn validation method
          passwordOnChange={this.props.passValidate}
          // request condition for freezing UI while requesting
          requestCondition={this.props.requestCondition}
        />
      )
    }
  }
}

const mapStateToProps = state => ({
  requestCondition: state.requestCondition.passwordResetConfirm,
  // password field
  passwordScore: state.ui.passwordValidation.score,
})

const mapDispatchToProps = dispatch => ({
  passwordResetConfirm: (values) => dispatch(passwordResetConfirm(values)),
  validateFormResponse: (res) => dispatch(validateFormResponse(res)),
  passValidate: (payload) => dispatch(passValidate(payload)),
  resetRequestCondition: (payload) => dispatch(resetRequestCondition(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirm)
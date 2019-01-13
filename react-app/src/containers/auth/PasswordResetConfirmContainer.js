import React from 'react'
import {connect} from 'react-redux'
// presentational components
import PasswordResetConfirmForm from '../../components/auth/PasswordResetConfirmForm'
// actions
import {
  passwordResetConfirm, 
  validate, 
  passValidate,
} from '../../actions/restAuth'
import {switchPasswordVisibility} from '../../actions/conditions'
import { resetRequestCondition } from '../../actions/conditions'


class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props)
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
      .then(res => this.props.validate(res))
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
          passwordVisibilityCondition={this.props.passwordVisibilityCondition}
          // zxcvbn password strength
          passwordHelperText={this.props.passwordScore}
          // show/hide password button method
          passwordTralingIconOnClick={this.props.switchPasswordVisibility}
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
  passwordVisibilityCondition: state.ui.passwordVisibilityCondition,
  passwordScore: state.ui.passwordValidation.score,
})

const mapDispatchToProps = dispatch => ({
  passwordResetConfirm: (values) => dispatch(passwordResetConfirm(values)),
  validate: (res) => dispatch(validate(res)),
  passValidate: (payload) => dispatch(passValidate(payload)),
  switchPasswordVisibility: () => dispatch(switchPasswordVisibility()),
  resetRequestCondition: (payload) => dispatch(resetRequestCondition(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirm)
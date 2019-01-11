import React from 'react'
import {connect} from 'react-redux'
// presentational components
import PasswordResetConfirmForm from '../../components/auth/PasswordResetConfirmForm'
// actions
import {passwordResetConfirm, validate, passValidate} from '../../actions/restAuth'
import {showHidePass} from '../../actions/ui'


class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isSent = false
  }
  handleSubmit(values) {
    values['uid'] = this.props.match.params.uid
    values['token'] = this.props.match.params.token
    values['new_password2'] = values.new_password1
    return this.props.passwordResetConfirm(values)
      .then(res => this.props.validate(res))
  }
  componentWillUpdate(prevProps) {
    if (this.props.numPassResetConfirmSucceed !== prevProps.numPassResetConfirmSucceed) {
      this.isSent = true
    }
  }
  render() {
    if (this.props.uiFreeze) {
      return <p>requesting</p>
    } else if (this.isSent) {
      return <p>password reset is succeed</p>
    } else {
      return (
        <PasswordResetConfirmForm 
          // form submit handling method
          onSubmit={this.handleSubmit}
          // state of the show/hide password button
          showPassState={this.props.showPassState}
          // zxcvbn password strength
          passwordHelperText={this.props.passwordScore}
          // show/hide password button method
          passwordTralingIconOnClick={this.props.showHidePass}
          // zxcvbn validation method
          passwordOnChange={this.props.passValidate}
        />
      )
    }
  }
}

const mapStateToProps = state => ({
  uiFreeze: state.restAuth.uiFreeze,
  numPassResetConfirmSucceed: state.restAuth.numPassResetConfirmSucceed,
  // password field
  showPassState: state.ui.showPassState,
  passwordScore: state.ui.passwordValidation.score,
})

const mapDispatchToProps = dispatch => ({
  passwordResetConfirm: (values) => dispatch(passwordResetConfirm(values)),
  validate: (res) => dispatch(validate(res)),
  passValidate: (payload) => dispatch(passValidate(payload)),
  showHidePass: () => dispatch(showHidePass()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirm)
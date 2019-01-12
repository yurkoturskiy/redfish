import React from 'react';
import {connect} from 'react-redux'
// presentational components
import PasswordResetForm from '../../components/auth/PasswordResetForm'
// actions
import {passwordReset, validate} from '../../actions/restAuth'
import { resetRequestCondition } from '../../actions/conditions'


class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(values) {
    return this.props.passwordReset(values)
      .then(res => this.props.validate(res))
  }
  render() {
    if (this.props.requestCondition === 2) {
      return <p>Check your email</p>
    } else {
      return (
        <PasswordResetForm 
          onSubmit={this.handleSubmit}
          requestCondition={this.props.requestCondition}
        />
      )
    }
  }
  componentWillUnmount() {
    this.props.resetRequestCondition('PASSWORD_RESET')
  }
}

const mapStateToProps = state => ({
  requestCondition: state.requestCondition.PASSWORD_RESET,
})

const mapDispatchToProps = dispatch => ({
  passwordReset: (email) => dispatch(passwordReset(email)),
  validate: (res) => dispatch(validate(res)),
  resetRequestCondition: (payload) => dispatch(resetRequestCondition(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
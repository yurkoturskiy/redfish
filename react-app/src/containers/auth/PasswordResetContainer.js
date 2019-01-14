import React from 'react';
import {connect} from 'react-redux'
// presentational components
import PasswordResetForm from '../../components/auth/PasswordResetForm'
// actions
import {
  passwordReset,
  validateFormResponse,
} from '../../actions/restAuth'
import { resetRequestCondition } from '../../actions/conditions'


class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(values) {
    return this.props.passwordReset(values)
      .then(res => this.props.validateFormResponse(res))
  }
  render() {
    if (this.props.requestCondition === 2) {
      return <p>Check your email</p>
    } else {
      return (
        <React.Fragment>
        <PasswordResetForm 
          onSubmit={this.handleSubmit}
          requestCondition={this.props.requestCondition}
        />
        <p>{this.props.requestCondition}</p>
        </React.Fragment>
      )
    }
  }
  componentWillUnmount() {
    this.props.resetRequestCondition('passwordReset')
  }
}

const mapStateToProps = state => ({
  requestCondition: state.requestCondition.passwordReset,
})

const mapDispatchToProps = dispatch => ({
  passwordReset: (email) => dispatch(passwordReset(email)),
  validateFormResponse: (res) => dispatch(validateFormResponse(res)),
  resetRequestCondition: (payload) => dispatch(resetRequestCondition(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
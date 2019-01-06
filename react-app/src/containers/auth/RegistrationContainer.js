import {connect} from 'react-redux'
import React, { Component } from 'react';
import RegistrationForm from '../../components/auth/RegistrationForm'
import {registration} from '../../actions/restAuth'
import {withRouter} from 'react-router'

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

class Registration extends Component {
  constructor(props) {
    super(props)
    this.isSent = false
  }
  handleSubmit(values) {
    values.password2 = values.password1
    this.props.registration(values)
  }
  componentWillUpdate(prevProps) {
    if (this.props.numRegsSucceed !== prevProps.numRegsSucceed) {
      // if registration succeed
      this.isSent = true
    }
  }
  render() {
    if (this.props.uiFreeze) {
      return <p>Requesting</p>
    } else if (this.isSent) {
      return <p>Confirm your email address</p>
    } else {
      return <RegistrationForm onSubmit={this.handleSubmit} />
    }
  }
}

const mapStatetoProps = state => {
  return {
    uiFreeze: state.restAuth.uiFreeze,
    numRegsSucceed: state.restAuth.numRegsSucceed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registration: (values) => dispatch(registration(values)),
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Registration))
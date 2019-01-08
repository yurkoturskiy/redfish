import {connect} from 'react-redux'
import React, { Component } from 'react';
import RegistrationForm from '../../components/auth/RegistrationForm'
import {registration, validate} from '../../actions/restAuth'
import {withRouter} from 'react-router'


class Registration extends Component {
  constructor(props) {
    super(props)
    this.isSent = false
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(values) {
    // prepare values
    values.password2 = values.password1 
    // submit values to the server
    return this.props.registration(values)
      .then(res => this.props.validate(res))
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
      return <RegistrationForm 
                onSubmit={this.handleSubmit} />
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
    validate: (res) => dispatch(validate(res)),
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Registration))
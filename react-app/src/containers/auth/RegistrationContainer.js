import {connect} from 'react-redux'
import React, { Component } from 'react';
import RegistrationForm from '../../components/auth/RegistrationForm'
import {registration} from '../../actions/restAuth'
import {withRouter} from 'react-router'

import { SubmissionError } from 'redux-form'


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
      .then(res => {
        // server-side validation
        if (res.payload.status === 400) {
          res.payload.response._error = res.payload.response.non_field_errors
          console.log(res.payload.response)
          throw new SubmissionError(res.payload.response)  
        }
    })
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
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Registration))
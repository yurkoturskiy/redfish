import {connect} from 'react-redux'
import React, { Component } from 'react';
import RegistrationForm from '../../components/auth/RegistrationForm'
import {registration} from '../../actions/restAuth'
import {withRouter} from 'react-router'

class Registration extends Component {
  constructor(props) {
    super(props)
    this.isSent = false
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
      return <RegistrationForm onSubmit={this.props.registration} />
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
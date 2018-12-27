import {connect} from 'react-redux'
import React, { Component } from 'react';
import RegistrationForm from '../../components/auth/RegistrationForm'
import {registration} from '../../actions/restAuth'
import {withRouter} from 'react-router'

class Registration extends Component {
  render() {
    return (
      <div className="App">
        <RegistrationForm onSubmit={this.props.registration} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registration: (values) => dispatch(registration(values)),
  }
}

export default withRouter(connect(undefined, mapDispatchToProps)(Registration))
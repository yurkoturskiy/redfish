import {connect} from 'react-redux'
import React, { Component } from 'react';
import LoginForm from '../../components/auth/LoginForm'
import {login} from '../../actions/restAuth'
import {withRouter} from 'react-router'
import {SubmissionError} from 'redux-form'

const handleSubmit = values => {

}

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(values) {
    // submit values to the server
    return this.props.login(values)
      .then(res => {
        // server-side validation
        if (res.payload.status === 400) {
          res.payload.response._error = res.payload.response.non_field_errors
          console.log(res.payload.response)
          throw new SubmissionError(res.payload.response)
        }
    })
  }
  render() {
    return (
      <div className="App">
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (values) => dispatch(login(values)),
  }
}

export default withRouter(connect(undefined, mapDispatchToProps)(Login))
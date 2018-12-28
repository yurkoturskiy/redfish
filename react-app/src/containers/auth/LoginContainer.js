import {connect} from 'react-redux'
import React, { Component } from 'react';
import LoginForm from '../../components/auth/LoginForm'
import {snippets} from '../../actions/snippets'
import {login, logout} from '../../actions/restAuth'
import {withRouter} from 'react-router'
import history from '../../history'

class Login extends Component {
  componentDidMount() {
    if (this.props.isAuth) {
      // is already logged in
      history.push('/')
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.isAuth && (this.props.isAuth !== prevProps.isAuth)) {
      // redirecting after valid login
      console.log('login successfully')
      history.push('/')
    }
  }
  render() {
    return (
      <div className="App">
        <LoginForm onSubmit={this.props.login} />
        <br />
        <button onClick={this.props.getSnippets}>Get snippets</button>
        <p>snippets: {this.props.snippets}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.restAuth.isAuth,
    snippets: state.snippets.snippets,
    users: state.snippets.users,
    history: state.history,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (values) => dispatch(login(values)),
    logout: () => dispatch(logout()),
    getSnippets: (payload) => dispatch(snippets(payload)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
import {connect} from 'react-redux'
import React, { Component } from 'react';
import LoginForm from '../../components/auth/LoginForm'
import {snippets} from '../../actions/snippets'
import {login, logout} from '../../actions/restAuth'
import {withRouter} from 'react-router'

class Login extends Component {
  // componentDidMount() {
  //   fetch('https://api.mydomain.com')
  //     .then(response => response.json())
  //     .then(data => this.setState({ data }));
  // }
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
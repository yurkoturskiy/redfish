import {connect} from 'react-redux'
import React, { Component } from 'react';
import LoginForm from '../../components/auth/LoginForm'
import {login, logout, snippets, users} from '../../actions/snippets'
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
        <p>token: {this.props.token}</p>
        <button onClick={this.props.getSnippets}>Get snippets</button>
        <p>snippets: {this.props.snippets}</p>
        <button onClick={this.props.getUsers}>Get users</button>
        <p>users: {this.props.users}</p>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.snippets.token,
    snippets: state.snippets.snippets,
    users: state.snippets.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (values) => dispatch(login(values)),
    logout: () => dispatch(logout()),
    getSnippets: (payload) => dispatch(snippets(payload)),
    getUsers: (payload) => dispatch(users(payload)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
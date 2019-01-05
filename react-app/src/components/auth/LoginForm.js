import React from "react"
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormWrapper from '../FormWrapper'

const theme = {
  background: '#f0f0f0',
};

let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <FormWrapper theme={theme}>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label for="uname">username</label>
        <Field id="uname" name="username" component="input" type="text" />
        <label for="password">password</label>
        <Field id="password" name="password" component="input" type="password" />
        <input type="submit" value="Login"/>
        <Link to="/password-reset">Forgot password?</Link>
      </form>
    </FormWrapper>
  )
}


LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)


export default LoginForm

import React from "react"
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LoginFormWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  
`;

const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
`;


let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <LoginFormWrapper>
      <form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <label>
          username:<br/>
          <Field name="username" component="input" type="text" /><br/>
          password:<br/>
          <Field name="password" component="input" type="password" />
        </label><br/>
        <button type="submit">
          Submit
        </button>
        <Link to="/password-reset">Forgot password?</Link>
      </form>
    </LoginFormWrapper>
  )
}


LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)


export default LoginForm

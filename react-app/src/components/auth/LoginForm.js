import React from "react"
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormWrapper from '../FormWrapper'
import FormField from '../FormField'

const theme = {
  background: '#f0f0f0',
}

let LoginForm = props => {
  const { error, handleSubmit } = props
  return (
    <FormWrapper theme={theme}>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <Field 
          name="username" 
          type="text"
          label="Username or email"
          component={FormField}
        />
        <Field 
          name="password" 
          label="Password"
          type="password"
          component={FormField}
          showPassIcon={true}
        />
        <input type="submit" value="Login"/>
        {error && <strong>{error}</strong>}<br/>
        <Link to="/password-reset">Forgot password?</Link>
      </form>
    </FormWrapper>
  )
}

LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)

export default LoginForm
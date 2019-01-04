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
      <form onSubmit={handleSubmit} className='form'>
        <h1 className='title'>Login</h1>
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
    </FormWrapper>
  )
}


LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)


export default LoginForm

import React from "react"
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>
        username:
        <Field name="username" component="input" type="text" /><br/>
        password:
        <Field name="password" component="input" type="password" />
      </label>
      <button type="submit">
        Submit
      </button><br/>
      <Link to="/password-reset">Forgot password?</Link>
    </form>
  )
}


LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)


export default LoginForm

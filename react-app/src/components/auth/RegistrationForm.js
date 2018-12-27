import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

let RegistrationForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <h3>Registration</h3>
      <label>
        username:
        <Field name="username" component="input" type="text" /><br/>
        email:
        <Field name="email" component="input" type="text" /><br/>
        password:
        <Field name="password1" component="input" type="password" /><br/>
        repeat password:
        <Field name="password2" component="input" type="password" /><br/>
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  )
}


RegistrationForm = reduxForm({
  form: 'registrationForm'
})(RegistrationForm)


export default RegistrationForm

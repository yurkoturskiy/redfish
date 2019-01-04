import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormWrapper from '../FormWrapper'

const RegistrationFormWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
`;

const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
`;

let RegistrationForm = props => {
  const { handleSubmit } = props
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h1 className='title'>Registration</h1>
        <label>
          username:<br/>
          <Field name="username" component="input" type="text" /><br/>
          email:<br/>
          <Field name="email" component="input" type="text" /><br/>
          password:<br/>
          <Field name="password1" component="input" type="password" /><br/>
          repeat password:<br/>
          <Field name="password2" component="input" type="password" /><br/>
        </label>
        <button type="submit">
          Submit
        </button>
      </form>
    </FormWrapper>
  )
}


RegistrationForm = reduxForm({
  form: 'registrationForm'
})(RegistrationForm)


export default RegistrationForm

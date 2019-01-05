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
      <form onSubmit={handleSubmit}>
        <h3>Registration</h3>
        <label for="uname">username</label>
        <Field id="uname" name="username" component="input" type="text" />
        <label for="email">email</label>
        <Field id="email" name="email" component="input" type="text" />
        <label for="pass">password</label>
        <Field id="pass" name="password1" component="input" type="password" />
        <label for="rep_pass">repeat password</label>
        <Field id="rep_pass" name="password2" component="input" type="password" />
        <input type="submit" value="Submit"/>
      </form>
    </FormWrapper>
  )
}


RegistrationForm = reduxForm({
  form: 'registrationForm'
})(RegistrationForm)


export default RegistrationForm

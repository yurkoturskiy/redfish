import React from "react"
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'


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
    <RegistrationFormWrapper>
      <form onSubmit={handleSubmit}>
        <Title>Registration</Title>
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
    </RegistrationFormWrapper>
  )
}


RegistrationForm = reduxForm({
  form: 'registrationForm'
})(RegistrationForm)


export default RegistrationForm

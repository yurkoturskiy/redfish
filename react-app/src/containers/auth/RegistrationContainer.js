import React from 'react';
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import zxcvbn from 'zxcvbn'
import FormWrapper from '../../components/FormWrapper'
import { registration, } from '../../actions/restAuth'
import { endpoints } from '../AutoRouterContainer'
import FormikMaterialTextField from '../../components/FormikMaterialTextField'
import Button from '@material/react-button';
import RegistrationForm from '../../components/auth/RegistrationForm'

const theme = {
  background: '#f0f0f0',
}

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.passwordStrengthValidation = this.passwordStrengthValidation.bind(this)
    this.state = {
      requestIsSucced: false,
      passwordStrengthScore: undefined,
    }
  }
  handleSubmit(
    values, { setSubmitting, setErrors, setStatus }
  ) {
    values['password2'] = values.password1
    this.props.registration(values)
      .then(res => {
        if (res.error) {
          if (res.payload.status) {
            // server responded
            console.log(res)
            setErrors(res.payload.response)
            setStatus({non_field_errors: res.payload.response.non_field_errors})
          } else {
            // server is not answered
            setStatus({non_field_errors: 'Something wrong with a server'})
          }
        } else {
          this.setState({requestIsSucced: true})
        }
        setSubmitting(false)
      })
  }
  passwordStrengthValidation(payload) {
    let fieldIsEmpty = payload.target.value.length === 0 ? true : false
    let evaluate = zxcvbn(payload.target.value)
    let helperText = (
      (evaluate.score === 0 && 'too guessable') ||
      (evaluate.score === 1 && 'very guessable') ||
      (evaluate.score === 2 && 'somewhat guessable') ||
      (evaluate.score === 3 && 'safely unguessable') ||
      (evaluate.score === 4 && 'very unguessable')
    )
    this.setState({
      passwordStrengthScore: fieldIsEmpty ? undefined : helperText
    })
  }
  render() {
    if (this.state.requestIsSucced) {
      return <h1>Confirm your email address</h1>
    } else {
      return ( 
        <Formik
          initialValues={{ username: undefined, email: undefined, password1: undefined }}
          onSubmit={this.handleSubmit}
        >
          {({ status, touched, isSubmitting, errors, handleChange }) => (
            <RegistrationForm 
              status={status}
              touched={touched}
              isSubmitting={isSubmitting}
              errors={errors}
              onChange={handleChange}
              passwordOnChange={this.passwordStrengthValidation}
              passwordHelperText={this.state.passwordStrengthScore}
            />
          )}
        </Formik>
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
    registration: (values) => dispatch(registration(values)),
})

export default connect(undefined, mapDispatchToProps)(Registration)
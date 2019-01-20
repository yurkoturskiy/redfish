import React from 'react';
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import FormWrapper from '../../components/FormWrapper'
import { passwordReset, } from '../../actions/restAuth'
import { endpoints } from '../AutoRouterContainer'
import FormikMaterialTextField from '../../components/FormikMaterialTextField'
import Button from '@material/react-button';
import PasswordResetForm from '../../components/auth/PasswordResetForm'


class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      requestIsSucced: false,
    }
  }
  handleSubmit(
    values, { setSubmitting, setErrors, setStatus }
  ) {
    this.props.passwordReset(values)
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
  render() {
    if (this.state.requestIsSucced) {
      return <h3>Check your email</h3>
    } else {
      return (
        <Formik
          initialValues={{ email: undefined }}
          onSubmit={this.handleSubmit}
        >
          {({ status, touched, isSubmitting, errors }) => (
            <PasswordResetForm 
              status={status}
              touched={touched}
              isSubmitting={isSubmitting}
              errors={errors}
            />
          )}
        </Formik>
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
  passwordReset: (email) => dispatch(passwordReset(email)),
})

export default connect(undefined, mapDispatchToProps)(PasswordReset)
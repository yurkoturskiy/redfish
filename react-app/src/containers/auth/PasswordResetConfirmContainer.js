import React from 'react';
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import FormWrapper from '../../components/FormWrapper'
import { passwordResetConfirm, } from '../../actions/restAuth'
import { endpoints } from '../AutoRouterContainer'
import FormikMaterialTextField from '../../components/FormikMaterialTextField'
import Button from '@material/react-button';
import PasswordResetConfirmForm from '../../components/auth/PasswordResetConfirmForm'

const theme = {
  background: '#f0f0f0',
}

class PasswordResetConfirm extends React.Component {
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
    values['uid'] = this.props.match.params.uid
    values['token'] = this.props.match.params.token
    values['new_password2'] = values.new_password1
    this.props.passwordResetConfirm(values)
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
      return <h1>password reset is succeed</h1>
    } else {
      return ( 
        <Formik
          initialValues={{ new_password1: undefined }}
          onSubmit={this.handleSubmit}
        >
          {({ status, touched, isSubmitting, errors }) => (
            <PasswordResetConfirmForm 
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
    passwordResetConfirm: (values) => dispatch(passwordResetConfirm(values)),
})

export default connect(undefined, mapDispatchToProps)(PasswordResetConfirm)
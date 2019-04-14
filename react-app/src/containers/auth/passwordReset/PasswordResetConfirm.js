import React from 'react'
import gql from "graphql-tag"
import { withApollo } from 'react-apollo'
import { Formik } from 'formik'
import PasswordResetConfirmForm from './PasswordResetConfirmForm'

const query = gql`
  query(
    $uid: String!, 
    $token: String!, 
    $new_password1: String!, 
    $new_password2: String!
  ) {
    passwordResetConfirm(input: {
      uid: $uid, 
      token: $token, 
      new_password1: $new_password1, 
      new_password2: $new_password2
    }) @rest(
      type: "PasswordResetConfirm", 
      method: "POST", 
      path: "rest-auth/password/reset/confirm/"
    ) {
      detail
      __typename
    }
  }
`

const theme = {
  background: '#f0f0f0',
}

class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      requestIsSucceed: false,
      successMessage: undefined,
    }
  }
  handleSubmit(
    values, { setSubmitting, setErrors, setStatus }
  ) {
    this.props.client.query({ // graphql query
      query: query,
      variables: { // prepare values
        uid: this.props.match.params.uid,
        token: this.props.match.params.token,
        new_password1: values.new_password1,
        new_password2: values.new_password1,
      }
    })
    .then(res => { // handle success response
      console.log(res)
      this.setState({
        requestIsSucceed: true,
        successMessage: res.data.passwordResetConfirm.detail
      })
      setSubmitting(false)
    })
    .catch(err => { // handle errors
      console.dir(err)
      if (err.networkError.result) { // server responded
        setErrors(err.networkError.result)
        setStatus({non_field_errors: err.networkError.result.non_field_errors})
      } else { // server is not answered
        setStatus({non_field_errors: 'Something wrong with the server'})
      }
      setSubmitting(false)
    })
  }
  render() {
    if (this.state.requestIsSucceed) {
      return <h1>{this.state.successMessage}</h1>
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

export default withApollo(PasswordResetConfirm)
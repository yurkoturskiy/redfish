import React from 'react'
import gql from "graphql-tag"
import { withApollo } from 'react-apollo'
import { Formik } from 'formik'
import PasswordResetForm from './PasswordResetForm'

const query = gql`
  query($email: String!) {
    passwordReset(input: {email: $email}) 
      @rest(type: "PasswordReset", method: "POST", path: "rest-auth/password/reset/") {
      detail
      __typename
    }
  }
`

class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      requestIsSucceed: false,
      successMessage: 'Check your email',
    }
  }
  handleSubmit(
    values, { setSubmitting, setErrors, setStatus }
  ) {
    this.props.client.query({ // graphql query
      query: query,
      variables: { // prepare values
        email: values.email
      }
    })
    .then(res => { // handle success response
      console.log(res)
      this.setState({
        requestIsSucceed: true,
        successMessage: res.data.passwordReset.detail, // Password reset e-mail has been sent.
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

export default withApollo(PasswordReset)
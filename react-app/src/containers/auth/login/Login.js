import React from 'react'
import gql from "graphql-tag"
import { Formik } from 'formik'
import { withApollo } from 'react-apollo'
//presentational components
import LoginForm from './LoginForm'

const theme = {
  background: '#f0f0f0',
}

const query = gql`
  query($username: String!, $password: String!) {
    login(input: {username: $username, password: $password}) 
      @rest(type: "Login", method: "POST", path: "rest-auth/login/") {
      key
      __typename
    }
  }
`

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(
    values, { setSubmitting, setErrors, setStatus }
  ) {
    this.props.client.query({ // graphql query
      query: query,
      variables: { // prepare values
        username: values.username, 
        password: values.password,
      }
    })
    .then(res => { // handle success response
      localStorage.setItem('token', res.data.login.key)
      this.props.client.writeData({ data: { isAuth : true }})
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
    return ( 
      <Formik
        initialValues={{ username: undefined, password: undefined }}
        onSubmit={this.handleSubmit}
      >
        {({ status, touched, isSubmitting, errors }) => (
          <LoginForm 
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

export default withApollo(Login)
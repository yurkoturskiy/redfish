import React from "react";
import gql from "graphql-tag";
import zxcvbn from "zxcvbn";
import { Formik } from "formik";
import { withApollo } from "react-apollo";
import RegistrationForm from "./RegistrationForm";

const query = gql`
  query(
    $username: String!
    $email: String!
    $password1: String!
    $password2: String!
  ) {
    registration(
      input: {
        username: $username
        email: $email
        password1: $password1
        password2: $password2
      }
    )
      @rest(
        type: "Registration"
        method: "POST"
        path: "rest-auth/registration/"
      ) {
      key
      __typename
    }
  }
`;

const theme = {
  background: "#f0f0f0"
};

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordStrengthValidation = this.passwordStrengthValidation.bind(
      this
    );
    this.state = {
      requestIsSucceed: false,
      successMessage: "Confirm your email address",
      passwordStrengthScore: undefined
    };
  }
  handleSubmit(values, { setSubmitting, setErrors, setStatus }) {
    this.props.client
      .query({
        // graphql query
        query: query,
        variables: {
          // prepare values
          username: values.username,
          email: values.email,
          password1: values.password1,
          password2: values.password1
        }
      })
      .then(res => {
        // handle success response
        this.setState({
          requestIsSucceed: true
        });
        setSubmitting(false);
      })
      .catch(err => {
        // handle errors
        console.dir(err);
        if (err.networkError.result) {
          // server responded
          setErrors(err.networkError.result);
          setStatus({
            non_field_errors: err.networkError.result.non_field_errors
          });
        } else {
          // server is not answered
          setStatus({ non_field_errors: "Something wrong with the server" });
        }
        setSubmitting(false);
      });
  }
  passwordStrengthValidation(payload) {
    let fieldIsEmpty = payload.target.value.length === 0 ? true : false;
    let evaluate = zxcvbn(payload.target.value);
    let helperText =
      (evaluate.score === 0 && "too guessable") ||
      (evaluate.score === 1 && "very guessable") ||
      (evaluate.score === 2 && "somewhat guessable") ||
      (evaluate.score === 3 && "safely unguessable") ||
      (evaluate.score === 4 && "very unguessable");
    this.setState({
      passwordStrengthScore: fieldIsEmpty ? undefined : helperText
    });
  }
  render() {
    if (this.state.requestIsSucceed) {
      return <h1>{this.state.successMessage}</h1>;
    } else {
      return (
        <Formik
          initialValues={{
            username: undefined,
            email: undefined,
            password1: undefined
          }}
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
      );
    }
  }
}

export default withApollo(Registration);

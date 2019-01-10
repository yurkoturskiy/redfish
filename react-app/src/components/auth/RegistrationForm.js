import React from "react"
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import FormWrapper from '../FormWrapper'
import FormField from '../FormField'
import MaterialTextField from '../MaterialTextField'
import PasswordValidation from './PasswordValidation'
// actions
import { registration, validate, passValidate } from '../../actions/restAuth'
import { showHidePass } from '../../actions/ui'

const theme = {
  background: '#f0f0f0',
}

class RegistrationForm extends React.Component {
  render() {
    const { 
      error, 
      handleSubmit, 
    } = this.props
    return (
      <FormWrapper theme={theme}>
        <form onSubmit={handleSubmit}>
          <h3>Registration</h3>
          <Field
            id="username"
            name="username" 
            type="text"
            label="Username"
            component={MaterialTextField} 
          />
          <Field 
            id="email"
            name="email" 
            type="email" 
            label="Email"
            component={MaterialTextField}
          />
          <Field 
            id="password"
            name="password1" 
            label="Password"
            type={this.props.showPassState ? 'text' : 'password'}
            helperText={this.props.score}
            tralingIcon={this.props.showPassState ? 'visibility' : 'visibility_off'}
            tralingIconOnClick={this.props.showHidePass}
            component={MaterialTextField}
            onChange={this.props.passValidate}
          />
          <input type="submit" value="Submit" />
          {error && <strong>{error}</strong>}
        </form>
      </FormWrapper>
    )

  }
}

RegistrationForm = reduxForm({
  form: 'registrationForm',
})(RegistrationForm)

const mapStatetoProps = state => {
  return {
    score: state.ui.passwordValidation.score,
    showPassState: state.ui.showPassState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showHidePass: () => dispatch(showHidePass()),
    passValidate: (payload) => dispatch(passValidate(payload)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(RegistrationForm)

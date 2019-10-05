import React from 'react'
import { Form, Field } from 'formik'
import FormikMaterialTextField from '../../styledUIElements/FormikMaterialTextField'
import Button from '@material/react-button'

class PasswordResetForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordVisibilityCondition: false,
    }
    this.switchPasswordVisibility = this.switchPasswordVisibility.bind(this)
  }
  switchPasswordVisibility() {
    this.setState({
      passwordVisibilityCondition: this.state.passwordVisibilityCondition
        ? false
        : true,
    })
  }
  render() {
    const { status, isSubmitting } = this.props
    return (
      <Form>
        <h3>Reset password</h3>
        <Field
          id="email"
          label="Email address"
          name="email"
          type="email"
          component={FormikMaterialTextField}
        />
        <Button
          type="button"
          className="material-button"
          onClick={() => this.props.setRoute('login')}
        >
          go back
        </Button>
        <Button
          unelevated
          type="submit"
          className="material-button"
          solid={true}
          disabled={isSubmitting}
        >
          Reset password
        </Button>

        <span>{status && status.non_field_errors}</span>
      </Form>
    )
  }
}

export default PasswordResetForm

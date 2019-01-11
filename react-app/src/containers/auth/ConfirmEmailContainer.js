import React from 'react'
import { connect } from 'react-redux'
// presentational components
import RegistrationForm from '../../components/auth/RegistrationForm'
// actions
import { confirmEmail } from '../../actions/restAuth'


class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props)
    let values = {
      key: this.props.match.params.key,
    }
    this.props.confirmEmail(values)
  }
  render() {
    return <p>email confirmed</p>
  }
}

const mapStatetoProps = state => ({
  uiFreeze: state.restAuth.uiFreeze,
  numRegsSucceed: state.restAuth.numRegsSucceed,
  // password field
  showPassState: state.ui.showPassState,
  passwordScore: state.ui.passwordValidation.score,
})

const mapDispatchToProps = dispatch => ({
  confirmEmail: (values) => dispatch(confirmEmail(values)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(ConfirmEmail)
import React from 'react'
import { connect } from 'react-redux'
// presentational components
// actions
import { confirmEmail, validate } from '../../actions/restAuth'


class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props)
    let values = {
      key: this.props.match.params.key,
    }
    this.props.confirmEmail(values)
      .then(res => console.log(res))
  }
  render() {
    console.log('confirm email')
    if (this.props.requestCondition === 1 || this.props.requestCondition === 0) {
      return <p>confirming</p>
    } else if (this.props.requestCondition === 2) {
      return <p>confirmed</p>
    } else if (this.props.requestCondition === -1) {
      return <p>Something went wrong</p>
    }
  }
}

const mapStatetoProps = state => ({
  // password field
  requestCondition: state.requestCondition.CONFIRM_EMAIL,
})

const mapDispatchToProps = dispatch => ({
  confirmEmail: (values) => dispatch(confirmEmail(values)),
  validate: (res) => dispatch(validate(res)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(ConfirmEmail)
import React from 'react'
import { connect } from 'react-redux'
// presentational components
// actions
import {
  verifyEmail, 
  validate 
} from '../../actions/restAuth'


class VerifyEmail extends React.Component {
  constructor(props) {
    super(props)
    let values = {
      key: this.props.match.params.key,
    }
    this.props.verifyEmail(values)
      .then(res => console.log(res))
  }
  render() {
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
  requestCondition: state.requestCondition.verifyEmail,
})

const mapDispatchToProps = dispatch => ({
  verifyEmail: (values) => dispatch(verifyEmail(values)),
  validate: (res) => dispatch(validate(res)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(VerifyEmail)
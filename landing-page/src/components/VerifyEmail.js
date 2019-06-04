import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
// presentational components

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props)
    let values = {
      key: this.props.match.params.key,
    }
    this.props.verifyEmail(values).then(res => console.log(res))
  }
  componentDidMount() {
    axios({})
  }
  render() {
    if (
      this.props.requestCondition === 1 ||
      this.props.requestCondition === 0
    ) {
      return <p>confirming</p>
    } else if (this.props.requestCondition === 2) {
      return <p>confirmed</p>
    } else if (this.props.requestCondition === -1) {
      return <p>Something went wrong</p>
    }
  }
}

export default VerifyEmail

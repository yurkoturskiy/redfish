import React from 'react'

class EmailConfirmStatus extends React.Component {
  render() {
    if (this.props.match.params.status === 'ok') {
      return <h1>Email confirmed</h1>
    } else {
      return <h1>Failed. It looks like your email confirmation link is wrong</h1>
    }
  }
}

export default EmailConfirmStatus
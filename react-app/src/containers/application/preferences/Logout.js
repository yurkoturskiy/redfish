import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'

const logoutQuery = gql`
  query {
    logout(input: {}) @rest(type: "Logout", method: "POST", path: "rest-auth/logout/") {
      __typename
    }
  }
`

function Logout(props) {
  const logout = () => {
    props.client.query({query: logoutQuery})
    localStorage.removeItem('token')
    props.client.writeData({ data: { isAuth: false } })
    props.history.push('/login')
    console.log('logout')
    props.handleMenuClick()
  }
  return (
    <div onClick={logout}>
      Logout
    </div>
  )
}

Logout.propTypes = {
  handleMenuClick: PropTypes.func,
}

export default withApollo(withRouter(Logout))
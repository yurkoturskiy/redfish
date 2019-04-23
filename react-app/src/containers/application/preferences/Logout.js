import React from 'react'
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
  }
  return (
    <div onClick={logout}>
      Logout
    </div>
  )
}

export default withApollo(withRouter(Logout))
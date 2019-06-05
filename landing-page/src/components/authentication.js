import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const query = gql`
  query {
    tokenIsValid
  }
`

function Authentication(props) {
  const { loading, data } = useQuery(query)
  useEffect(() => {
    if (data.tokenIsValid) window.location.replace(process.env.REDFISH_APP_URL)
    else localStorage.removeItem('token')
  })
  if (loading) return <div>loading...</div>
  if (data.tokenIsValid) return null
  return <React.Fragment>{props.children}</React.Fragment>
}

export default Authentication

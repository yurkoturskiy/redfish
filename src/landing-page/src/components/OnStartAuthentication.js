import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const query = gql`
  query tokenIsValid($key: String!) {
    tokenIsValid(key: $key)
  }
`

function OnStartAuthentication(props) {
  const [key] = useState(localStorage.getItem('token'))
  const { loading, data } = useQuery(query, {
    variables: { key: key ? key : '' },
  })
  useEffect(() => {
    if (data.tokenIsValid) window.location.replace(process.env.APP_URL)
    else localStorage.removeItem('token')
  })
  if (loading) return null
  if (data.tokenIsValid) return null
  return <React.Fragment>{props.children}</React.Fragment>
}

export default OnStartAuthentication

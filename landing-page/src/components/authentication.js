import React, { useEffect, useState } from 'react'

function Authentication(props) {
  const [key, setKey] = useState(localStorage.getItem('token'))
  const [notAuthenticated, setNotAuthenticated] = useState(false)
  if (key) {
    useEffect(() => {
      if (key) window.location.replace('http://localhost:3006/')
      if (!key) setNotAuthenticated(true)
    }, [])
  }
  if (notAuthenticated) {
    return <React.Fragment>{props.children}</React.Fragment>
  }
  return null
}

export default Authentication

import React, { useState } from 'react'
import { Redirect } from '@reach/router'

function Navigator(props) {
  const [lastAuthAction] = useState(localStorage.getItem('lastAuthAction'))
  var url
  if (
    !lastAuthAction ||
    lastAuthAction === 'facebook' ||
    lastAuthAction === 'github'
  )
    url = '/authentication'
  else if (lastAuthAction === 'login') url = '/authentication/login'
  else if (lastAuthAction === 'signup') url = '/authentication/signup'

  return <Redirect to={url} noThrow />
}

export default Navigator

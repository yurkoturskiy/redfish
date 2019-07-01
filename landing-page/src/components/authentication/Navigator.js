import React, { useState } from 'react'
import { navigate } from 'gatsby'

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
  navigate(url, { replace: true })

  return null
}

export default Navigator

import React, { useState } from 'react'
import { navigate } from '@reach/router'

function Navigator(props) {
  const [lastAuthAction] = useState(localStorage.getItem('lastAuthAction'))
  !lastAuthAction && navigate('/authentication')
  lastAuthAction === 'facebook' && navigate('/authentication')
  lastAuthAction === 'github' && navigate('/authentication')
  lastAuthAction === 'login' && navigate('/authentication/login')
  lastAuthAction === 'signup' && navigate('/authentication/signup')

  return null
}

export default Navigator

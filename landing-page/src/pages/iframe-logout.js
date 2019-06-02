import React, { useEffect } from 'react'

function LandingLogout(props) {
  useEffect(() => {
    window.parent.postMessage('mounted', 'http://localhost:3006/')
    window.addEventListener('message', logoutRequestListener, false)
    return () =>
      window.removeEventListener('message', logoutRequestListener, false)
  }, [])
  const logoutRequestListener = e => {
    console.log(e)
    if (e.data === 'logout') {
      console.log('logout request')
      localStorage.removeItem('token')
      window.parent.postMessage('succeed', 'http://localhost:3006/')
    }
  }
  return <div>Landing's iframe for deleting key from it's localStorage</div>
}

export default LandingLogout

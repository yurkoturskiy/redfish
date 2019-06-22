import React, { useState, useEffect } from 'react'

function KeyToApp(props) {
  useEffect(() => {
    const key = localStorage.getItem('token')
    window.parent.postMessage(
      JSON.stringify({ key }),
      process.env.REDFISH_APP_URL
    )
  }, [])
  return <div>Landing's iframe for retrieving key from it's localStorage</div>
}

export default KeyToApp

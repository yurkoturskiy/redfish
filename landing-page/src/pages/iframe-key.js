import React, { useState, useEffect } from 'react'

function KeyToApp(props) {
  useEffect(() => {
    const key = localStorage.getItem('token')
    window.parent.postMessage(JSON.stringify({ key }), 'http://localhost:3006/')
  }, [])
  return <div>Landing's iframe for retrieving key from it's localStorage</div>
}

export default KeyToApp

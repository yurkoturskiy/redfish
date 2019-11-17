import React, { useState, useEffect } from 'react'

function useBrowser() {
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return isBrowser
}

export default useBrowser

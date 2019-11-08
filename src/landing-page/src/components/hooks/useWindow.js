import React, { useState, useEffect } from 'react'

function useWindow() {
  const [windowWidth, setWindowWidth] = useState(1)
  const [windowHeight, setWindowHeight] = useState(1)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  })

  return [windowWidth, windowHeight]
}

export default useWindow

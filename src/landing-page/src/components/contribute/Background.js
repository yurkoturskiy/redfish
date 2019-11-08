import React, { useEffect, useState } from 'react'
import { morphing, path } from 'primitivo-svg'
import useWindow from '../hooks/useWindow'

function Background() {
  const [windowWidth, windowHeight] = useWindow()
  const [pathDescription, setPathDescription] = useState()

  useEffect(() => {
    const pathParams = {
      numOfSegments: 4,
      depth: 0,
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      centerX: 100,
      centerY: 100,
      rotate: 0,
      numOfGroups: 2,
      groups: [
        {
          type: 'radial',
          distance: 1,
          round: 0,
          incircle: true,
        },
        {
          type: 'radial',
          distance: 1,
          round: 0,
          incircle: true,
        },
      ],
    }
    setPathDescription(path(pathParams).d)
  })

  return (
    <svg width={windowWidth} height={windowHeight}>
      <path fill="red" d={pathDescription} />
    </svg>
  )
}

export default Background

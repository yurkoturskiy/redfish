import React, { useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { path, randomRange } from 'primitivo-svg'
// Hooks
import useBrowser from '../hooks/useBrowser'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const colors = ['#4D8BFF', '#FF5971', '#3CC76F']

function Particle({ sceneHeight, sceneWidth }) {
  const [pathDescription, setPathDescription] = useState()
  const [color, setColor] = useState()

  const getPathParams = () => {
    let maxSide = Math.max(window.innerWidth, window.innerHeight)
    let maxSize = maxSide / 20
    let x = randomRange(maxSize, sceneWidth - maxSize)
    let y = randomRange(maxSize, sceneHeight)
    let width = randomRange(20, maxSize)
    let height = randomRange(20, maxSize)
    return {
      numOfSegments: 3,
      depth: 0,
      x,
      y,
      width,
      height,
      centerX: width / 2,
      centerY: height / 2,
      rotate: randomRange(0, 180),
      numOfGroups: 1,
      groups: [
        {
          type: 'radial',
          distance: [0.1, 1],
          round: 0,
        },
      ],
    }
  }

  useEffect(() => {
    const params = getPathParams()
    setPathDescription(path(params).d)
    setColor(colors[getRandomInt(3)])
  }, [])
  return (
    <path
      d={pathDescription}
      fill="transparent"
      vectorEffect="non-scaling-stroke"
      strokeWidth="4px"
      stroke={color}
      opacity=".8"
      // filter="url(#particles-blur)"
    />
  )
}

export default Particle

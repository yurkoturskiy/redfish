import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { path, randomRange } from 'primitivo-svg'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const colors = ['#3688ff', '#ff546c', '#22d163']

function Particle() {
  const getPathParams = () => {
    let maxSide =
      window.innerWidth >= window.innerHeight
        ? window.innerWidth
        : window.innerHeight
    let maxSize = maxSide / 20
    let x = randomRange(0, window.innerWidth)
    let y = randomRange(maxSize, window.innerHeight)
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

  const params = useMemo(() => getPathParams(), [])
  const pathDescription = useMemo(() => path(params).d, [])
  const pathStrokeWidth = useMemo(() => randomRange(1, 4), [])
  const pathBlurRate = useMemo(() => randomRange(0.2, 0.8), [])
  const pathFillColorIndex = useMemo(() => getRandomInt(3), [])
  return (
    <path
      d={pathDescription}
      fill="transparent"
      strokeWidth="4px"
      stroke={colors[pathFillColorIndex]}
      opacity=".8"
      // filter="url(#particles-blur)"
    />
  )
}

export default Particle

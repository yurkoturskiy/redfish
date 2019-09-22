import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { path, randomRange } from 'primitivo-svg'

const getPathParams = () => {
  let x = randomRange(0, window.innerWidth)
  let y = randomRange(0, window.innerHeight)
  let width = randomRange(50, 100)
  let height = randomRange(50, 100)
  return {
    numOfSegments: 3,
    depth: 0,
    x,
    y,
    width,
    height,
    centerX: width / 2,
    centerY: height / 2,
    rotate: randomRange(0, 45),
    numOfGroups: 1,
    groups: [
      {
        type: 'radial',
        distance: [0.1, 1],
        round: 0,
      },
      {
        type: 'radial',
        distance: [0.3, 1],
        round: 1,
      },
    ],
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const colors = ['#3688ff', '#ff546c', '#22d163']

function Particle({ x, y, width, height }) {
  const params = useMemo(() => getPathParams(), [])
  const pathDescription = useMemo(() => path(params).d, [params])
  console.log(pathDescription)
  const pathStrokeWidth = useMemo(() => randomRange(1, 4), [x, y])
  const pathBlurRate = useMemo(() => randomRange(0.2, 0.8), [x, y])
  const pathFillColorIndex = useMemo(() => getRandomInt(3), [])
  return (
    <path
      d={pathDescription}
      fill={colors[pathFillColorIndex]}
      opacity=".8"
      filter="url(#blurMe)"
    />
  )
}

export default Particle

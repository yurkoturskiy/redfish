import React from 'react'
import { morphing, path } from 'primitivo-svg'

var morphingParams = {
  numOfKeyPaths: 5,
  loop: true,
}

var pathsParams = {
  numOfSegments: 4,
  depth: 0,
  x: -100,
  y: 0,
  width: 1920,
  height: 1080,
  centerX: 960,
  centerY: 540,
  rotate: 0,
  numOfGroups: 2,
  incircle: true,
  groups: [
    {
      type: 'radial',
      distance: [0.8, 1],
      round: 1,
      lengthBasedRound: true,
    },
    {
      type: 'radial',
      distance: [0.8, 1],
      round: 1,
      lengthBasedRound: false,
    },
    {
      type: 'radial',
      distance: [0.8, 1],
      round: 1,
      lengthBasedRound: false,
    },
  ],
}

const one = morphing(morphingParams, pathsParams)
const two = morphing(morphingParams, pathsParams)

const pathObj = path()
console.log('background path', pathObj)

function Background() {
  return (
    <svg className="background">
      <path stroke="black" strokeWidth="1" fill="white" fill-opacity="0">
        <animate
          attributeName="d"
          repeatCount="indefinite"
          dur="10s"
          values={one.dValues}
        />
      </path>
      <path stroke="black" strokeWidth="1" fill="white" fill-opacity="0">
        <animate
          attributeName="d"
          repeatCount="indefinite"
          dur="10s"
          values={two.dValues}
        />
      </path>
    </svg>
  )
}

export default Background

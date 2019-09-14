import React from 'react'
import { morphing, path } from 'primitivo-svg'

var morphingParams = {
  numOfKeyPaths: 2,
  loop: true,
}

let x = 0
let y = 0
let width = 640
let height = 480
let centerX = width / 2
let centerY = height / 2
let pathsParams = {
  numOfSegments: 3,
  depth: 0,
  x,
  y,
  width,
  height,
  centerX,
  centerY,
  rotate: 0,
  numOfGroups: 3,
  groups: [
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: [0.6, 1],
      lengthBasedRound: true,
    },
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: [0.6, 1],
      lengthBasedRound: false,
    },
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: [0.6, 1],
      lengthBasedRound: false,
    },
  ],
}

var glarePathParams = {
  numOfSegments: 3,
  depth: 0,
  x: 100,
  y: 120,
  width: 50,
  height: 50,
  centerX: 25,
  centerY: 25,
  rotate: 180,
  numOfGroups: 2,
  groups: [
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: [0.6, 1],
    },
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: [0.7, 1],
    },
  ],
}
const blob = path(glarePathParams)
const { dValues } = morphing(morphingParams, pathsParams)

function ReactDepEffect(props) {
  return (
    <svg width="660" height="500" id="react-dep-ring">
      <path stroke="#1D79FF" strokeWidth="10" fillOpacity="0">
        <animate
          attributeName="d"
          repeatCount="indefinite"
          dur="60s"
          values={dValues}
        />
      </path>
      <path d={blob.d} fill="red" />
    </svg>
  )
}

export default ReactDepEffect

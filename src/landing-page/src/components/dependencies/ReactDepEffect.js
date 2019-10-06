import React from 'react'
import { path } from 'primitivo-svg'

let x = 0
let y = 0
let width = 128
let height = 128
let centerX = width / 2
let centerY = height / 2

var shapePathParams = {
  numOfSegments: 4,
  depth: 0,
  x,
  y,
  width,
  height,
  centerX,
  centerY,
  rotate: 25,
  numOfGroups: 1,
  groups: [
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: 0,
      lengthBasedRound: true,
    },
  ],
}
const blob = path(shapePathParams)

function ReactDepEffect(props) {
  return (
    <svg width="148" height="148" id="react-dep-ring">
      <path d={blob.d} stroke="#1D79FF" strokeWidth="10" fillOpacity="0" />
    </svg>
  )
}

export default ReactDepEffect

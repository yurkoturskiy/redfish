import React from 'react'
import { morphing, path } from 'primitivo-svg'

const pathOneParams = {
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

const pathOne = path(pathOneParams).d
console.log(pathOne)

const colors = [
  '#3688ff',
  '#ff546c',
  '#22d163',
  '#3688ff',
  '#ff546c',
  '#22d163',
]

function Background() {
  return (
    <svg width={window.innerWidth} height={window.innerHeight}>
      <path fill="red" d={pathOne} />
    </svg>
  )
}

export default Background

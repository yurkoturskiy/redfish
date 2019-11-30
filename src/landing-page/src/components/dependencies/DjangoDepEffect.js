import React from 'react'
import { path } from 'primitivo-svg'

let x = 0
let y = 0
let width = 128
let height = 128
let centerX = width / 2
let centerY = height / 2

var shapePathParams = {
  numOfSegments: 3,
  depth: 0,
  x,
  y,
  width,
  height,
  centerX,
  centerY,
  rotate: 0,
  groups: [
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: 0,
    },
  ],
}
const blob = path(shapePathParams)

function DjangoDepEffect(props) {
  return (
    <svg width="148" height="148" id="django-dep-ring">
      <path d={blob.d} stroke="#3CC76F" strokeWidth="10" fill="transparent" />
    </svg>
  )
}

export default DjangoDepEffect

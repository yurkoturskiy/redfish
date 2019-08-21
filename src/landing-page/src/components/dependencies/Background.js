import React from 'react'
import { morphing, path } from 'primitivo-svg'

// var morphingParams = {
//   numOfKeyPaths: 5,
//   loop: true,
// }

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

const paths = () => {
  var morphingParams = {
    numOfKeyPaths: 3,
    loop: true,
  }
  var set = []
  for (let i = 0; i < 10; i++) {
    let x = -100 + i * 45
    let y = -200 + i * 40
    let width = 1920 - i * (1920 / 10)
    let height = 1920 - i * (1920 / 10)
    let centerX = width / 2
    let centerY = height / 2
    let pathsParams = {
      numOfSegments: 4,
      depth: 0,
      x,
      y,
      width,
      height,
      centerX,
      centerY,
      rotate: 0,
      numOfGroups: 3,
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
    set[i] = morphing(morphingParams, pathsParams).dValues
  }
  return set
}

var a = paths()
var pathsSVG = a.map((path, index) => {
  return (
    <path
      stroke={index === a.length - 1 ? '#1D79FF' : '#1D79FF'}
      strokeWidth="1"
      fill="#1D79FF"
      fillOpacity={index === a.length - 1 ? '1' : '0'}
    >
      <animate
        attributeName="d"
        repeatCount="indefinite"
        dur="120s"
        values={path}
      />
    </path>
  )
})

function Background() {
  return <svg className="background">{pathsSVG}</svg>
}

export default Background

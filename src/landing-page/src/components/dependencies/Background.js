import React from 'react'
import { morphing, path } from 'primitivo-svg'

const paths = () => {
  var morphingParams = {
    numOfKeyPaths: 3,
    loop: true,
  }
  var set = []
  for (let i = 0; i < 10; i++) {
    let x = i * 55
    let y = i * 40
    let width = 1920 - i * (1920 / 10)
    let height = 1440 - i * (1440 / 10)
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
    set[i] = morphing(morphingParams, pathsParams).dValues
  }
  return set
}

var a = paths()
var pathsSVG = a.map((path, index) => {
  return (
    <path
      key={`bg-svg-path-${index}`}
      stroke={index === a.length - 1 ? '#1D79FF' : 'black'}
      strokeWidth="1"
      fill="#1D79FF"
      fillOpacity={index === a.length - 1 ? '0' : '0'}
    >
      <animate
        attributeName="d"
        repeatCount="indefinite"
        dur="60s"
        values={path}
      />
    </path>
  )
})

function Background() {
  return (
    <svg
      viewBox="0 0 1920 1440"
      preserveAspectRatio="xMidYMid slice"
      className="background"
    >
      {pathsSVG}
    </svg>
  )
}

export default Background

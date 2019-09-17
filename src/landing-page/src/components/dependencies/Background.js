import React from 'react'
import { morphing, path } from 'primitivo-svg'

const paths = () => {
  var morphingParams = {
    numOfKeyPaths: 2,
    loop: true,
  }
  var set = []
  for (let i = 0; i < 4; i++) {
    let x = i * 100
    let y = i * 50
    let width = 1920 - i * (1920 / 9)
    let height = 1280 - i * (1280 / 9)
    let centerX = width / 2 + i * 100
    let centerY = height / 2 + i * 100
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
    set[i] = morphing(morphingParams, pathsParams).dValues
  }
  return set
}

var a = paths()
var pathsSVG = a.map((path, index) => {
  return (
    <path
      key={`bg-svg-path-${index}`}
      stroke="#344239"
      strokeWidth="4"
      fillOpacity="0"
    >
      <animate
        attributeName="d"
        repeatCount="indefinite"
        calcMode="spline"
        keyTimes="0; 0.5; 1"
        keySplines=".25, 0, .75, 1; .25, 0, .75, 1;"
        dur="36s"
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

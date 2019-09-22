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

// var a = paths()
// var pathsSVG = a.map((path, index) => {
//   return (
//     <path
//       className="dependencies-circles"
//       key={`bg-svg-path-${index}`}
//       stroke={colors[index]}
//       strokeWidth="12"
//       fill="transparent"
//     >
//       <animate
//         attributeName="d"
//         repeatCount="indefinite"
//         calcMode="spline"
//         keyTimes="0; 0.5; 1"
//         keySplines=".25, 0, .75, 1; .25, 0, .75, 1;"
//         dur="36s"
//         values={path}
//       />
//     </path>
//   )
// })

function Background() {
  return (
    <svg width={window.innerWidth} height={window.innerHeight}>
      <path fill="red" d={pathOne} />
    </svg>
  )
}

export default Background

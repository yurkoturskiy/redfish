import React from 'react'
import { animateLayer } from 'svg-curveto'

var animateParameters = {
  numOfKeyPaths: 10,
  loop: true,
}

var pathsParameters = {
  numOfSegments: 3,
  depth: 0,
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  centerX: 100,
  centerY: 100,
  rotate: 0,
  numOfGroups: 2,
  incircle: true,
  groups: [
    {
      type: 'radial',
      distance: [0.6, 1],
      round: [0.4, 1],
    },
    {
      type: 'radial',
      distance: [0.6, 1],
      round: [0.7, 1],
    },
    {
      type: 'radial',
      distance: [0.6, 1],
      round: [0.7, 1],
    },
  ],
}

function Blobs(props) {
  const animateValue = animateLayer(animateParameters, pathsParameters)
  console.log(animateValue)
  return (
    <div id="graphql-blob">
      <h2>GraphQL</h2>
      <svg width="200px" height="200px" viewBox="0 0 200 200">
        <path>
          <animate
            attributeName="d"
            dur="200000ms"
            repeatCount="indefinite"
            values={animateValue}
          />
        </path>
      </svg>
    </div>
  )
}

export default Blobs

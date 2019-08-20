import React from 'react'
import { morphing } from 'primitivo-svg'

var animateParameters = {
  numOfKeyPaths: 20,
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
      round: [0.6, 1],
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
  const djangoBlob = morphing(animateParameters, pathsParameters)
  console.log('django blob', djangoBlob)
  const graphqlBlob = morphing(animateParameters, pathsParameters)
  const reactBlob = morphing(animateParameters, pathsParameters)
  return (
    <div id="blobs">
      <div id="django-blob">
        <h2>Django</h2>
        <svg width="200px" height="200px" viewBox="0 0 200 200">
          <path>
            <animate
              attributeName="d"
              dur="200000ms"
              repeatCount="indefinite"
              values={djangoBlob.dValues}
            />
          </path>
        </svg>
      </div>
      <div id="graphql-blob">
        <h2>GraphQL</h2>
        <svg width="200px" height="200px" viewBox="0 0 200 200">
          <path>
            <animate
              attributeName="d"
              dur="200000ms"
              repeatCount="indefinite"
              values={graphqlBlob.dValues}
            />
          </path>
        </svg>
      </div>
      <div id="react-blob">
        <h2>ReactJS</h2>
        <svg width="200px" height="200px" viewBox="0 0 200 200">
          <path>
            <animate
              attributeName="d"
              dur="200000ms"
              repeatCount="indefinite"
              values={reactBlob.dValues}
            />
          </path>
        </svg>
      </div>
    </div>
  )
}

export default Blobs

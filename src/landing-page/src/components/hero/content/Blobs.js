import React, { useMemo } from 'react'
import { morphing, path } from 'primitivo-svg'

var animateParameters = {
  numOfKeyPaths: 3,
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
    {
      type: 'radial',
      incircle: true,
      distance: [0.8, 1],
      round: [0.7, 1],
    },
  ],
}

var glarePathParams = {
  numOfSegments: 3,
  depth: 0,
  x: 50,
  y: 50,
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

function Blobs(props) {
  const djangoBlob = useMemo(
    () => morphing(animateParameters, pathsParameters),
    [animateParameters, pathsParameters]
  )
  const djangoGlare = useMemo(() => path(glarePathParams), [glarePathParams])
  const graphqlBlob = useMemo(
    () => morphing(animateParameters, pathsParameters),
    [animateParameters, pathsParameters]
  )
  const graphqlGlare = useMemo(() => path(glarePathParams), [glarePathParams])
  const reactBlob = useMemo(
    () => morphing(animateParameters, pathsParameters),
    [animateParameters, pathsParameters]
  )
  const reactGlare = useMemo(() => path(glarePathParams), [glarePathParams])
  return (
    <div id="blobs">
      <div id="django-blob">
        <svg width="200px" height="200px" viewBox="0 0 200 200">
          <path className="blob">
            <animate
              attributeName="d"
              dur="38000ms"
              repeatCount="indefinite"
              values={djangoBlob.dValues}
              calcMode="spline"
              keyTimes="0; 0.25; 0.5; 0.75; 1"
              keySplines=".25,0,.75,1;.25,0,.75,1;.25,0,.75,1;.25,0,.75,1"
            />
          </path>
          <path id="django-glare" className="glare" d={djangoGlare.d} />
          <text rotate="180">
            <textPath startOffset="85" href="#django-glare">
              ognajD
            </textPath>
          </text>
        </svg>
      </div>
      <div id="graphql-blob">
        <svg width="200px" height="200px" viewBox="0 0 200 200">
          <path className="blob">
            <animate
              attributeName="d"
              dur="40000ms"
              repeatCount="indefinite"
              values={graphqlBlob.dValues}
              calcMode="spline"
              keyTimes="0; 0.25; 0.5; 0.75; 1"
              keySplines=".25,0,.75,1;.25,0,.75,1;.25,0,.75,1;.25,0,.75,1"
            />
          </path>
          <path id="graphql-glare" className="glare" d={graphqlGlare.d} />
          <text rotate="180">
            <textPath startOffset="75" href="#graphql-glare">
              LQhparG
            </textPath>
          </text>
        </svg>
      </div>
      <div id="react-blob">
        <svg width="200px" height="200px" viewBox="0 0 200 200">
          <path id="react-blob-path" className="blob">
            <animate
              attributeName="d"
              dur="42000ms"
              repeatCount="indefinite"
              values={reactBlob.dValues}
              calcMode="spline"
              keyTimes="0; 0.25; 0.5; 0.75; 1"
              keySplines=".25,0,.75,1;.25,0,.75,1;.25,0,.75,1;.25,0,.75,1"
            />
          </path>
          <path className="glare" id="react-glare" d={reactGlare.d} />
          <text>
            <textPath startOffset="20" href="#react-glare">
              ReactJS
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  )
}

export default Blobs

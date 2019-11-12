import React, { useMemo } from 'react'
import { morphing, path } from 'primitivo-svg'

var animateParameters = {
  numOfKeyPaths: 3,
  loop: 'linear',
}

const pathsParameters = (x, y, width, height) => ({
  numOfSegments: 3,
  depth: 0,
  x,
  y,
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
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
})

var glarePathParams = (x, y, width, height) => ({
  numOfSegments: 3,
  depth: 0,
  x,
  y,
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
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
})

const djangoBlobPathParams = pathsParameters(20, 220, 180, 180)
const djangoGlarePathParams = glarePathParams(70, 250, 46, 46)

const graphqlBlobPathParams = pathsParameters(120, 130, 300, 300)
const graphqlGlarePathParams = glarePathParams(190, 220, 60, 60)

const reactBlobPathParams = pathsParameters(150, 40, 200, 200)
const reactGlarePathParams = glarePathParams(210, 90, 45, 45)

function Blobs(props) {
  // django

  const djangoBlob = useMemo(
    () => morphing(animateParameters, djangoBlobPathParams),
    [animateParameters, djangoBlobPathParams]
  )

  const djangoGlare = useMemo(() => path(djangoGlarePathParams), [
    djangoGlarePathParams,
  ])

  // graphql

  const graphqlBlob = useMemo(
    () => morphing(animateParameters, graphqlBlobPathParams),
    [animateParameters, graphqlBlobPathParams]
  )

  const graphqlGlare = useMemo(() => path(graphqlGlarePathParams), [
    graphqlGlarePathParams,
  ])

  // reactjs

  const reactBlob = useMemo(
    () => morphing(animateParameters, reactBlobPathParams),
    [animateParameters, reactBlobPathParams]
  )

  const reactGlare = useMemo(() => path(reactGlarePathParams), [
    reactGlarePathParams,
  ])

  return (
    <svg
      id="blobs-svg"
      viewBox="0 0 420 420"
      preserveAspectRatio="xMaxYMid meet"
    >
      <path id="django-blob">
        <animate
          attributeName="d"
          dur="19000ms"
          repeatCount="indefinite"
          values={djangoBlob.dValues}
          calcMode="spline"
          keyTimes="0; 0.25; 0.5; 0.75; 1"
          keySplines=".25,0,.75,1;.25,0,.75,1;.25,0,.75,1;.25,0,.75,1"
        />
      </path>
      <path id="django-glare" d={djangoGlare.d} />
      <text id="django-text">
        <textPath
          startOffset="0"
          href="#django-glare"
          xlinkHref="#django-glare"
        >
          Django
        </textPath>
      </text>
      <path id="graphql-blob">
        <animate
          attributeName="d"
          dur="20000ms"
          repeatCount="indefinite"
          values={graphqlBlob.dValues}
          calcMode="spline"
          keyTimes="0; 0.25; 0.5; 0.75; 1"
          keySplines=".25,0,.75,1;.25,0,.75,1;.25,0,.75,1;.25,0,.75,1"
        />
      </path>
      <path id="graphql-glare" d={graphqlGlare.d} />
      <text id="graphql-text">
        <textPath
          startOffset="40"
          href="#graphql-glare"
          xlinkHref="#graphql-glare"
        >
          GraphQL
        </textPath>
      </text>
      <path id="react-blob">
        <animate
          attributeName="d"
          dur="21000ms"
          repeatCount="indefinite"
          values={reactBlob.dValues}
          calcMode="spline"
          keyTimes="0; 0.25; 0.5; 0.75; 1"
          keySplines=".25,0,.75,1;.25,0,.75,1;.25,0,.75,1;.25,0,.75,1"
        />
      </path>
      <path id="react-glare" d={reactGlare.d} />
      <text id="reactjs-text">
        <textPath startOffset="10" href="#react-glare" xlinkHref="#react-glare">
          ReactJS
        </textPath>
      </text>
    </svg>
  )
}

export default Blobs

import React, { useMemo } from 'react'
import { path, morphing, randomRange } from 'primitivo-svg'

const width = window.innerWidth
const height = window.innerHeight

const animParams = {
  numOfKeyPaths: 3,
  loop: true,
}

const pathParam = {
  numOfSegments: 3,
  depth: 0,
  x: width / 2 - 375,
  y: height / 2 - 400,
  width: 750,
  height: 750,
  centerX: 375,
  centerY: 375,
  rotate: 0,
  numOfGroups: 2,
  groups: [
    {
      type: 'radial',
      incircle: true,
      distance: [0.6, 1],
      round: 1,
    },
    {
      type: 'radial',
      incircle: true,
      distance: [0.7, 1],
      round: 1,
    },
    {
      type: 'radial',
      incircle: true,
      distance: [0.6, 1],
      round: 1,
    },
  ],
}

const getPath = () => path(pathParam).d

function Background() {
  const one = useMemo(() => morphing(animParams, pathParam), [
    animParams,
    pathParam,
  ])
  console.log('one', one)
  const two = useMemo(() => morphing(animParams, pathParam), [
    animParams,
    pathParam,
  ])
  const three = useMemo(() => morphing(animParams, pathParam), [
    animParams,
    pathParam,
  ])
  return (
    <div className="background">
      <svg width={window.innerWidth} height={window.innerHeight}>
        <path id="auth-blob-one">
          <animate
            attributeName="d"
            calcMode="spline"
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            keySplines=".25,0, 0.75, 1; .25,0, 0.75, 1; .25,0, 0.75, 1; .25,0, 0.75, 1;"
            repeatCount="indefinite"
            dur="24s"
            values={one.dValues}
          />
        </path>
        <path id="auth-blob-two">
          <animate
            attributeName="d"
            calcMode="spline"
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            keySplines=".25,0, 0.75, 1; .25,0, 0.75, 1; .25,0, 0.75, 1; .25,0, 0.75, 1;"
            repeatCount="indefinite"
            dur="26s"
            values={two.dValues}
          />
        </path>
        <path id="auth-blob-three">
          <animate
            attributeName="d"
            calcMode="spline"
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            keySplines=".25,0, 0.75, 1; .25,0, 0.75, 1; .25,0, 0.75, 1; .25,0, 0.75, 1;"
            repeatCount="indefinite"
            dur="28s"
            values={three.dValues}
          />
        </path>
      </svg>
    </div>
  )
}

export default Background

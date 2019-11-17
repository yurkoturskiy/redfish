import React, { useState, useEffect, useMemo } from 'react'
import { morphing } from 'primitivo-svg'

function BlobbyCloud(props) {
  const [width, setWidth] = useState(128)
  const [height, setHeight] = useState(128)
  const [pathsVisibility, setPathVisibility] = useState([])

  const durPerPath = props.duration / (props.numOfKeyPaths * 2 - 1)
  const numOfColors = props.colors.length
  const animateColorDuration = props.duration
  // const animateColorDuration =
  //   numOfColors * durPerPath - props.shiftStep * props.numOfShapes + 'ms'

  useEffect(() => {
    setPathVisibility(pathsVisibility => {
      var proto = []
      for (let i = 0; i < props.numOfShapes; i++) {
        proto[i] = setTimeout(() => true, props.shiftStep * i)
      }
      return proto
    })
  }, [])

  const loop = 'circle'
  const morphParams = {
    numOfKeyPaths: props.numOfKeyPaths,
    loop,
  }
  var keySplines = []
  var keyTimes = []
  var numOfKeyTimes
  switch (loop) {
    case 'circle':
      numOfKeyTimes = morphParams.numOfKeyPaths
      break
    case 'linear':
      numOfKeyTimes = morphParams.numOfKeyPaths * 2 - 2
      break
    default:
      numOfKeyTimes = morphParams.numOfKeyPaths - 1
  }

  var keyTimesFactor = 1 / numOfKeyTimes
  for (let i = 0; i <= numOfKeyTimes; i++) {
    keyTimes[i] = i * keyTimesFactor
  }
  for (let i = 0; i < numOfKeyTimes; i++) {
    keySplines[i] = '0.5 0 0.5 1'
  }
  keySplines = keySplines.join(';')
  keyTimes = keyTimes.join(';')

  const pathParams = {
    numOfSegments: props.numOfPathSegments,
    depth: 0,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    centerX: width / 2,
    centerY: height / 2,
    rotate: [0, 90],
    numOfGroups: 1,
    groups: [
      {
        type: 'radial',
        incircle: true,
        round: props.round,
        distance: [1 - props.contrast, 1],
      },
    ],
  }
  const blob = morphing(morphParams, pathParams)

  const animateColorValues = props.colors.join(';')
  const animatePathDuration = props.duration + 'ms'
  var paths = []
  console.log('blob', blob)
  for (let i = props.numOfShapes; i >= 0; i--) {
    paths.push(
      pathsVisibility[i] && (
        <path key={i} fill="transparent" opacity="1">
          <animate
            begin={props.shiftStep / 1.5 + props.shiftStep * i + 'ms'}
            attributeName="opacity"
            dur="200ms"
            repeatCount="1"
            from="0"
            to="1"
          />
          <animate
            begin={props.shiftStep / 1.5 + props.shiftStep * i + 'ms'}
            attributeName="d"
            dur={animatePathDuration}
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes={keyTimes}
            keySplines={keySplines}
            values={blob.dValues}
          />
          <animate
            begin={props.shiftStep / 1.5 + props.shiftStep * i + 'ms'}
            attributeName={props.type}
            values={animateColorValues}
            dur={animatePathDuration}
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes={keyTimes}
            keySplines={keySplines}
          />
        </path>
      )
    )
  }

  const circle = (
    <circle cx="50" cy="50" r="20" fill="white">
      <animate
        attributeName="cx"
        dur={animatePathDuration}
        repeatCount="indefinite"
        values="85; 230; 230; 85"
        calcMode="spline"
        keyTimes={keyTimes}
        keySplines={keySplines}
      />
      <animate
        attributeName="cy"
        dur={animatePathDuration}
        repeatCount="indefinite"
        values="300; 140; 260; 300"
        calcMode="spline"
        keyTimes={keyTimes}
        keySplines={keySplines}
      />
      <animate
        attributeName="r"
        dur={animatePathDuration}
        repeatCount="indefinite"
        values="26; 22; 32; 26"
        calcMode="spline"
        keyTimes={keyTimes}
        keySplines={keySplines}
      />
    </circle>
  )

  const labels = (
    <React.Fragment>
      <text x="85" y="300" id="django-label">
        Django
        <animate
          attributeName="opacity"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="1; 0; 0; 1"
          keyTimes="0; 0.2; 0.9; 1"
        />
        <animate
          attributeName="x"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="85; 230; 230; 85"
          calcMode="spline"
          keyTimes={keyTimes}
          keySplines={keySplines}
        />
        <animate
          attributeName="y"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="303; 143; 263; 303"
          calcMode="spline"
          keyTimes={keyTimes}
          keySplines={keySplines}
        />
      </text>
      <text x="230" y="140" id="react-label">
        React
        <animate
          attributeName="opacity"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="0; 0; 1; 0; 0"
          keyTimes="0; 0.15; 0.333; 0.6; 1"
        />
        <animate
          attributeName="x"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="85; 230; 230; 85"
          calcMode="spline"
          keyTimes={keyTimes}
          keySplines={keySplines}
        />
        <animate
          attributeName="y"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="303; 143; 263; 303"
          calcMode="spline"
          keyTimes={keyTimes}
          keySplines={keySplines}
        />
      </text>
      <text x="230" y="260" id="graphql-label">
        GraphQL
        <animate
          attributeName="opacity"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="0; 0; 1; 0; 0"
          keyTimes="0; 0.5; 0.666; 0.9; 1"
        />
        <animate
          attributeName="x"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="85; 230; 230; 85"
          calcMode="spline"
          keyTimes={keyTimes}
          keySplines={keySplines}
        />
        <animate
          attributeName="y"
          dur={animatePathDuration}
          repeatCount="indefinite"
          values="303; 143; 263; 303"
          calcMode="spline"
          keyTimes={keyTimes}
          keySplines={keySplines}
        />
      </text>
    </React.Fragment>
  )

  return (
    <div className="blobby-cloud">
      <svg viewBox="0 0 420 420">
        {paths}
        {circle}
        {labels}
      </svg>
    </div>
  )
}

BlobbyCloud.defaultProps = {
  x: [20, 150, 120],
  y: [220, 40, 130],
  width: [180, 200, 300],
  height: [180, 200, 300],
  duration: 5000,
  shiftStep: 236,
  numOfKeyPaths: 3,
  numOfShapes: 5,
  colors: ['#22D163', '#3688FF', '#FF546C', '#22D163'],
  contrast: 0.4,
  round: 1,
  numOfPathSegments: 6,
  type: 'fill',
  lable: false,
}

export default BlobbyCloud

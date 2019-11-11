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

  const morphParams = {
    numOfKeyPaths: props.numOfKeyPaths,
    loop: true,
  }
  var keySplines = []
  var keyTimes = []
  var numOfKeyTimes = morphParams.numOfKeyPaths * 2 - 2
  var keyTimesFactor = 1 / numOfKeyTimes
  for (let i = 0; i < morphParams.numOfKeyPaths * 2 - 1; i++) {
    keyTimes[i] = i * keyTimesFactor
  }
  for (let i = 0; i < morphParams.numOfKeyPaths * 2 - 2; i++) {
    keySplines[i] = '0.25 0 0.75 1'
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
            begin={props.shiftStep * i + 'ms'}
            attributeName="opacity"
            dur="300ms"
            repeatCount="1"
            from="0"
            to="1"
          />
          <animate
            begin={props.shiftStep * i + 'ms'}
            attributeName="d"
            dur={animatePathDuration}
            repeatCount="indefinite"
            calcMode="linear"
            // keyTimes={keyTimes}
            // keySplines={keySplines}
            values={blob.dValues}
          />
          <animate
            begin={props.shiftStep * i + 'ms'}
            attributeName={props.type}
            values={animateColorValues}
            dur={animatePathDuration}
            repeatCount="indefinite"
          />
        </path>
      )
    )
  }

  return (
    <div className="blobby-cloud">
      <svg viewBox="0 0 420 420">{paths}</svg>
    </div>
  )
}

BlobbyCloud.defaultProps = {
  x: [20, 150, 120],
  y: [220, 40, 130],
  width: [180, 200, 300],
  height: [180, 200, 300],
  duration: 4000,
  shiftStep: 200,
  numOfKeyPaths: 3,
  numOfShapes: 3,
  // colors: ['#3688FF', '#FF546C', '#22D163'],
  colors: ['#22D163', '#3688FF', '#FF546C'],
  contrast: 0.3,
  round: 1,
  numOfPathSegments: 6,
  type: 'fill',
  lable: false,
}

export default BlobbyCloud

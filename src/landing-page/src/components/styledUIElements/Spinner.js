import React, { useState, useEffect, useMemo } from 'react'
import { morphing } from 'primitivo-svg'

function Spinner(props) {
  const [width, setWidth] = useState(128)
  const [height, setHeight] = useState(128)
  const [firstPath, setFirstPath] = useState(true)
  const [secondPath, setSecondPath] = useState(false)
  const [thirdPath, setThirdPath] = useState(false)

  useEffect(() => {
    setTimeout(() => setSecondPath(true), 400)
    setTimeout(() => setThirdPath(true), 800)
  }, [])

  const morphParams = {
    numOfKeyPaths: 4,
    loop: true,
  }
  var keySplines = []
  var keyTimes = []
  var numOfKeyTimes = morphParams.numOfKeyPaths * 2 - 2
  var keyTimesFactor = 1 / numOfKeyTimes
  for (let i = 0; i < morphParams.numOfKeyPaths * 2 - 1; i++) {
    keySplines[i] = '0.7, 0, 0.9, 1'
    keyTimes[i] = i * keyTimesFactor
  }
  keySplines = keySplines.join(';')
  keyTimes = keyTimes.join(';')
  const pathParams = {
    numOfSegments: 5,
    depth: 0,
    x: 0,
    y: 0,
    width,
    height,
    centerX: width / 2,
    centerY: height / 2,
    rotate: 0,
    numOfGroups: 1,
    groups: [
      {
        type: 'radial',
        incircle: true,
        round: 1,
        distance: [0.3, 1],
      },
    ],
  }
  const blob = useMemo(() => morphing(morphParams, pathParams), [])

  return (
    <div className="spinner">
      <svg viewBox={`0 0 ${width} ${height}`}>
        {thirdPath && (
          <path fill="3688FF">
            <animate
              begin="0.8s"
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              calcMode="splines"
              keyTimes={keyTimes}
              keySplines={keySplines}
              values={blob.dValues}
            />
            <animate
              begin="0.8s"
              attributeName="fill"
              values="#3688FF; #FF546C; #22D163; #3688FF"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        )}
        {secondPath && (
          <path fill="#3688FF">
            <animate
              begin="0.4s"
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              calcMode="splines"
              keyTimes={keyTimes}
              keySplines={keySplines}
              values={blob.dValues}
            />
            <animate
              begin="0.4s"
              attributeName="fill"
              values="#3688FF; #FF546C; #22D163; #3688FF"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        )}
        {firstPath && (
          <path fill="#3688FF">
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              calcMode="splines"
              keyTimes={keyTimes}
              keySplines={keySplines}
              values={blob.dValues}
            />
            <animate
              attributeName="fill"
              values="#3688FF; #FF546C; #22D163; #3688FF"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        )}
      </svg>
      <span>loading...</span>
    </div>
  )
}

export default Spinner

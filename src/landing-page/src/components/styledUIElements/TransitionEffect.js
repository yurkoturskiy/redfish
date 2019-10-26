import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { morphing, spacing, path, phases, randomRange } from 'primitivo-svg'
// Hooks
import usePhasedTransition from '../hooks/usePhasedTransition'

const endGroupsParameters = [
  {
    incircle: false,
    distance: 1,
    round: 0,
    adaptArms: true,
    lengthBasedRound: true,
  },
  {
    incircle: false,
    type: 'linear',
    distance: 1,
    round: 1,
    adaptArms: false,
    lengthBasedRound: true,
  },
]

function TransitionEffect(props) {
  const baseParameters = {
    numOfSegments: 4,
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    centerX: props.centerX,
    centerY: props.centerY,
    rotate: 45,
  }

  const { centerX, centerY } = props
  const phasesOutput = usePhasedTransition({ centerX, centerY, numOfGroups: 2 })

  const ts = spacing({
    progression: phasesOutput.progressions,
    keySplines: '0.75, 0, 0.25, 1',
  })

  const endShape = path({ ...baseParameters, groups: endGroupsParameters })

  const [endPathIsActive, setEndPathIsActive] = useState(false)
  const [duration, setDuration] = useState(1000)

  useEffect(() => {
    setTimeout(() => setEndPathIsActive(true), (duration / 10) * 8)
  }, [])

  return (
    <svg
      width={window.innerWidth}
      height={window.innerHeight}
      className="transition-effect"
    >
      <path
        id="transition-stroke-one"
        d={endPathIsActive ? endShape.d : undefined}
        strokeWidth="32"
        stroke="#3688FF"
        fillOpacity="0"
      >
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur={`${duration}ms`}
          repeatCount="1"
          values={phasesOutput.dValues}
        />
      </path>
      <path
        id="transition-stroke-two"
        d={endPathIsActive ? endShape.d : undefined}
        strokeWidth="32"
        fillOpacity="0"
        stroke="#22D163"
      >
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur={`${duration}ms`}
          begin="110ms"
          repeatCount="1"
          values={phasesOutput.dValues}
        />
      </path>

      <path
        id="transition-stroke-three"
        d={endPathIsActive ? endShape.d : undefined}
        strokeWidth="64"
        fill="white"
        stroke="#FF546C"
      >
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur={`${duration}ms`}
          begin="250ms"
          repeatCount="1"
          values={phasesOutput.dValues}
        />
      </path>

      <path d={endPathIsActive ? endShape.d : undefined} fill="white">
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur={`${duration}ms`}
          begin="250ms"
          repeatCount="1"
          values={phasesOutput.dValues}
        />
      </path>
    </svg>
  )
}

TransitionEffect.propTypes = {
  centerX: PropTypes.number,
  centerY: PropTypes.number,
}

export default TransitionEffect

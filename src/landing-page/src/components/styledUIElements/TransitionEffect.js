import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { morphing, spacing, path, phases, randomRange } from 'primitivo-svg'

const phaseOneRatio = 3
const phaseTwoRatio = 2

const startGroupsParameters = [
  {
    incircle: false,
    radius: 2,
    round: 1,
    adaptArms: true,
    smartRound: true,
  },
  {
    incircle: false,
    type: 'linear',
    radius: 2,
    round: 1,
    adaptArms: true,
    smartRound: true,
  },
]

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

///////////////
// Phase one //
///////////////

var progressionsPhaseScope = params => {
  let numOfVertexes = params.endPath.vertexes.length
  let progressions = Array(numOfVertexes)
  progressions.fill(1, 0, numOfVertexes)
  return progressions
}

var progressionsGeneralScope = params => {
  let numOfVertexes = params.endPath.vertexes.length
  let progressions = Array(numOfVertexes)
  progressions.fill(params.duration, 0, numOfVertexes)
  return progressions
}

var phaseOneDuration = ({ endPath }) => {
  var { minLength, maxLength } = endPath.parameters
  // if (minLength < 200) minLength = 200;
  let duration = minLength / phaseOneRatio
  duration = 0.5 / (maxLength / duration)
  return duration
}

var phaseOneRadius = ({ endPath, progression }) => {
  const { maxLength } = endPath.parameters
  return maxLength * progression
}

const phaseOne = {
  duration: phaseOneDuration,
  progressionsPhaseScope,
  progressionsGeneralScope,
  groupsParameters: [
    {
      incircle: () => false,
      type: () => 'radial',
      radius: phaseOneRadius,
      round: () => 1,
      adaptArms: () => true,
      smartRound: () => true,
    },
    {
      incircle: () => false,
      type: () => 'linear',
      radius: phaseOneRadius,
      round: () => 1,
      adaptArms: () => true,
      smartRound: () => true,
    },
  ],
}

///////////////
// Phase two //
///////////////

var duration = ({ prevDurations }) => {
  return 0.5 - prevDurations[0]
}

var progressionsPhaseScope = params => {
  let progressions = []
  const { endPath, duration } = params
  params.endPath.vertexes.forEach((vertex, index) => {
    let maxLength = endPath.parameters.maxLength
    let delta = maxLength / vertex.length
    progressions.push(1 / delta)
  })
  return progressions
}

var progressionsGeneralScope = params => {
  const { duration, endPath, prevPhaseProgressions } = params
  let progressions = []
  params.endPath.vertexes.forEach((vertex, index) => {
    let maxLength = endPath.parameters.maxLength
    let delta = maxLength / vertex.length
    progressions.push(duration / delta + prevPhaseProgressions[index])
  })
  return progressions
}

var radiusFirstGroup = ({
  progression,
  endPath,
  vertex,
  progressionsGeneralScope,
  progressionsPhaseScope,
  activePhaseIndex,
  phasesDuration,
}) => {
  let maxLength = endPath.parameters.maxLength
  let factor =
    (progression / progressionsGeneralScope[activePhaseIndex][vertex.index]) *
    progressionsPhaseScope[activePhaseIndex][vertex.index]
  let result = factor * maxLength
  return result
}

var radiusSecondGroup = ({
  progression,
  endPath,
  vertex,
  progressionsGeneralScope,
  progressionsPhaseScope,
  activePhaseIndex,
  phasesDuration,
}) => {
  let maxLength = endPath.parameters.maxLength
  let factor =
    (progression / progressionsGeneralScope[activePhaseIndex][vertex.index]) *
    progressionsPhaseScope[activePhaseIndex][vertex.index]
  let result = factor * maxLength
  return result / 2
}

const phaseTwo = {
  duration,
  progressionsPhaseScope,
  progressionsGeneralScope,
  groupsParameters: [
    {
      incircle: () => false,
      type: () => 'radial',
      radius: radiusFirstGroup,
      adaptArms: () => true,
      round: () => 1,
      lengthBasedRound: () => true,
    },
    {
      incircle: () => false,
      type: () => 'linear',
      radius: radiusSecondGroup,
      adaptArms: () => false,
      round: () => 1,
      lengthBasedRound: () => true,
    },
  ],
}

/////////////////
// Phase three //
/////////////////

var progressionsPhaseScope = params => {
  let progressions = []
  const { endPath, duration } = params
  const { vertexes } = endPath
  const maxLength = endPath.parameters.maxLengthByGroup[1]

  for (let i = 0; i < vertexes.length; i++) {
    let vertex = vertexes[i]
    if (vertex.group === 0) {
      // Handle M and C type vertexes
      const prevIndex = i === 0 ? vertexes.length - 2 : i - 1
      const nextIndex = i === vertexes.length - 1 ? 1 : i + 1

      let prevDelta = maxLength / vertexes[prevIndex].length
      let nextDelta = maxLength / vertexes[nextIndex].length

      let prevProgression = 1 / prevDelta
      let nextProgression = 1 / nextDelta

      progressions[prevIndex] = prevProgression
      progressions[nextIndex] = nextProgression

      progressions[i] =
        nextProgression > prevProgression ? nextProgression : prevProgression
    } else if (progressions[i] === undefined) {
      let delta = maxLength / vertex.length
      progressions[i] = 1 / delta
    }
  }
  return progressions
}

var progressionsGeneralScope = params => {
  const { duration, endPath, prevPhaseProgressions } = params
  const { vertexes } = endPath
  const maxLength = endPath.parameters.maxLengthByGroup[1]
  let progressions = []
  for (let i = 0; i < vertexes.length; i++) {
    let vertex = vertexes[i]
    if (vertex.group === 0) {
      // Handle M and C type vertexes
      const prevIndex = i === 0 ? vertexes.length - 2 : i - 1
      const nextIndex = i === vertexes.length - 1 ? 1 : i + 1

      let prevDelta = maxLength / vertexes[prevIndex].length
      let nextDelta = maxLength / vertexes[nextIndex].length

      let prevProgression =
        duration / prevDelta + prevPhaseProgressions[prevIndex]
      let nextProgression =
        duration / nextDelta + prevPhaseProgressions[nextIndex]

      progressions[prevIndex] = prevProgression
      progressions[nextIndex] = nextProgression

      progressions[i] =
        nextProgression > prevProgression ? nextProgression : prevProgression
    } else if (progressions[i] === undefined) {
      let delta = maxLength / vertex.length
      progressions[i] = duration / delta + prevPhaseProgressions[i]
    }
  }
  return progressions
}

var roundFirstGroup = ({
  progression,
  endPath,
  vertex,
  progressionsGeneralScope,
  progressionsPhaseScope,
  activePhaseIndex,
}) => {
  const { vertexes } = endPath
  const prevIndex = vertex.index === 0 ? vertexes.length - 2 : vertex.index - 1
  const nextIndex = vertex.index === vertexes.length - 1 ? 1 : vertex.index + 1
  let firstFactor =
    progression / progressionsGeneralScope[activePhaseIndex][prevIndex]
  let firstArm = 1 - firstFactor
  if (firstArm < 0) firstArm = 0

  let secondFactor =
    progression / progressionsGeneralScope[activePhaseIndex][nextIndex]
  let secondArm = 1 - secondFactor
  if (secondArm < 0) secondArm = 0
  let result = [firstArm, secondArm]
  return result
}

var radiusSecondGroup = ({
  progression,
  endPath,
  vertex,
  progressionsGeneralScope,
  progressionsPhaseScope,
  activePhaseIndex,
}) => {
  let maxLength = endPath.parameters.maxLengthByGroup[1]
  let factor =
    (progression / progressionsGeneralScope[activePhaseIndex][vertex.index]) *
    progressionsPhaseScope[activePhaseIndex][vertex.index]
  let result = factor * maxLength
  return result
}

const phaseThree = {
  duration: () => 0.5,
  progressionsPhaseScope,
  progressionsGeneralScope,
  groupsParameters: [
    {
      incircle: () => false,
      type: () => 'radial',
      radius: ({ vertex }) => vertex.length,
      adaptArms: () => true,
      round: roundFirstGroup,
      lengthBasedRound: () => true,
    },
    {
      incircle: () => false,
      type: () => 'linear',
      radius: radiusSecondGroup,
      adaptArms: () => false,
      round: () => 1,
      lengthBasedRound: () => true,
    },
  ],
}

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

  const phasesOutput = phases({
    loop: false,
    startGroupsParameters,
    endGroupsParameters,
    baseParameters,
    phases: [{ ...phaseOne }, { ...phaseTwo }, { ...phaseThree }],
  })

  const ts = spacing({
    progression: phasesOutput.progressions,
    keySplines: '0.75, 0, 0.25, 1',
  })

  const endShape = path({ ...baseParameters, groups: endGroupsParameters })

  const [endPathIsActive, setEndPathIsActive] = useState(false)

  useEffect(() => {
    setTimeout(() => setEndPathIsActive(true), 1400)
  }, [])

  return (
    <svg
      width={window.innerWidth}
      height={window.innerHeight}
      className="transition-effect"
    >
      <path
        d={endPathIsActive && endShape.d}
        strokeWidth="32"
        stroke="#3688FF"
        fillOpacity="0"
      >
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur="1500ms"
          repeatCount="1"
          values={phasesOutput.dValues}
        />
      </path>
      <path
        d={endPathIsActive && endShape.d}
        strokeWidth="32"
        fillOpacity="0"
        stroke="#22D163"
      >
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur="1500ms"
          begin="110ms"
          repeatCount="1"
          values={phasesOutput.dValues}
        />
      </path>

      <path
        d={endPathIsActive && endShape.d}
        strokeWidth="64"
        fill="white"
        stroke="#FF546C"
      >
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur="1500ms"
          begin="250ms"
          repeatCount="1"
          values={phasesOutput.dValues}
        />
      </path>

      <path d={endPathIsActive && endShape.d} fill="white">
        <animate
          calcMode="spline"
          keyTimes={ts.keyTimes}
          keySplines={ts.keySplines}
          attributeName="d"
          dur="1500ms"
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

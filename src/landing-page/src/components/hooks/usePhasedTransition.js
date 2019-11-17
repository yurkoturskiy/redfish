import React, { useMemo } from 'react'
import { phases, randomRange } from 'primitivo-svg'
// Hooks
import useWindow from './useWindow'

function usePhasedTransition(props) {
  const [windowWidth, windowHeight] = useWindow()
  const phaseOneRatio = 3
  const phaseTwoRatio = 2

  const getStartGroupsParameters = () => {
    let groups = []
    for (let i = 0; i < props.numOfGroups - 1; i++) {
      groups.push({
        incircle: false,
        type: 'linear',
        radius: 2,
        round: 1,
        adaptArms: true,
        smartRound: true,
      })
    }
    groups.push({
      incircle: false,
      type: 'linear',
      radius: 2,
      round: 1,
      adaptArms: true,
      smartRound: true,
    })
    return groups
  }

  const getEndGroupsParameters = () => {
    let groups = []
    for (let i = 0; i < props.numOfGroups - 1; i++) {
      groups.push({
        incircle: false,
        type: 'linear',
        distance: 1,
        round: 0,
        adaptArms: true,
        lengthBasedRound: true,
      })
    }
    groups.push({
      incircle: false,
      type: 'linear',
      distance: 1,
      round: 1,
      adaptArms: false,
      lengthBasedRound: true,
    })
    return groups
  }

  const startGroupsParameters = getStartGroupsParameters()
  const endGroupsParameters = getEndGroupsParameters()

  ///////////////
  // Phase one //
  ///////////////

  const phaseOneProgressionsPhaseScope = params => {
    let numOfVertexes = params.endPath.vertexes.length
    let progressions = Array(numOfVertexes)
    progressions.fill(1, 0, numOfVertexes)
    return progressions
  }

  const phaseOneProgressionsGeneralScope = params => {
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

  const phaseOneGroupsParameters = () => {
    let groups = []
    for (let i = 0; i < props.numOfGroups - 1; i++) {
      groups.push({
        incircle: () => false,
        type: () => 'radial',
        radius: phaseOneRadius,
        round: () => 1,
        adaptArms: () => true,
        smartRound: () => true,
      })
    }
    groups.push({
      incircle: () => false,
      type: () => 'linear',
      radius: phaseOneRadius,
      round: () => 1,
      adaptArms: () => true,
      smartRound: () => true,
    })
    return groups
  }

  const phaseOne = {
    duration: phaseOneDuration,
    progressionsPhaseScope: phaseOneProgressionsPhaseScope,
    progressionsGeneralScope: phaseOneProgressionsGeneralScope,
    groupsParameters: phaseOneGroupsParameters(),
  }

  ///////////////
  // Phase two //
  ///////////////

  const phaseTwoDuration = ({ prevDurations }) => {
    return 0.5 - prevDurations[0]
  }

  const phaseTwoProgressionsPhaseScope = params => {
    let progressions = []
    const { endPath, duration } = params
    params.endPath.vertexes.forEach((vertex, index) => {
      let maxLength = endPath.parameters.maxLength
      let delta = maxLength / vertex.length
      progressions.push(1 / delta)
    })
    return progressions
  }

  const phaseTwoProgressionsGeneralScope = params => {
    const { duration, endPath, prevPhaseProgressions } = params
    let progressions = []
    params.endPath.vertexes.forEach((vertex, index) => {
      let maxLength = endPath.parameters.maxLength
      let delta = maxLength / vertex.length
      progressions.push(duration / delta + prevPhaseProgressions[index])
    })
    return progressions
  }

  const phaseTwoRadiusFirstGroup = ({
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

  const phaseTwoRadiusSecondGroup = ({
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

  const phaseTwoGroupsParameters = () => {
    let groups = []
    for (let i = 0; i < props.numOfGroups - 1; i++) {
      groups.push({
        incircle: () => false,
        type: () => 'linear',
        radius: phaseTwoRadiusFirstGroup,
        adaptArms: () => true,
        round: () => 1,
        lengthBasedRound: () => true,
      })
    }
    groups.push({
      incircle: () => false,
      type: () => 'linear',
      radius: phaseTwoRadiusSecondGroup,
      adaptArms: () => false,
      round: () => 1,
      lengthBasedRound: () => true,
    })
    return groups
  }

  const phaseTwo = {
    duration: phaseTwoDuration,
    progressionsPhaseScope: phaseTwoProgressionsPhaseScope,
    progressionsGeneralScope: phaseTwoProgressionsGeneralScope,
    groupsParameters: phaseTwoGroupsParameters(),
  }

  /////////////////
  // Phase three //
  /////////////////

  const phaseThreeProgressionsPhaseScope = params => {
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

  const phaseThreeProgressionsGeneralScope = params => {
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

  const phaseThreeRoundFirstGroup = ({
    progression,
    endPath,
    vertex,
    progressionsGeneralScope,
    progressionsPhaseScope,
    activePhaseIndex,
  }) => {
    const { vertexes } = endPath
    const prevIndex =
      vertex.index === 0 ? vertexes.length - 2 : vertex.index - 1
    const nextIndex =
      vertex.index === vertexes.length - 1 ? 1 : vertex.index + 1
    let prevPhaseGeneralScopeProgression =
      progressionsGeneralScope[activePhaseIndex - 1][vertex.index]
    let firstFactor =
      (prevPhaseGeneralScopeProgression - progression) /
      (prevPhaseGeneralScopeProgression -
        progressionsGeneralScope[activePhaseIndex][prevIndex])

    let firstArm = 1 - firstFactor
    if (firstArm < 0) firstArm = 0
    else if (firstArm > 1) firstArm = 0

    let secondFactor =
      (prevPhaseGeneralScopeProgression - progression) /
      (prevPhaseGeneralScopeProgression -
        progressionsGeneralScope[activePhaseIndex][nextIndex])

    let secondArm = 1 - secondFactor
    if (secondArm < 0) secondArm = 0
    else if (secondArm > 1) secondArm = 0
    let result = [firstArm, secondArm]
    return result
  }

  const phaseThreeRadiusSecondGroup = ({
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

  const phaseThreeGroupsParameters = () => {
    let groups = []
    for (let i = 0; i < props.numOfGroups - 1; i++) {
      groups.push({
        incircle: () => false,
        type: () => 'linear',
        radius: ({ vertex }) => vertex.length,
        adaptArms: () => true,
        round: phaseThreeRoundFirstGroup,
        lengthBasedRound: () => true,
      })
    }
    groups.push({
      incircle: () => false,
      type: () => 'linear',
      radius: phaseThreeRadiusSecondGroup,
      adaptArms: () => false,
      round: () => 1,
      lengthBasedRound: () => true,
    })
    return groups
  }

  const phaseThree = {
    duration: () => 0.5,
    progressionsPhaseScope: phaseThreeProgressionsPhaseScope,
    progressionsGeneralScope: phaseThreeProgressionsGeneralScope,
    groupsParameters: phaseThreeGroupsParameters(),
  }

  const baseParameters = {
    numOfSegments: 4,
    depth: 0,
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    centerX: props.centerX,
    centerY: props.centerY,
    rotate: 45,
    numOfGroups: props.numOfGroups,
  }

  const phasesOutput = phases({
    loop: false,
    startGroupsParameters,
    endGroupsParameters,
    baseParameters,
    phases: [{ ...phaseOne }, { ...phaseTwo }, { ...phaseThree }],
  })

  return phasesOutput
}

export default usePhasedTransition

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import TransitionEffect from './TransitionEffect'

function PrimitivoTransitionLink(props) {
  const [clickPos, setClickPos] = useState()
  const [isActive, setIsActive] = useState()

  const handleClick = e => {
    console.log('click event', e)
    setClickPos({ x: e.clientX, y: e.clientY })
    setIsActive(true)
  }

  useEffect(() => {
    if (clickPos && !isActive) {
      setIsActive(true)
      // setTimeout(() => {
      //   setIsActive(false)
      //   setClickPos(undefined)
      // }, 2200)
    }
  }, [clickPos, isActive])

  return (
    <div className="button-wrapper">
      {isActive && clickPos && (
        <TransitionEffect centerX={clickPos.x} centerY={clickPos.y} />
      )}
      <TransitionLink
        to={props.to}
        exit={{
          trigger: ({ exit, e }) => {
            handleClick(e)
            setTimeout(() => {
              setIsActive(false)
              setClickPos(false)
            }, 1800)
          },
          length: 1.7,
        }}
        entry={{
          delay: 1,
          zIndex: 8,
          trigger: props => {
            console.log('props', props)
            console.log('styles', props.node.style.opacity)
            props.node.style.opacity = '0'
            props.node.style.transition = 'opacity 0.6s'
            setTimeout(() => {
              props.node.style.opacity = '1'
            }, 100)
          },
        }}
      >
        {props.children}
      </TransitionLink>
    </div>
  )
}

PrimitivoTransitionLink.propTypes = {
  to: PropTypes.string,
}

export default PrimitivoTransitionLink

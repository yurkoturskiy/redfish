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

  return (
    <React.Fragment>
      {isActive && clickPos && (
        <TransitionEffect centerX={clickPos.x} centerY={clickPos.y} />
      )}
      <TransitionLink
        {...props}
        to={props.to}
        exit={{
          trigger: ({ node, exit, e }) => {
            node.style.position = 'absolute'
            node.style.top = '0px'
            node.style.left = '0px'

            handleClick(e)
          },
          length: 1,
        }}
        entry={{
          delay: 0.6,
          length: 0,
          trigger: props => {
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
    </React.Fragment>
  )
}

PrimitivoTransitionLink.propTypes = {
  to: PropTypes.string,
}

export default PrimitivoTransitionLink

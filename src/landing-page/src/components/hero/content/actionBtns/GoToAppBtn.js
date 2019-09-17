import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import Button from '@material/react-button'
import TransitionEffect from '../../../styledUIElements/TransitionEffect'

function GoToAppBtn(props) {
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
      setTimeout(() => {
        setIsActive(false)
        setClickPos(undefined)
      }, 2200)
    }
  }, [clickPos, isActive])

  return (
    <div className="button-wrapper">
      {isActive && clickPos && (
        <TransitionEffect centerX={clickPos.x} centerY={clickPos.y} />
      )}
      <TransitionLink
        to="/authentication/"
        onClick={e => handleClick(e)}
        exit={{
          trigger: ({ exit, e }) => {
            console.log('exit', exit)
          },
          length: 2,
        }}
        entry={{
          delay: 0.5,
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
          state: { thisis: 'ololo' },
        }}
      >
        <Button className="material-button">Go to app</Button>
      </TransitionLink>
    </div>
  )
}

export default GoToAppBtn

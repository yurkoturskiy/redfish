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
    <React.Fragment>
      {isActive && clickPos && (
        <TransitionEffect centerX={clickPos.x} centerY={clickPos.y} />
      )}
      <Button className="material-button">
        <TransitionLink
          to="/authentication/"
          onClick={e => handleClick(e)}
          exit={{
            trigger: ({ exit }) => {
              console.log('exit', exit)
            },
            delay: 1.6,
          }}
          entry={{
            trigger: () => {
              console.log('entry')
            },
          }}
        >
          Go to app
        </TransitionLink>
      </Button>
    </React.Fragment>
  )
}

export default GoToAppBtn

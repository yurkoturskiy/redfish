import React, { useState, useRef, useEffect } from 'react'
import SideBar from './SideBar'
import SandwichButton from './SandwichButton'

function Menu(props) {
  const [isVisible, setIsVisible] = useState(false)
  const sandwichBtnRef = useRef()
  const sideBarRef = useRef()

  const handleClickOutside = event => {
    // Collapse on click outside of the menu
    if (
      sandwichBtnRef.current &&
      !sandwichBtnRef.current.contains(event.target) &&
      !sideBarRef.current.contains(event.target)
    ) {
      setIsVisible(false)
    }
  }

  const handleMenuClick = () => {
    // Collapse on menu element click
    setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible])
  return (
    <div style={{ zIndex: isVisible && '8' }}>
      <SideBar sideBarRef={sideBarRef} isVisible={isVisible} />
      <SandwichButton
        sandwichBtnRef={sandwichBtnRef}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </div>
  )
}

export default Menu

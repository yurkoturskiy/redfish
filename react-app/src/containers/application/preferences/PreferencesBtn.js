import React, { useRef, useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import icon from '../../../static/icon.svg'
import Fab from '@material/react-fab'
import MaterialIcon from '@material/react-material-icon';
// local components
import Logout from './Logout'
import ProfileBtn from './ProfileBtn'

export const MenuWrapper = styled.div`
  z-index: 2;
  position: fixed;
  bottom: 32px;
  left: 32px;
`

export const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 40px;
`

export const Menu = styled.div`
  vertical-align: bottom;
  background-color: red;
  display: ${props => props.status ? 'inline-block' : 'none'};
`

function PreferencesBtn(props) {
  const fabRef = useRef()
  const menuRef = useRef()
  const [status, setStatus] = useState(false)

  const handleClickOutside = (event) => {
    // Collapse on click outside of the menu
    if (fabRef.current 
      && !fabRef.current.contains(event.target) 
      && !menuRef.current.contains(event.target)
    ) {
      setStatus(false)
    }
  }

  const handleMenuClick = () => {
    // Collapse on menu element click
    setStatus(false)
  }

  useEffect(() => {
    if (status) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [status])

  return (
    <React.Fragment>
      <MenuWrapper>
        <Wrapper ref={fabRef}>
          <Fab mini onClick={() => setStatus(!status)} icon={<MaterialIcon icon="settings"/>} />
        </Wrapper>
        <Menu status={status} ref={menuRef}>
          <ProfileBtn handleMenuClick={handleMenuClick} />
          <Logout handleMenuClick={handleMenuClick} />
        </Menu>
      </MenuWrapper>
    </React.Fragment>
  )
}

export default withRouter(PreferencesBtn)
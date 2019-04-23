import React from 'react'
import { withRouter } from 'react-router'


function ProfileBtn(props) {
  const redirect = () => {
    if (props.history.location.pathname !== '/profile') {
      props.history.push('/profile')
    }
  }
  return (
    <div onClick={redirect}>Profile</div>
  )
}

export default withRouter(ProfileBtn)
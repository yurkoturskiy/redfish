import React from 'react'
import { withRouter } from 'react-router'


function ProfileBtn(props) {
  return (
    <div onClick={() => props.history.push('/profile') }>Profile</div>
  )
}

export default withRouter(ProfileBtn)
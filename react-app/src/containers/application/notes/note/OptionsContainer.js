import React from 'react'
// components
import DeleteOption from './DeleteOption'

function OptionsContainer(props) {
  return (
    <div className="menu">
      <DeleteOption node={props.node}/>
    </div>
  )
}

export default OptionsContainer
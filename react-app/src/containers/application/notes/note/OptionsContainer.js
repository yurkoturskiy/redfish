import React from 'react'
import PropTypes from 'prop-types'
// local components
import DeleteOption from './DeleteOption'
import ColorOption from './ColorOption'


function OptionsContainer(props) {
  return (
    <div className="options">
      <DeleteOption node={props.node}/>
      <ColorOption node={props.node}/>
    </div>
  )
}

OptionsContainer.propTypes = {
  node: PropTypes.object,
}

export default OptionsContainer
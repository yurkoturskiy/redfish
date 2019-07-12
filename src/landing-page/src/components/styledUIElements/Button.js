import React from 'react'

function Button(props) {
  return (
    <button className="dot-button" {...props}>
      <span>{props.children}</span>
      <div className={`dot ${props.romb && 'romb'}`} />
    </button>
  )
}

export default Button

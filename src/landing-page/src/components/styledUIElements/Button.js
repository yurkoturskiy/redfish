import React from 'react'

function Button(props) {
  const romb = props.romb === 'true'
  return (
    <button className="dot-button" {...props}>
      <span>{props.children}</span>
      <div className={`dot ${romb && 'romb'}`} />
    </button>
  )
}

export default Button

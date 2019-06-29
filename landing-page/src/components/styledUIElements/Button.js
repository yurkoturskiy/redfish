import React from 'react'
import { css } from 'linaria'

const style = css`
  position: relative;
  display: inline-block;
  padding: 12px;
  border-radius: 8px;
  border: 0;
  background: transparent;
  margin: 23px 20px 0 20px;
  padding: 0;
  cursor: pointer;

  span {
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
  }

  .dot {
    /* positioning */
    margin: auto;
    height: 4px;
    width: 4px;
    background: var(--green-eight);
    border-radius: 4px;
    margin: 12px auto 7px auto;
    transition: width 0.2s, height 0.2s, margin 0.2s, border-radius 0.2s;
  }

  .romb.dot {
    transform: rotate(45deg);
    border-radius: 0;
  }

  &:hover .dot {
    width: 18px;
    height: 18px;
    border-radius: 32px;
    margin: 5px auto 0 auto;
  }

  &:hover .romb.dot {
    border-radius: 0;
  }
`

function Button(props) {
  return (
    <button className={style} {...props}>
      <span>{props.children}</span>
      <div className={`dot ${props.romb && 'romb'}`} />
    </button>
  )
}

export default Button

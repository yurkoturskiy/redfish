import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const content = css`
  position: absolute;
  top: 30vh;
  left: 18.18%;
  outline: 1px solid grey;

  @media screen and (max-width: 1440px) {
    left: 9.09%;
  }
`

function ContentWrapper(props) {
  return <div className={content}>{props.children}</div>
}

export default ContentWrapper

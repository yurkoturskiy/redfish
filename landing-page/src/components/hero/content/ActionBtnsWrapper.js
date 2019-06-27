import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const wrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;

  @media screen and (max-width: 540px) {
    flex-direction: column;
  }
`

function ActionBtnsWrapper(props) {
  return <div className={wrapper}>{props.children}</div>
}

export default ActionBtnsWrapper

import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const button = css`
  height: 88px;
  width: 284px;
  border: 1px solid lightgrey;
  border-radius: 44px;
  line-height: 88px;
  text-align: center;
`

function BrieflyAboutBtn(props) {
  return (
    <div className={button} onClick={() => props.setDialog(true)}>
      Briefly about
    </div>
  )
}

export default BrieflyAboutBtn

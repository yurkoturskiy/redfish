import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const card = css`
  width: 384px;
  height: 128px;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
`
const purpose = css`
  font-size: 1, 125rem;
  font-style: normal;
  font-weight: 300;
  color: #555555;
`

const name = css`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  color: #555555;
`

function DependencyElement(props) {
  const { Icon } = props
  return (
    <div className={card}>
      <Icon />
      <h4 className={purpose}>{props.purpose}</h4>
      <h2 className={name}>{props.name}</h2>
    </div>
  )
}

export default DependencyElement

import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const content = css`
  position: absolute;
  top: 30vh;
  left: calc(18.18% - var(--gutter) / 2);

  @media screen and (max-width: 1439px) and (min-width: 801px) {
    left: calc(9.09% - var(--gutter) / 2);
  }

  @media screen and (max-width: 800px) and (min-width: 541px) {
    left: var(--gutter);
  }

  @media screen and (max-width: 540px) {
    left: 0;
    right: 0;
  }
`

function ContentWrapper(props) {
  return <div className={content}>{props.children}</div>
}

export default ContentWrapper

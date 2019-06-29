import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const content = css`
  position: relative;
  z-index: 2;
  top: 30vh;
  left: calc(var(--col-two) - var(--gutter));
  width: calc((100% / var(--columns)) * 8);

  @media screen and (max-width: 1439px) and (min-width: 801px) {
    left: calc(100% / var(--columns) - var(--gutter) / 2);
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

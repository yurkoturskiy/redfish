import React from 'react'
import { css } from 'linaria'
// Local components
import HeroImage from '../../../images/HeroImage'

const style = css`
  position: absolute;
  right: calc(100% / 12 * 2 + var(--gutter));
  top: 0;
  bottom: 0;
  margin: auto 0 auto 0;
  z-index: 0;

  @media screen and (max-width: 1439px) and (min-width: 801px) {
    right: calc(100% / var(--columns) - var(--gutter) / 2);
  }

  @media screen and (max-width: 800px) and (min-width: 541px) {
    right: var(--gutter);
  }

  @media screen and (max-width: 540px) {
    right: 0;
  }
`

function Image(props) {
  return <HeroImage className={style} />
}

export default Image

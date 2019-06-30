import React from 'react'
import styled from 'styled-components'
// Local components
import HeroImage from '../../../images/HeroImage'

function Image({ className }) {
  return <HeroImage className={className} />
}

const StyledComp = styled(Image)`
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

export default StyledComp

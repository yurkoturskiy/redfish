import React from 'react'
import { Link } from 'gatsby'
import icon from '../../images/redfish-color-logo.svg'
import RedfishLogoColor from '../../images/RedfishLogoColor'
import { css } from 'linaria' // eslint-disable-line

export const logo = css`
  width: 126px;
  height: 58px;

  /* Adapt position */

  position: absolute;
  top: 32px;
  left: calc(18.18% + var(--gutter) / 2);

  @media screen and (max-width: 1439px) and (min-width: 801px) {
    left: calc(9.09% + var(--gutter) / 2);
  }

  @media screen and (max-width: 800px) and (min-width: 541px) {
    left: calc(var(--gutter) * 2);
  }

  @media screen and (max-width: 540px) {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`

function Logo(props) {
  return (
    <Link to="/">
      <RedfishLogoColor className={logo} />
    </Link>
  )
}

export default Logo

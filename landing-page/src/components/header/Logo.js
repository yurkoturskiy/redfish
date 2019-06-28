import React from 'react'
import { Link } from 'gatsby'
import icon from '../../images/redfish-color-logo.svg'
import RedfishLogoSolid from '../../images/RedfishLogoSolid'
import { css } from 'linaria' // eslint-disable-line

export const logo = css`
  /* Adapt position */

  position: absolute;
  top: 32px;
  left: calc(18.18% + var(--gutter) / 2);

  svg {
    fill: var(--green-eight);
  }

  span {
    display: inline-block;
    vertical-align: top;
    margin: 19px 6px 18px 12px;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: var(--green-eight);
  }

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
      <div className={logo}>
        <RedfishLogoSolid />
        <span>Redfish</span>
      </div>
    </Link>
  )
}

export default Logo

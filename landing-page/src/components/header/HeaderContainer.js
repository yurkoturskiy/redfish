import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria' // eslint-disable-line
import { navigate } from 'gatsby'
import Button from '@material/react-button'
// Local components
import Logo from './Logo'

const navigation = css`
  position: absolute;
  width: 100%;
  z-index: 1;
  padding-left: var(--grid-margin);
  padding-right: var(--grid-margin);

  a {
    text-decoration: none;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .button {
    background-color: blue;
    color: black;
    text-align: center;
    padding: 22px 8px 22px 8px;
    text-decoration: none;
  }

  .button:hover {
    background-color: #f0f0f0;
  }
`

const HeaderContainer = ({ siteTitle }) => (
  <nav className={navigation}>
    <Logo />
  </nav>
)

HeaderContainer.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderContainer.defaultProps = {
  siteTitle: ``,
}

export default HeaderContainer

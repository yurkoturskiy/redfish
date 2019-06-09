import { css } from 'linaria'
import PropTypes from 'prop-types'
import React from 'react'
// Local components
import Logo from './Logo'
import GoToAppBtn from './GoToAppBtn'
import GitHubBtn from './GitHubBtn'

const navigation = css`
  position: absolute;
  width: 100%;
  float: right;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);

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
    <GoToAppBtn />
    <GitHubBtn />
  </nav>
)

HeaderContainer.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderContainer.defaultProps = {
  siteTitle: ``,
}

export default HeaderContainer

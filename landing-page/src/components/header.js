import { Link } from 'gatsby'
import { css } from 'linaria'
import PropTypes from 'prop-types'
import React from 'react'

const navigation = css`
  position: absolute;
  width: 100%;
  height: 100px;
  z-index: 1;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li:hover {
    background-color: #f0f0f0;
  }
`

const Header = ({ siteTitle }) => (
  <nav className={navigation}>
    <ul>
      <Link to="/">
        <li>Redject</li>
      </Link>
      <Link to="/login">
        <li>login</li>
      </Link>
      <Link to="/registration">
        <li>registration</li>
      </Link>
    </ul>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

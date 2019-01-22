import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Navigation from './Navigation'

const Header = ({ siteTitle }) => (
  <Navigation>
    <ul>
      <Link to="/"><li>Redject</li></Link>
      <Link to="/login"><li>login</li></Link>
      <Link to="/registration"><li>registration</li></Link>
    </ul>
  </Navigation>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

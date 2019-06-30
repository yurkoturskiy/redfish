import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Button from '@material/react-button'
// Local components
import Logo from './Logo'

const HeaderContainer = ({ siteTitle }) => (
  <nav className="header-container">
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

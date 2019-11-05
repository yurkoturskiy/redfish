import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Button from '@material/react-button'
// Local components
import Logo from './Logo'
import TransitionEffectButton from '../styledUIElements/TransitionEffectButton'
import ExternalLinkButton from '../styledUIElements/ExternalLinkButton'

const HeaderContainer = props => {
  const { path } = props
  console.log('path', path)
  return (
    <nav className="header-container">
      <Logo />
      {path !== '/' && (
        <React.Fragment>
          <TransitionEffectButton
            disabled={path === '/authentication/'}
            to="/authentication/"
          >
            Go To App
          </TransitionEffectButton>
          <TransitionEffectButton disabled={path === '/docs'} to="/docs/">
            Docs
          </TransitionEffectButton>
          <ExternalLinkButton to="https://github.com/guandjoy/Redfish">
            GitHub
          </ExternalLinkButton>
        </React.Fragment>
      )}
    </nav>
  )
}

HeaderContainer.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderContainer.defaultProps = {
  siteTitle: ``,
}

export default HeaderContainer

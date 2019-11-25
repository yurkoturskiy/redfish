import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
// Local components
import FooterPattern from '../../images/FooterPattern'
import Background from './Background'

function FooterContainer(props) {
  return (
    <div className="footer-wrapper">
      <Background />
      <FooterPattern className="footer-pattern" />
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          backgroundColor: 'white',
          padding: '4px',
        }}
      >
        <TransitionLink to="/terms-of-service">Terms of Service</TransitionLink>
        <TransitionLink to="/privacy-policy">Privacy Policy</TransitionLink>
      </div>
    </div>
  )
}

export default FooterContainer

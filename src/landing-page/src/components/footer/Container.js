import React from 'react'
// Local components
import FooterPattern from '../../images/FooterPattern'
import Background from './Background'

function FooterContainer(props) {
  return (
    <div className="footer-wrapper">
      <Background />
      <FooterPattern className="footer-pattern" />
    </div>
  )
}

export default FooterContainer

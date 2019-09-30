import React from 'react'
// Local components
import FooterPattern from '../../images/FooterPattern'

function FooterContainer(props) {
  return (
    <div className="footer-wrapper">
      <div className="content"></div>
      <FooterPattern className="footer-pattern" />
    </div>
  )
}

export default FooterContainer

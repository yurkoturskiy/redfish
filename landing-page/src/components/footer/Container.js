import React from 'react'
// Local components
import FooterPattern from '../../images/FooterPattern'
import FooterLogo from '../../images/FooterLogo'
import TwitterIcon from '../../images/TwitterIcon'
import GitHubIcon from '../../images/GitHubIcon'

function FooterContainer(props) {
  return (
    <div className="footer-wrapper">
      <div className="content">
        <div className="icons">
          <TwitterIcon id="twitter-footer" className="icon" />
          <GitHubIcon id="github-footer" className="icon" />
        </div>
      </div>
      <FooterPattern className="footer-pattern" />
    </div>
  )
}

export default FooterContainer

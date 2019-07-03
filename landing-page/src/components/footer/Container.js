import React from 'react'
// Local components
import FooterPattern from '../../images/FooterPattern'
import TwitterIcon from '../../images/TwitterIcon'
import GitHubIcon from '../../images/GitHubIcon'

function FooterContainer(props) {
  return (
    <div className="footer-wrapper">
      <div className="content">
        <div className="icons">
          <TwitterIcon className="icon" />
          <GitHubIcon className="icon" />
        </div>
      </div>
      <FooterPattern className="footer-pattern" />
    </div>
  )
}

export default FooterContainer

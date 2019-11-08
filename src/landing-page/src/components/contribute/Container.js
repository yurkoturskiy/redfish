import React from 'react'

import TwitterIcon from '../styledUIElements/TwitterIcon'
import GitHubIcon from '../styledUIElements/GitHubIcon'

function ContributeContainer() {
  return (
    <div className="contribute-container">
      <h2 id="contribute-header">Contribute to Redfish</h2>
      <p>
        Redfish is belong to open source community. We have what to improve, so
        feel free to participate.
      </p>
      <div className="icons">
        <a href="https://github.com/guandjoy/redfish" ariaLabel="GitHub">
          <GitHubIcon id="github-icon" className="icon" />
        </a>
        <a href="https://twitter.com/guandjoy" ariaLabel="Twitter">
          <TwitterIcon id="twitter-icon" className="icon" />
        </a>
      </div>
    </div>
  )
}

export default ContributeContainer

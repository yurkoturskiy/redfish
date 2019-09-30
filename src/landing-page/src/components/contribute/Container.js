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
        <TwitterIcon id="twitter-footer" className="icon" />
        <GitHubIcon id="github-footer" className="icon" />
      </div>
    </div>
  )
}

export default ContributeContainer

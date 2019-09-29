import React from 'react'
import ExternalLinkButton from '../styledUIElements/ExternalLinkButton'

function ContributeContainer() {
  return (
    <div className="contribute-container">
      <h2 id="contribute-header">Contribute to Redfish</h2>
      <p>
        Redfish is belong to open source community. We have what to improve, so
        feel free to participate.
      </p>
      <ExternalLinkButton to="https://github.com/guandjoy/Redfish">
        Send email
      </ExternalLinkButton>
    </div>
  )
}

export default ContributeContainer

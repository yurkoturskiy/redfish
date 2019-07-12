import React from 'react'
import Button from '../styledUIElements/Button'

function ContributeContainer() {
  return (
    <div className="contribute-container">
      <h2 id="contribute-header">Contribute to Redfish</h2>
      <p>
        Redfish is belong to open source community. We have what to improve, so
        feel free to participate.
      </p>
      <Button id="send-email">Send email</Button>
    </div>
  )
}

export default ContributeContainer

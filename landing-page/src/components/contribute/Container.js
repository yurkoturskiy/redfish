import React from 'react'
import { css } from 'linaria'

const content = css`
  width: 560px;
  margin: 0 auto 0 auto;
`

const header = css`
  text-align: center;
`

const paragraph = css`
  text-align: center;
`

function ContributeContainer() {
  return (
    <div className={content}>
      <h2 className={header}>Contribute to Redfish</h2>
      <p className={paragraph}>
        Redfish is belong to open source community. We have what to improve, so
        feel free to participate.
      </p>
      <button>Send email</button>
    </div>
  )
}

export default ContributeContainer

import React from 'react'
import { css } from 'linaria'

const content = css`
  width: 560px;
  margin: 0 auto 0 auto;
`

const header = css`
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;

  color: #444444;
`

const paragraph = css`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: #444444;
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

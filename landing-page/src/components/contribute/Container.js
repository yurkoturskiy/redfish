import React from 'react'
import styled from 'styled-components'

function ContributeContainer({ className }) {
  return (
    <div className={className}>
      <h2 className="header">Contribute to Redfish</h2>
      <p className="paragraph">
        Redfish is belong to open source community. We have what to improve, so
        feel free to participate.
      </p>
      <button>Send email</button>
    </div>
  )
}

const StyledComp = styled(ContributeContainer)`
  width: 560px;
  margin: 0 auto 0 auto;

  .header {
    text-align: center;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;

    color: #444444;
  }

  .paragraph {
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-align: center;

    color: #444444;
  }
`

export default StyledComp

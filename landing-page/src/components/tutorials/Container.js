import React from 'react'
import styled from 'styled-components'

function TutorialsContainer(props) {
  return (
    <div className={props.className}>
      <h2 className="header" id="tutorials">
        Tutorials
      </h2>
      <div className="content">
        <div className="element">
          01<span>Install</span>
        </div>
        <div className="element">
          02<span>Walkthrough</span>
        </div>
        <div className="element">
          03<span>Deploy landing on Netlify</span>
        </div>
        <div className="element">
          04<span>Deploy server on DigitalOcean</span>
        </div>
      </div>
    </div>
  )
}

const StyledComp = styled(TutorialsContainer)`
  position: relative;
  background-color: white;

  .header {
    margin: 0 auto 0 auto;
    text-align: center;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;

    color: #444444;
  }

  .content {
    margin: 0 auto 0 auto;
  }

  .element {
    width: 408px;
    height: 64px;
    margin: 16px auto 16px auto;
    background: #ffffff;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    border-radius: 8px;
  }
`

export default StyledComp

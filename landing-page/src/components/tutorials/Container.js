import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const container = css`
  position: relative;
  background-color: white;
`

const header = css`
  margin: 0 auto 0 auto;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;

  color: #444444;
`

const content = css`
  margin: 0 auto 0 auto;
`

const element = css`
  width: 408px;
  height: 64px;
  margin: 16px auto 16px auto;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  border-radius: 8px;
`

function TutorialsContainer(props) {
  return (
    <div className={container}>
      <h2 className={header}>Tutorials</h2>
      <div className={content}>
        <div className={element}>
          01<span>Install</span>
        </div>
        <div className={element}>
          02<span>Walkthrough</span>
        </div>
        <div className={element}>
          03<span>Deploy landing on Netlify</span>
        </div>
        <div className={element}>
          04<span>Deploy server on DigitalOcean</span>
        </div>
      </div>
    </div>
  )
}

export default TutorialsContainer

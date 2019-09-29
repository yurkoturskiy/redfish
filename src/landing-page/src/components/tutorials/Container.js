import React from 'react'
import TransitionEffectButton from '../styledUIElements/TransitionEffectButton'
import Background from './Background'

function TutorialsContainer() {
  return (
    <div className="tutorials-container">
      <Background />
      <div className="tutorials-content">
        <h2>Tutorials</h2>
        <div className="element">
          <span>
            <strong>01</strong>Install
          </span>
        </div>
        <div className="element">
          <span>
            <strong>02</strong>Walkthrough
          </span>
        </div>
        <div className="element">
          <span>
            <strong>03</strong>Deploy landing on Netlify
          </span>
        </div>
        <div className="element">
          <span>
            <strong>04</strong>Deploy server on DigitalOcean
          </span>
        </div>
        <TransitionEffectButton id="tutorials-view-more-button" to="/docs/">
          View More
        </TransitionEffectButton>
      </div>
    </div>
  )
}

export default TutorialsContainer

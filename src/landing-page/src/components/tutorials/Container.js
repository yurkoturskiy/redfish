import React from 'react'
import TransitionEffectButton from '../styledUIElements/TransitionEffectButton'
import PrimitivoTransitionLink from '../styledUIElements/PrimitivoTransitionLink'

function TutorialsContainer() {
  return (
    <div className="tutorials-container">
      <div className="tutorials-content">
        <h2>Tutorials</h2>
        <PrimitivoTransitionLink
          to="/docs/environments"
          className="element-wrapper"
        >
          <div className="element">
            <span>
              <strong>01</strong>Setup Environments
            </span>
          </div>
        </PrimitivoTransitionLink>
        <PrimitivoTransitionLink
          to="/docs/landing-page"
          className="element-wrapper"
        >
          <div className="element">
            <span>
              <strong>02</strong>Landing page overview
            </span>
          </div>
        </PrimitivoTransitionLink>
        <PrimitivoTransitionLink
          to="/docs/application"
          className="element-wrapper"
        >
          <div className="element">
            <span>
              <strong>03</strong>Application overview
            </span>
          </div>
        </PrimitivoTransitionLink>
        <TransitionEffectButton id="tutorials-view-more-button" to="/docs">
          Go To Docs
        </TransitionEffectButton>
      </div>
    </div>
  )
}

export default TutorialsContainer

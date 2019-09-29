import React, { useState } from 'react'
// Local components
//  * Content
import Blobs from './content/Blobs'
import ContentWrapper from './ContentWrapper'
import VideoDialog from './content/VideoDialog'
import Header from './content/Header'
//  ** Action buttons
import ActionBtnsWrapper from './content/ActionBtnsWrapper'
import BrieflyAboutBtn from './content/actionBtns/BrieflyAboutBtn'
import TransitionEffectButton from '../styledUIElements/TransitionEffectButton'
import ExternalLinkButton from '../styledUIElements/ExternalLinkButton'
//  ** Others

const HeroContainer = () => {
  const [dialog, setDialog] = useState(false)
  return (
    <div className="hero-container">
      <Blobs />
      <ContentWrapper>
        <Header />
        {dialog && <VideoDialog setDialog={setDialog} />}
        <ActionBtnsWrapper>
          <BrieflyAboutBtn setDialog={setDialog} />
          <div className="buttons-wrapper">
            <TransitionEffectButton to="/authentication/">
              Go To App
            </TransitionEffectButton>
            <TransitionEffectButton to="/docs/">
              Tutorials
            </TransitionEffectButton>
            <ExternalLinkButton to="https://github.com/guandjoy/Redfish">
              GitHub
            </ExternalLinkButton>
          </div>
        </ActionBtnsWrapper>
      </ContentWrapper>
    </div>
  )
}

export default HeroContainer

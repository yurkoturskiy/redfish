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
import GitHubPageBtn from './content/actionBtns/GitHubPageBtn'
import GoToAppBtn from './content/actionBtns/GoToAppBtn'
import TutorialsBtn from './content/actionBtns/TutorialsBtn'
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
            <GoToAppBtn />
            <TutorialsBtn />
            <GitHubPageBtn />
          </div>
        </ActionBtnsWrapper>
      </ContentWrapper>
    </div>
  )
}

export default HeroContainer

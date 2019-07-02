import React, { useState } from 'react'
// Local components
//  * Content
import ContentWrapper from './ContentWrapper'
import VideoDialog from './content/VideoDialog'
import Header from './content/Header'
import Subheader from './content/Subheader'
import Image from './content/Image'
//  ** Action buttons
import ActionBtnsWrapper from './content/ActionBtnsWrapper'
import BrieflyAboutBtn from './content/actionBtns/BrieflyAboutBtn'
import GitHubPageBtn from './content/actionBtns/GitHubPageBtn'
import GoToAppBtn from './content/actionBtns/GoToAppBtn'
import TutorialsBtn from './content/actionBtns/TutorialsBtn'
//  ** Others
import GitClone from './content/GitClone'

const HeroContainer = () => {
  const [dialog, setDialog] = useState(false)
  return (
    <div className="hero-container">
      <Image />
      <ContentWrapper>
        <Header />
        <Subheader />
        {dialog && <VideoDialog setDialog={setDialog} />}
        <ActionBtnsWrapper>
          <BrieflyAboutBtn setDialog={setDialog} />
          <div className="dot-buttons-wrapper">
            <GoToAppBtn />
            <TutorialsBtn />
            <GitHubPageBtn />
          </div>
        </ActionBtnsWrapper>
      </ContentWrapper>
      <GitClone />
    </div>
  )
}

export default HeroContainer

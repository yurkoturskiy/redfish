import React, { useState } from 'react'
// Local components
//  * Content
import ContentWrapper from './hero/ContentWrapper'
import VideoDialog from './hero/content/VideoDialog'
import Header from './hero/content/Header'
import Subheader from './hero/content/Subheader'
import Image from './hero/content/Image'
//  ** Action buttons
import ActionBtnsWrapper from './hero/content/ActionBtnsWrapper'
import BrieflyAboutBtn from './hero/content/actionBtns/BrieflyAboutBtn'
import GitHubPageBtn from './hero/content/actionBtns/GitHubPageBtn'
import GoToAppBtn from './hero/content/actionBtns/GoToAppBtn'
import TutorialsBtn from './hero/content/actionBtns/TutorialsBtn'
//  ** Others
import GitClone from './hero/content/GitClone'

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
          <div className="buttons-wrapper">
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

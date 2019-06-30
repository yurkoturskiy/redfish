import React, { useState } from 'react'
import styled from 'styled-components'
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

const HeroContainer = ({ className }) => {
  const [dialog, setDialog] = useState(false)
  return (
    <div className={className}>
      <Image />
      <ContentWrapper>
        <Header />
        <Subheader />

        {dialog && <VideoDialog setDialog={setDialog} />}
        <ActionBtnsWrapper>
          <BrieflyAboutBtn setDialog={setDialog} />
          <div className="buttons">
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

const StyledComp = styled(HeroContainer)`
  position: relative;
  height: 86vh;
  background-color: var(--red-two);
  padding-left: var(--grid-margin);
  padding-right: var(--grid-margin);

  .buttons {
    margin-left: 28px;
  }
`

export default StyledComp

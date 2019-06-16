import React, { useState } from 'react'
import { css } from 'linaria' // eslint-disable-line
// Local components
//  * Content
import ContentWrapper from './hero/ContentWrapper'
import VideoDialog from './hero/content/VideoDialog'
import Header from './hero/content/Header'
import Subheader from './hero/content/Subheader'
//  ** Action buttons
import ActionBtnsWrapper from './hero/content/ActionBtnsWrapper'
import BrieflyAboutBtn from './hero/content/actionBtns/BrieflyAboutBtn'
import GitHubPageBtn from './hero/content/actionBtns/GitHubPageBtn'
import GoToAppBtn from './hero/content/actionBtns/GoToAppBtn'

const container = css`
  position: relative;
  height: 100vh;
  width: 100%;
`

function HeroContainer(props) {
  const [dialog, setDialog] = useState(false)
  return (
    <div className={container}>
      <ContentWrapper>
        <Header />
        <Subheader />
        {dialog && <VideoDialog setDialog={setDialog} />}
        <ActionBtnsWrapper>
          <BrieflyAboutBtn setDialog={setDialog} />
          <GoToAppBtn />
          <GitHubPageBtn />
        </ActionBtnsWrapper>
      </ContentWrapper>
    </div>
  )
}

export default HeroContainer

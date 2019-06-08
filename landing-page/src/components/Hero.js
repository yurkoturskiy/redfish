import React from 'react'
import { css } from 'linaria'
// Local components
//  * Content
import ContentWrapper from './hero/ContentWrapper'
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

function Hero(props) {
  return (
    <div className={container}>
      <ContentWrapper>
        <Header />
        <Subheader />
        <ActionBtnsWrapper>
          <BrieflyAboutBtn />
          <GoToAppBtn />
          <GitHubPageBtn />
        </ActionBtnsWrapper>
      </ContentWrapper>
    </div>
  )
}

export default Hero

import React from 'react'
import { css } from 'linaria'
// Local components
import Layout from '../components/layout'
import SEO from '../components/seo'
import HeroContainer from '../components/HeroContainer'

export const hero = css`
  position: relative;
  height: 100vh;
  width: 100%;
`

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <HeroContainer>
        <div>Go to App</div>
        <div>GitHub page</div>
      </HeroContainer>
      <div className={hero} style={{ background: 'grey' }}>
        <h1>Under the hood</h1>
      </div>
    </Layout>
  )
}

export default IndexPage

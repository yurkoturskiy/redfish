import React from 'react'
import { css } from 'linaria'
// Local components
import HeaderContainer from '../components/header/HeaderContainer'
import Layout from '../components/layout'
import SEO from '../components/seo'
import HeroContainer from '../components/HeroContainer'
import Dependencies from '../components/dependencies/Container'

export const hero = css`
  position: relative;
  height: 100vh;
  width: 100%;
`

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <HeroContainer />
      <Dependencies />
    </Layout>
  )
}

export default IndexPage

import React from 'react'
// Local components
import Layout from '../components/layout'
import SEO from '../components/seo'
import HeroContainer from '../components/HeroContainer'
import Dependencies from '../components/dependencies/Container'
import Tutorials from '../components/tutorials/Container'
import Contribute from '../components/contribute/Container'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <HeroContainer />
      <Dependencies />
      <Tutorials />
      <Contribute />
    </Layout>
  )
}

export default IndexPage

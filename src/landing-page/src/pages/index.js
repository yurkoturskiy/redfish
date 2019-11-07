import React from 'react'
// Local components
import Layout from '../components/layout'
import SEO from '../components/seo'
import HeroContainer from '../components/hero/HeroContainer'
import Dependencies from '../components/dependencies/Container'
import Tutorials from '../components/tutorials/Container'
import Contribute from '../components/contribute/Container'
import FooterConteiner from '../components/footer/Container'

const IndexPage = props => {
  return (
    <Layout path={props.path}>
      <SEO
        title="Home"
        keywords={[
          `redfish`,
          `application`,
          `react`,
          `gatsby`,
          `django`,
          `python`,
          `graphql`,
        ]}
      />
      <HeroContainer />
      <Dependencies />
      <Tutorials />
      <Contribute />
      <FooterConteiner />
    </Layout>
  )
}

export default IndexPage

import React from 'react'

import Layout from '../components/layout'
import Hero from '../components/Hero'
import Image from '../components/image'
import SEO from '../components/seo'

const first = {
  background: 'papayawhip',
}

const second = {
  background: 'grey',
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Hero theme={first}>
      <h1>Boilerplate for your application</h1>
    </Hero>
    <Hero theme={second}>
      <h1>Under the hood</h1>
    </Hero>
  </Layout>
)

export default IndexPage

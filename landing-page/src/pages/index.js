import React, { useState } from 'react'
import { css } from 'linaria'

import Layout from '../components/layout'
import SEO from '../components/seo'

const hero = css`
  position: relative;
  height: 100vh;
  width: 100%;

  h1 {
    position: absolute;
    top: 45%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 1.5em;
    color: palevioletred;
  }
`

const IndexPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  if (token) window.location.replace('http://localhost:3006/')
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={hero} style={{ background: 'papayawhip' }}>
        <h1>Boilerplate for your application</h1>
      </div>
      <div className={hero} style={{ background: 'grey' }}>
        <h1>Under the hood</h1>
      </div>
    </Layout>
  )
}

export default IndexPage

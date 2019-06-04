import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'

import { css } from 'linaria'
import '@material/react-text-field/dist/text-field.css'
import '@material/react-button/dist/button.css'

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=Fira+Sans');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    body {
      font-family: 'Fira Sans', sans-serif;
      margin: 0;
      padding: 0;
    }
  }
`

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <React.Fragment>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>{children}</div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

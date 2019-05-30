import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

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

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>{children}</div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

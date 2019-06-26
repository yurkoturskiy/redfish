import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import HeaderContainer from './header/HeaderContainer'

import { css } from 'linaria' // eslint-disable-line
import '@material/react-text-field/dist/text-field.css'
import '@material/react-button/dist/button.css'
import '@material/react-checkbox/dist/checkbox.css'

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    @import url('https://fonts.googleapis.com/css?family=Fira+Mono&display=swap');

    :root {
      --gutter: 24px;
      --columns: 12;

      @media screen and (max-width: 800px) and (min-width: 415px) {
        --columns: 8;
      }

      @media screen and (max-width: 414px) {
        --columns: 4;
        --gutter: 16px;
      }
    }

    body {
      font-family: 'Roboto', sans-serif;
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
      <HeaderContainer siteTitle={data.site.siteMetadata.title} />
      <div>{children}</div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

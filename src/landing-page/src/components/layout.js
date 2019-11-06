import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import HeaderContainer from './header/HeaderContainer'

// Local styles
import '../styles/global-styles.css'
import '../styles/buttons.css'
import '../styles/tutorials.css'
import '../styles/hero.css'
import '../styles/ui-elements.css'
import '../styles/header.css'
import '../styles/dependencies.css'
import '../styles/contribute.css'
import '../styles/authentication.css'
import '../styles/footer.css'
import '../styles/docs.css'
import '../styles/spinner.css'
// External styles
import '@material/react-text-field/dist/text-field.css'
import '@material/react-button/dist/button.css'
import '@material/react-checkbox/dist/checkbox.css'
import '@material/react-material-icon/dist/material-icon.css'
import '@material/react-fab/dist/fab.css'

function Layout(props) {
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
      <HeaderContainer
        siteTitle={data.site.siteMetadata.title}
        path={props.path}
      />
      <div>{props.children}</div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

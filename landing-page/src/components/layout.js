import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import HeaderContainer from './header/HeaderContainer'

// Local styles
import './@global-styles.css'
import './tutorials/@tutorials.css'
import './hero/@hero.css'
import './styledUIElements/@ui-elements.css'
import './header/@header.css'
import './dependencies/@dependencies.css'
import './contribute/@contribute.css'
import './authentication/@authentication.css'
// External styles
import '@material/react-text-field/dist/text-field.css'
import '@material/react-button/dist/button.css'
import '@material/react-checkbox/dist/checkbox.css'

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

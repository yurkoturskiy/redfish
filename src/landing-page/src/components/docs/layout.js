import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import HeaderContainer from '../header/HeaderContainer'
import SideBar from './sidebar'

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
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
      <div className="docs">
        <SideBar />
        {children}
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

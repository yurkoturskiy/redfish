import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import HeaderContainer from './header/HeaderContainer'

// Local styles
import './@global-styles.css'
import './tutorials/@tutorials.css'
import './hero/@hero2.css'
import './styledUIElements/@ui-elements.css'
import './header/@header.css'
import './dependencies/@dependencies.css'
import './contribute/@contribute.css'
import './authentication/@authentication.css'
import './footer/@footer.css'
import './docs/@docs.css'
// External styles
import '@material/react-text-field/dist/text-field.css'
import '@material/react-button/dist/button.css'
import '@material/react-checkbox/dist/checkbox.css'

function Layout(props) {
  const [opacity, setOpacity] = useState('0')
  useEffect(() => {
    setOpacity('1')
  }, [])
  console.log('opacity', opacity)
  console.log('props', props)
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
      <div className="layout" style={{ opacity: opacity }}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

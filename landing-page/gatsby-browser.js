/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React, { useState, useEffect } from 'react'
import Authentication from './src/components/authentication'

export const wrapRootElement = ({ element }) => {
  console.log('search iframe', window.location.pathname.indexOf('iframe'))
  if (window.location.pathname.indexOf('iframe') === -1) {
    // Behave as usual if pathname is not for iframe
    console.log('authentication')
    return <Authentication>{element}</Authentication>
  } else {
    return <React.Fragment>{element}</React.Fragment>
  }
}

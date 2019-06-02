/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React, { useState, useEffect } from 'react'
import Authentication from './src/components/authentication'

export const wrapRootElement = ({ element }) => {
	return <Authentication>{element}</Authentication>
}

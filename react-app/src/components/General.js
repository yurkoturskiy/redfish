import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const General = props => {
	return (
		<div className={props.className}>
			{props.children}
		</div>
	)
}

export default styled(General)`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: papayawhip;
`;
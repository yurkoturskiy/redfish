import React from 'react'
import styled from 'styled-components'

const Hero = props => {
	return (
		<div className={props.className}>
			{props.children}
		</div>
	)
}

export default styled(Hero)`
  position: relative;
  height: 100vh;
  width: 100%;
  background: papayawhip;
`;
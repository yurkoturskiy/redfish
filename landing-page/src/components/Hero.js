import React from 'react'
import styled from 'styled-components'



const Hero = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background: ${props => props.theme.background};

  h1 {
    position: absolute;
    top: 45%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 1.5em;
    color: palevioletred; 
  }
`

Hero.defaultProps = {
  theme: {
    background: 'papayawhip'
  }
}

export default Hero
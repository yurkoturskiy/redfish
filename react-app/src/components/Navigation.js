import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const Navigation = props => {
  return (
    <nav className={props.className} >
      {props.children}
    </nav>
  )
}

export default styled(Navigation)`
  position: absolute;
  width: 100%;
  height: 100px;
  z-index: 1;

  .elements {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .element {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  .element:hover {
    background-color: #f0f0f0
  }
`;
import React from 'react'
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

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li:hover {
    background-color: #f0f0f0
  }
`
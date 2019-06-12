import React from 'react'
import { css } from 'linaria'
// Local components
import GatsbySVG from './svgs/GatsbySVG'

const container = css`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: lightblue;
`

const card = css`
  width: 384px;
  height: 128px;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
`
const purpose = css`
  display: inline-block;
  font-size: 1, 125rem;
  font-style: normal;
  font-weight: 300;
  color: #555555;
`

const name = css`
  display: inline-block;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  color: #555555;
`

function DependenciesContainer() {
  return (
    <div className={container}>
      <div>
        <h3>ReactJS frontend</h3>
        <div className={card}>
          <GatsbySVG />
          <h4 className={purpose}>Landing page</h4>
          <h2 className={name}>GatsbyJS</h2>
        </div>
        <div className={card}>
          <GatsbySVG />
          <h4 className={purpose}>Queries</h4>
          <h2 className={name}>Apollo GraphQL Client</h2>
        </div>
        <div className={card}>
          <GatsbySVG />
          <h4 className={purpose}>Application</h4>
          <h2 className={name}>Create React App</h2>
        </div>
        <div className={card}>
          <GatsbySVG />
          <h4 className={purpose}>CSS in JS</h4>
          <h2 className={name}>Linaria</h2>
        </div>
        <h3>Django backend</h3>
        <div className={card}>
          <GatsbySVG />
          <h4 className={purpose}>GraphQL Server</h4>
          <h2 className={name}>Graphene-Python</h2>
        </div>
        <div className={card}>
          <GatsbySVG />
          <h4 className={purpose}>Authentication</h4>
          <h2 className={name}>django-rest-auth</h2>
        </div>
      </div>
    </div>
  )
}

export default DependenciesContainer

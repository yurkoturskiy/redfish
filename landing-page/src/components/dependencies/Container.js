import React from 'react'
import { css } from 'linaria'
// Local components
import {
  GatsbyIcon,
  ApolloIcon,
  CreateReactAppIcon,
  LinariaIcon,
  GrapheneIcon,
} from './svgs'

const container = css`
  position: relative;
  margin: 0 auto 0 auto;
  height: 100vh;
  width: 816px;
  background-color: white;
`
const cardsWrapper = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const card = css`
  margin: 12px;
  width: 384px;
  height: 128px;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
`
const text = css`
  display: inline-block;
`
const purpose = css`
  font-size: 1, 125rem;
  font-style: normal;
  font-weight: 300;
  color: #555555;
`

const name = css`
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
        <div className={cardsWrapper}>
          <div className={card}>
            <GatsbyIcon />
            <div className={text}>
              <h4 className={purpose}>Landing page</h4>
              <h2 className={name}>GatsbyJS</h2>
            </div>
          </div>
          <div className={card}>
            <ApolloIcon />
            <div className={text}>
              <h4 className={purpose}>Queries</h4>
              <h2 className={name}>Apollo GraphQL Client</h2>
            </div>
          </div>
          <div className={card}>
            <CreateReactAppIcon />
            <div className={text}>
              <h4 className={purpose}>Application</h4>
              <h2 className={name}>Create React App</h2>
            </div>
          </div>
          <div className={card}>
            <LinariaIcon />
            <div className={text}>
              <h4 className={purpose}>CSS in JS</h4>
              <h2 className={name}>Linaria</h2>
            </div>
          </div>
        </div>
        <h3>Django backend</h3>
        <div className={cardsWrapper}>
          <div className={card}>
            <GrapheneIcon />
            <div className={text}>
              <h4 className={purpose}>GraphQL Server</h4>
              <h2 className={name}>Graphene-Python</h2>
            </div>
          </div>
          <div className={card}>
            <GatsbyIcon />
            <div className={text}>
              <h4 className={purpose}>Authentication</h4>
              <h2 className={name}>django-rest-auth</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DependenciesContainer

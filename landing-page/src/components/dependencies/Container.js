import React from 'react'
import { css } from 'linaria' // eslint-disable-line
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
  width: 856px;
  background-color: white;

  @media screen and (max-width: 900px) and (min-width: 768px) {
    width: 768px;
  }

  @media screen and (max-width: 767px) and (min-width: 500px) {
    width: 100%;
  }
`

const header = css`
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;

  color: #444444;
`

const content = css`
  margin: 20px;

  @media screen and (max-width: 900px) {
    margin: 12px;
  }
`

const section = css`
  margin: 0 0 0 12px;
  padding: 0;

  .bullet {
    display: inline-block;
    margin-left: 4px;
    margin-bottom: 1px;
    height: 12px;
    width: 12px;
    border-radius: 6px;
  }

  h3 {
    display: inline-block;
    margin: 12px 0 0 12px;
    font-weight: 300;
    font-size: 1.25rem;
    line-height: 23px;

    color: #869ba7;
  }

  @media screen and (max-width: 900px) and (min-width: 768px) {
    .bullet {
      height: 10px;
      width: 10px;
    }

    h3 {
      font-size: 18px;
      line-height: 21px;
      margin: 4px 0 0 8px;
    }
  }

  media screen and (max-width: 767px) and (min-width: 500px) {
    .bullet {
      height: 8px;
      width: 8px;
    }

    h3 {
      font-size: 16px;
      line-height: 19px;
      margin: 4px 0 0 6px;
    }
  }
`

const cardsWrapper = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const card = css`
  position: relative;
  margin: 12px;
  width: 384px;
  height: 128px;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 14px;

  @media screen and (max-width: 900px) and (min-width: 768px) {
    width: 348px;
    height: 112px;
  }

  @media screen and (max-width: 767px) and (min-width: 580px) {
    width: calc(50% - 24px);
    height: 88px;
    border-radius: 8px;
  }

  @media screen and (max-width: 579px) and (min-width: 500px) {
    width: calc(50% - 24px);
    height: 68px;
    border-radius: 8px;
  }
`

const icon = css`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 64px;
  height: 64px;

  @media screen and (max-width: 900px) and (min-width: 768px) {
    top: 24px;
    left: 24px;
  }

  @media screen and (max-width: 767px) and (min-width: 580px) {
    height: 48px;
    top: 20px;
    left: 20px;
    width: 48px;
  }

  @media screen and (max-width: 579px) and (min-width: 500px) {
    height: 36px;
    width: 36px;
    top: 16px;
    left: 16px;
  }
`

const purpose = css`
  position: absolute;
  top: 38px;
  left: 112px;
  margin: 0;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  color: #555555;

  @media screen and (max-width: 900px) and (min-width: 768px) {
    top: 34px;
    left: 104px;

    font-size: 14px;
    line-height: 16px;
  }

  @media screen and (max-width: 767px) and (min-width: 580px) {
    top: 24px;
    left: 80px;

    font-size: 12px;
    line-height: 14px;
  }

  @media screen and (max-width: 579px) and (min-width: 500px) {
    top: 18px;
    left: 64px;

    font-size: 12px;
    line-height: 14px;
  }
`

const name = css`
  position: absolute;
  left: 112px;
  bottom: 36px;
  margin: 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  color: #555555;

  @media screen and (max-width: 900px) and (min-width: 768px) {
    bottom: 32px;
    left: 104px;

    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
  }

  @media screen and (max-width: 767px) and (min-width: 580px) {
    bottom: 26px;
    left: 80px;

    font-size: 16px;
    line-height: 19px;
  }

  @media screen and (max-width: 579px) and (min-width: 500px) {
    bottom: 16px;
    left: 64px;

    font-size: 14px;
    line-height: 16px;
  }
`

function DependenciesContainer() {
  return (
    <div className={container}>
      <h2 className={header}>Main dependencies</h2>
      <div className={content}>
        <div className={section}>
          <div className="bullet" style={{ backgroundColor: '#1D79FF' }} />
          <h3>ReactJS frontend</h3>
        </div>
        <div className={cardsWrapper}>
          <div className={card}>
            <GatsbyIcon className={icon} />
            <h4 className={purpose}>Landing page</h4>
            <h2 className={name}>GatsbyJS</h2>
          </div>
          <div className={card}>
            <ApolloIcon className={icon} />
            <h4 className={purpose}>Queries</h4>
            <h2 className={name}>Apollo GraphQL Client</h2>
          </div>
          <div className={card}>
            <CreateReactAppIcon className={icon} />
            <h4 className={purpose}>Application</h4>
            <h2 className={name}>Create React App</h2>
          </div>
          <div className={card}>
            <LinariaIcon className={icon} />
            <h4 className={purpose}>CSS in JS</h4>
            <h2 className={name}>Linaria</h2>
          </div>
        </div>
        <div className={section}>
          <div className="bullet" style={{ backgroundColor: '#1DB355' }} />
          <h3>Django backend</h3>
        </div>
        <div className={cardsWrapper}>
          <div className={card}>
            <GrapheneIcon className={icon} />
            <h4 className={purpose}>GraphQL Server</h4>
            <h2 className={name}>Graphene-Python</h2>
          </div>
          <div className={card}>
            <GatsbyIcon className={icon} />
            <h4 className={purpose}>Authentication</h4>
            <h2 className={name}>django-rest-auth</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DependenciesContainer

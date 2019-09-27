import React from 'react'
// Local components
import {
  GatsbyIcon,
  ApolloIcon,
  CreateReactAppIcon,
  LinariaIcon,
  GrapheneIcon,
} from './icons'
import Background from './Background'
import ReactDepEffect from './ReactDepEffect'
import DjangoDepEffect from './DjangoDepEffect'

function DependenciesContainer() {
  return (
    <div className="dependencies-wrapper">
      <Background />
      <div className="content">
        <div className="section" id="react-section">
          <h3>ReactJS Dependencies</h3>
          <ReactDepEffect />
        </div>
        <div className="cardsWrapper" id="react-cards">
          <a href="https://www.gatsbyjs.org/">
            <div className="card">
              <GatsbyIcon className="icon" />
              <h4 className="purpose">Landing page</h4>
              <h2 className="name">GatsbyJS</h2>
            </div>
          </a>
          <a href="https://www.apollographql.com">
            <div className="card">
              <ApolloIcon className="icon" />
              <h4 className="purpose">Queries</h4>
              <h2 className="name">Apollo GraphQL Client</h2>
            </div>
          </a>
          <a href="https://create-react-app.dev/">
            <div className="card">
              <CreateReactAppIcon className="icon" />
              <h4 className="purpose">Application</h4>
              <h2 className="name">Create React App</h2>
            </div>
          </a>
          <a href="https://github.com/guandjoy/primitivo-svg">
            <div className="card">
              <LinariaIcon className="icon" />
              <h4 className="purpose">SVG effects</h4>
              <h2 className="name">Primitivo-SVG</h2>
            </div>
          </a>
        </div>
        <div className="section" id="django-section">
          <h3>Django Dependencies</h3>
          <DjangoDepEffect />
        </div>
        <div className="cardsWrapper" id="django-cards">
          <a href="https://graphene-python.org/">
            <div className="card">
              <GrapheneIcon className="icon" />
              <h4 className="purpose">GraphQL Server</h4>
              <h2 className="name">Graphene-Python</h2>
            </div>
          </a>
          <a href="https://django-rest-auth.readthedocs.io/en/latest/#">
            <div className="card">
              <GatsbyIcon className="icon" />
              <h4 className="purpose">Authentication</h4>
              <h2 className="name">django-rest-auth</h2>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default DependenciesContainer

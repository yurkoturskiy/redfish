import React from 'react'
// Local components
import {
  GatsbyIcon,
  ApolloIcon,
  CreateReactAppIcon,
  LinariaIcon,
  GrapheneIcon,
} from './icons'

function DependenciesContainer() {
  return (
    <div className="dependencies-wrapper">
      <h2>Main dependencies</h2>
      <div className="content">
        <div className="section">
          <div className="bullet" style={{ backgroundColor: '#1D79FF' }} />
          <h3>ReactJS frontend</h3>
        </div>
        <div className="cardsWrapper">
          <div className="card">
            <GatsbyIcon className="icon" />
            <h4 className="purpose">Landing page</h4>
            <h2 className="name">GatsbyJS</h2>
          </div>
          <div className="card">
            <ApolloIcon className="icon" />
            <h4 className="purpose">Queries</h4>
            <h2 className="name">Apollo GraphQL Client</h2>
          </div>
          <div className="card">
            <CreateReactAppIcon className="icon" />
            <h4 className="purpose">Application</h4>
            <h2 className="name">Create React App</h2>
          </div>
          <div className="card">
            <LinariaIcon className="icon" />
            <h4 className="purpose">CSS in JS</h4>
            <h2 className="name">Linaria</h2>
          </div>
        </div>
        <div className="section">
          <div className="bullet" style={{ backgroundColor: '#1DB355' }} />
          <h3>Django backend</h3>
        </div>
        <div className="cardsWrapper">
          <div className="card">
            <GrapheneIcon className="icon" />
            <h4 className="purpose">GraphQL Server</h4>
            <h2 className="name">Graphene-Python</h2>
          </div>
          <div className="card">
            <GatsbyIcon className="icon" />
            <h4 className="purpose">Authentication</h4>
            <h2 className="name">django-rest-auth</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DependenciesContainer

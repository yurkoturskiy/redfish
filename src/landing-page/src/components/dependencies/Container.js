import React from 'react'
// Local components
import {
  GatsbyIcon,
  ApolloIcon,
  CreateReactAppIcon,
  LinariaIcon,
  GrapheneIcon,
  DjangoRestAuthIcon,
  PrimitivoSVGIcon,
} from './icons'
import StaticBackground from './StaticBackground'
import ReactDepEffect from './ReactDepEffect'
import DjangoDepEffect from './DjangoDepEffect'

function DependenciesContainer() {
  return (
    <div className="dependencies-container">
      <StaticBackground />
      <div className="content">
        <div className="dependencies-header">
          <h3>ReactJS Dependencies</h3>
          <ReactDepEffect />
        </div>
        <a className="card" href="https://www.gatsbyjs.org/">
          <div>
            <GatsbyIcon className="icon" />
            <h4 className="purpose">Landing page</h4>
            <h2 className="name">GatsbyJS</h2>
          </div>
        </a>
        <a className="card" href="https://www.apollographql.com">
          <div>
            <ApolloIcon className="icon" />
            <h4 className="purpose">Queries</h4>
            <h2 className="name">Apollo GraphQL Client</h2>
          </div>
        </a>
        <a className="card" href="https://create-react-app.dev/">
          <div>
            <CreateReactAppIcon className="icon" />
            <h4 className="purpose">Application</h4>
            <h2 className="name">Create React App</h2>
          </div>
        </a>
        <a className="card" href="https://github.com/guandjoy/primitivo-svg">
          <div>
            <PrimitivoSVGIcon className="icon" />
            <h4 className="purpose">SVG effects</h4>
            <h2 className="name">Primitivo-SVG</h2>
          </div>
        </a>
        <div className="dependencies-header">
          <h3>Django Dependencies</h3>
          <DjangoDepEffect />
        </div>
        <a className="card" href="https://graphene-python.org/">
          <div>
            <GrapheneIcon className="icon" />
            <h4 className="purpose">GraphQL Server</h4>
            <h2 className="name">Graphene-Python</h2>
          </div>
        </a>
        <a
          className="card"
          href="https://django-rest-auth.readthedocs.io/en/latest/#"
        >
          <div>
            <DjangoRestAuthIcon className="icon" />
            <h4 className="purpose">Authentication</h4>
            <h2 className="name">django-rest-auth</h2>
          </div>
        </a>
      </div>
    </div>
  )
}

export default DependenciesContainer

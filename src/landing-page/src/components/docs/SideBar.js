import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'

function SectionWrapper({ name, children }) {
  return (
    <div className="section">
      {name && <h2 className="name">{name}</h2>}
      {children}
    </div>
  )
}

export default function SideBar(props) {
  const { allMdx } = useStaticQuery(graphql`
    query SideBarQuery {
      allMdx(
        sort: {
          fields: [frontmatter___sectionOrder, frontmatter___order]
          order: ASC
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              order
              section
              sectionOrder
              unlisted
            }
          }
        }
      }
    }
  `)
  var sections = []
  var independent = []
  allMdx.edges.forEach(edge => {
    const {
      path,
      title,
      section,
      sectionOrder,
      unlisted,
    } = edge.node.frontmatter
    if (!sections[sectionOrder])
      sections[sectionOrder] = { name: section, items: [] }
    let item = (
      <li className="link-wrapper" key={path}>
        <TransitionLink
          className="link"
          activeStyle={{ color: '#33e' }}
          to={edge.node.frontmatter.path}
          exit={{
            length: 0,
          }}
          entry={{
            length: 0,
          }}
        >
          {edge.node.frontmatter.title}
        </TransitionLink>
      </li>
    )
    !unlisted && sections[sectionOrder].items.push(item)
  })
  sections = sections.map(section => (
    <SectionWrapper name={section.name} key={section.name}>
      <ul className="links">{section.items}</ul>
    </SectionWrapper>
  ))
  return (
    <div
      className="sections"
      ref={props.sideBarRef}
      style={{
        display: props.isVisible && 'inline',
        '--sidebar-zindex': props.isVisible ? '6' : '2',
      }}
    >
      {sections}
    </div>
  )
}

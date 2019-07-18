import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

function SectionWrapper({ name, children }) {
  return (
    <div>
      {name && <h2>{name}</h2>}
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
  console.log('data', allMdx)
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
      <Link to={edge.node.frontmatter.path}>
        <p>{edge.node.frontmatter.title}</p>
      </Link>
    )
    !unlisted && sections[sectionOrder].items.push(item)
  })
  sections = sections.map(section => (
    <SectionWrapper name={section.name}>{section.items}</SectionWrapper>
  ))
  return <div>{sections}</div>
}

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function SideBar(props) {
  const { allMdx } = useStaticQuery(graphql`
    query SideBarQuery {
      allMdx(sort: { fields: [frontmatter___order], order: ASC }) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              order
            }
          }
        }
      }
    }
  `)
  console.log('data', allMdx)
  const list = allMdx.edges.map(edge => (
    <Link to={edge.node.frontmatter.path}>
      <p>{edge.node.frontmatter.title}</p>
    </Link>
  ))
  return <div>{list}</div>
}

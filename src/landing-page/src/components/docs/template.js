import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import SideBar from './sidebar'
import Layout from '../layout'

export default function PageTemplate(props) {
  return (
    <Layout path={props.path}>
      <div className="docs">
        <SideBar />
        <div className="content">
          <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      body
    }
  }
`

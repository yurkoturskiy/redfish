import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import SandwichButton from './SandwichButton'
import Menu from './Menu'
import Layout from '../layout'

export default function PageTemplate(props) {
  return (
    <Layout path={props.path}>
      <div className="docs">
        <Menu />
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

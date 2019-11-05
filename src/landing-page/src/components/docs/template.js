import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import SandwichButton from './SandwichButton'
import Menu from './Menu'
import Layout from '../layout'
import TransitionLink from 'gatsby-plugin-transition-link'

export default function PageTemplate(props) {
  return (
    <Layout path={props.path}>
      <div className="docs">
        <Menu />
        <div className="content">
          <MDXProvider components={{ TransitionLink }}>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
          </MDXProvider>
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

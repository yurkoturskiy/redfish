import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import SandwichButton from './SandwichButton'
import Menu from './Menu'
import Layout from '../layout'
import TransitionLink from 'gatsby-plugin-transition-link'
import SEO from '../seo'

export default function PageTemplate(props) {
  return (
    <Layout path={props.path}>
      <SEO
        title="Docs"
        keywords={[
          `redfish`,
          `application`,
          `react`,
          `gatsby`,
          `django`,
          `python`,
          `graphql`,
        ]}
      />
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

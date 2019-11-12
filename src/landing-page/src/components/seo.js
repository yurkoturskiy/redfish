import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import ogImage from '../images/og-1200x630.png'
import twitterImage from '../images/twitter-1200x1200.png'

function SEO({ description, lang, meta, title }) {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          siteUrl
          description
          author
        }
      }
    }
  `)
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = data

  const metaDescription = description || data.site.siteMetadata.description
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          property: `og:url`,
          content: `${process.env.GATSBY_LANDING_URL}`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `${title} | ${data.site.siteMetadata.title}`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `${process.env.GATSBY_LANDING_URL}${ogImage}`,
        },
        {
          property: `og:image:url`,
          content: `${process.env.GATSBY_LANDING_URL}${ogImage}`,
        },
        {
          property: `og:image:secure_url`,
          content: `${process.env.GATSBY_LANDING_URL}${ogImage}`,
        },
        {
          property: `og:image:type`,
          content: `image/png`,
        },
        {
          property: `fb:app_id`,
          content: `432672034191065`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:site`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: `${title} | ${data.site.siteMetadata.title}`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image:src`,
          content: `${process.env.GATSBY_LANDING_URL}${twitterImage}`,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
}

export default SEO

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `Redfish`,
    siteUrl: `https://redfish-project.gq/`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@guandjoy`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-143192738-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/do-not-track/me/too/'],
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'redfish-project.gq',
      },
    },

    {
      resolve: 'gatsby-plugin-guess-js',
      options: {
        // Find the view id in the GA admin in a section labeled "views"
        GAViewID: `197896564`,
        minimumThreshold: 0.03,
        // The "period" for fetching analytic data.
        period: {
          startDate: new Date('2018-1-1'),
          endDate: new Date(),
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: ['100', '300', '400', '500', '700'],
            subsets: ['latin-ext'],
          },
          {
            family: 'Fira Mono',
            variants: ['400'],
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/confirm-email/*`, `/authentication/*`],
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `redfish`,
        short_name: `redfish`,
        start_url: `/`,
        background_color: `#FF4A64`,
        theme_color: `#FF4A64`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `redfish`,
        url: process.env.REDFISH_GRAPHQL_API_URL,
        typeName: `Redfish`,
        refetchInterval: 10,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.redfish-project.gq',
        policy: [{ userAgent: '*', disallow: '/' }],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}

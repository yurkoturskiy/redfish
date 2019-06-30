import React from 'react'
import { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import HeaderContainer from './header/HeaderContainer'

import styled from 'styled-components'
import '@material/react-text-field/dist/text-field.css'
import '@material/react-button/dist/button.css'
import '@material/react-checkbox/dist/checkbox.css'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Fira+Mono&display=swap');

  :root {
    /********/
    /* Grid */
    /********/

    --gutter: 24px;
    --half-gutter: calc(var(--gutter) / 2);
    --grid-margin: 12px;
    --columns: 12;

    --grid-unit: calc(100% / var(--columns));
    --col-one: calc(var(--grid-unit) + var(--half-gutter));
    --col-two: calc(var(--grid-unit) * 2 + var(--half-gutter));
    --col-three: calc(var(--grid-unit) * 3 + var(--half-gutter));
    --col-four: calc(var(--grid-unit) * 4 + var(--half-gutter));
    --col-five: calc(var(--grid-unit) * 5 + var(--half-gutter));
    --col-six: calc(var(--grid-unit) * 6 + var(--half-gutter));
    --col-seven: calc(var(--grid-unit) * 7 + var(--half-gutter));
    --col-eight: calc(var(--grid-unit) * 8 + var(--half-gutter));
    --col-nine: calc(var(--grid-unit) * 9 + var(--half-gutter));
    --col-ten: calc(var(--grid-unit) * 10 + var(--half-gutter));
    --col-eleven: calc(var(--grid-unit) * 11 + var(--half-gutter));
    --col-twelve: calc(var(--grid-unit) * 12 + var(--half-gutter));

    @media screen and (max-width: 800px) and (min-width: 415px) {
      --columns: 8;
    }

    @media screen and (max-width: 414px) {
      --columns: 4;
      --gutter: 16px;
    }

    /**********/
    /* Colors */
    /**********/

    --red: #ff4a64;
    --green: #1db355;
    --blue: #1d79ff;

    --red-two: #ffedeb;
    --green-two: #d0eedb;
    --green-seven: #304538;
    --green-eight: #344239;
    --green-nine: #2b352f;
    --green-ten: #151615;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    color: var(--green-eight);
  }
`

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <React.Fragment>
      <GlobalStyle />
      <HeaderContainer siteTitle={data.site.siteMetadata.title} />
      <div>{children}</div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const subheader = css`
  margin: 28px 0 32px var(--gutter);
  color: var(--green-eight);

  /*******************/
  /* Adapt text size */
  /*******************/

  font-size: 1rem;
  line-height: 21px;
  font-weight: 400;

  @media screen and (max-width: 800px) and (min-width: 415px) {
    font-size: 16px;
    line-height: 19px;
  }

  @media screen and (max-width: 414px) and (min-width: 321px) {
    font-size: 14px;
    line-height: 16px;
  }

  @media screen and (max-width: 320px) {
    font-size: 12px;
    line-height: 14px;
  }

  /*********************/
  /* Adapt text-align */
  /*********************/

  @media screen and (max-width: 540px) {
    text-align: center;
  }
`

function Subheader(props) {
  return <h2 className={subheader}>ReactJS, GraphQL, and Django inside</h2>
}

export default Subheader

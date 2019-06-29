import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const subheader = css`
  margin: 28px 0 32px var(--gutter);

  #blue {
    color: var(--blue);
  }
  #red {
    color: var(--red);
  }

  #green {
    color: var(--green);
  }

  /*******************/
  /* Adapt text size */
  /*******************/

  font-weight: bold;
  font-size: 1.125rem
  line-height: 1.3125rem;

  @media screen and (max-width: 800px) and (min-width: 415px) {
    font-size: 1rem;
    line-height: 1.1875rem;
  }

  @media screen and (max-width: 414px) and (min-width: 321px) {
    font-size: 14px;
    line-height: 0.875rem;
  }

  @media screen and (max-width: 320px) {
    font-size: 0.75rem;
    line-height: 0.875rem;
  }

  /*********************/
  /* Adapt text-align */
  /*********************/

  @media screen and (max-width: 540px) {
    text-align: center;
  }
`

function Subheader(props) {
  return (
    <h2 className={subheader}>
      <span id="blue">ReactJS</span> <span id="red">GraphQL</span>{' '}
      <span id="green">Django</span>
    </h2>
  )
}

export default Subheader

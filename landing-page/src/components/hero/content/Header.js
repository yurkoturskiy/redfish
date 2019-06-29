import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const header = css`
  margin: 0;
  margin-left: var(--gutter);
  margin-right: var(--gutter);
  color: var(--green-eight);

  /*******************/
  /* Adapt text size */
  /*******************/

  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 56px;

  @media screen and (max-width: 800px) and (min-width: 415px) {
    font-size: 2.5rem;
    line-height: 47px;
  }

  @media screen and (max-width: 414px) and (min-width: 321px) {
    font-weight: 500;
    font-size: 1.75rem;
    line-height: 33px;
  }

  @media screen and (max-width: 320px) {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 28px;
  }

  /*********************/
  /* Adapt text-alight */
  /*********************/

  @media screen and (max-width: 540px) {
    text-align: center;
  }

  /************************/
  /* Handle line breaking */
  /************************/

  br {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    br {
      display: block;
    }
  }
`

function Header(props) {
  return <h1 className={header}>Fullstack Boilerplate Web&nbsp;Application</h1>
}

export default Header

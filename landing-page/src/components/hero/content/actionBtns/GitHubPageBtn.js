import React from 'react'
import { css } from 'linaria'

const button = css`
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 12px 12px 12px 12px;
  margin: 0 16px 0 16px;
`

function GitHubPageBtn(props) {
  return <div className={button}>GitHub Page</div>
}

export default GitHubPageBtn

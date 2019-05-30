import React from 'react'
import { css } from 'linaria'

import GitHubLogin from 'react-github-login'

function GitHubAuth(props) {
  const onSuccess = response => console.log(response)
  const onFailure = response => console.log(response)

  return (
    <div style={{ position: 'absolute', top: '200px' }}>
      <GitHubLogin
        clientId="6aee15cdc641688b6f3e"
        onSuccess={onSuccess}
        onFailure={onFailure}
        redirectUri=""
      />
    </div>
  )
}

export default GitHubAuth

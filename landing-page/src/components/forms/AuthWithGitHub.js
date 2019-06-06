// import React from 'react'
// import { css } from 'linaria'

// import GitHubLogin from 'react-github-login'

// function AuthWithGitHub(props) {
//   const onSuccess = response => console.log(response)
//   const onFailure = response => console.log(response)

//   return (
//     <div style={{ position: 'absolute', top: '200px' }}>
//       <GitHubLogin
//         clientId="6aee15cdc641688b6f3e"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         redirectUri=""
//       />
//     </div>
//   )
// }

// export default AuthWithGitHub

import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import GitHubLogin from 'react-github-login'

const AUTH_WITH_GITHUB = gql`
  mutation authWithGithub($code: String!) {
    authWithGithub(input: { code: $code }) {
      key
    }
  }
`

function AuthWithGitHub(props) {
  const [isAuth, setIsAuth] = useState(false)
  const [authWithGitHub, { error, data }] = useMutation(AUTH_WITH_GITHUB)
  const [code, setCode] = useState(undefined)

  useEffect(() => {
    if (code) {
      authWithGitHub({ variables: { code } }).then(response => {
        handleResponse(response)
        console.log(response)
      })
    }
    if (isAuth) {
      window.location.replace(process.env.REDFISH_APP_URL)
    }
  }, [code, isAuth])

  const handleResponse = response => {
    localStorage.setItem('token', response.data.authWithGithub.key)
    setIsAuth(true)
    console.log('Token received and saved')
  }

  const responseGitHub = response => {
    console.log('GitHub response', response)
    setCode(response.code)
  }

  const onFailure = response => {
    console.log('GitHub failure response', response)
  }

  return (
    <div>
      {' '}
      <GitHubLogin
        clientId="6aee15cdc641688b6f3e"
        onSuccess={responseGitHub}
        onFailure={onFailure}
        redirectUri=""
      />
    </div>
  )
}

export default AuthWithGitHub

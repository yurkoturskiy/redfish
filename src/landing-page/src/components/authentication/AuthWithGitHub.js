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
  const [isAuth, setIsAuth] = useState()
  const [code, setCode] = useState()
  const [authWithGitHub] = useMutation(AUTH_WITH_GITHUB)

  useEffect(() => {
    code && sendAuthRequest()
    isAuth && redirectToAppPage()
  }, [code, isAuth])

  const sendAuthRequest = () =>
    authWithGitHub({ variables: { code } }).then(response => {
      handleResponse(response)
      console.log(response)
    })

  const redirectToAppPage = () =>
    window.location.replace(process.env.GATSBY_APP_URL)

  const handleResponse = response => {
    localStorage.setItem('token', response.data.authWithGithub.key)
    setIsAuth(true)
    console.log('Token received and saved')
  }

  const responseGitHub = response => {
    console.log('GitHub response', response)
    setCode(response.code)
  }

  const onFailure = response => console.log('GitHub failure response', response)

  return (
    <div>
      <GitHubLogin
        clientId="6aee15cdc641688b6f3e"
        onSuccess={responseGitHub}
        onFailure={onFailure}
        redirectUri=""
        buttonText={props.children}
        className="github-button"
      />
    </div>
  )
}

export default AuthWithGitHub

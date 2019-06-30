import React, { useState, useEffect } from 'react'
import { css } from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import SocialLogin from 'react-social-login'

const AUTH_WITH_FACEBOOK = gql`
  mutation authWithFacebook($accessToken: String!) {
    authWithFacebook(input: { accessToken: $accessToken }) {
      key
    }
  }
`

const facebookButton = `
  position: relative;
  border: 0px solid white;
  background: #4267b2;
  border-radius: 5px;
  color: white;
  height: 48px;
  text-align: center;
  width: 300px;
  font-size: 1rem;
  display: block;
  margin: 8px auto 8px auto;
`

const Button = ({ children, triggerLogin, ...props }) => (
  <button css={facebookButton} onClick={() => triggerLogin()} {...props}>
    {children}
  </button>
)

const SocialButton = SocialLogin(Button)

function AuthWithFacebook(props) {
  const [isAuth, setIsAuth] = useState(false)
  const [authWithFacebook, { error, data }] = useMutation(AUTH_WITH_FACEBOOK)
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    accessToken && sendAuthenticationRequest()
    isAuth && redirectToAppPage()
  }, [accessToken, isAuth])

  useEffect(() => {
    data && handleResponse()
  }, [data, error])

  const sendAuthenticationRequest = () =>
    authWithFacebook({ variables: { accessToken: accessToken } })

  const redirectToAppPage = () =>
    window.location.replace(process.env.REDFISH_APP_URL)

  const handleResponse = () => {
    console.log(data)
    localStorage.setItem('token', data.authWithFacebook.key)
    setIsAuth(true)
    console.log('Token received and saved')
  }

  const onLoginSuccess = response => {
    console.log(response)
    setAccessToken(response._token.accessToken)
  }

  const onLoginFailure = response => console.log(response)

  return (
    <div>
      <SocialButton
        provider="facebook"
        appId="432672034191065"
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
      >
        {props.children}
      </SocialButton>
      {error &&
        error.graphQLErrors.map(({ message }, i) => <h6 key={i}>{message}</h6>)}
    </div>
  )
}

export default AuthWithFacebook

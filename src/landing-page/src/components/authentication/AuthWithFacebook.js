import React, { useState, useEffect } from 'react'
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

const Button = ({ children, triggerLogin, densed, ...props }) => (
  <button
    className={densed ? 'facebook-button-densed' : 'facebook-button'}
    onClick={() => triggerLogin()}
    {...props}
  >
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
    error && console.log('error', error.graphQLErrors)
    data && handleResponse()
  }, [data, error])

  const sendAuthenticationRequest = () =>
    authWithFacebook({ variables: { accessToken: accessToken } })

  const redirectToAppPage = () =>
    window.location.replace(process.env.GATSBY_APP_URL)

  const handleResponse = () => {
    console.log('facebook server data response', data)
    localStorage.setItem('token', data.authWithFacebook.key)
    setIsAuth(true)
    console.log('Token received and saved')
  }

  const onLoginSuccess = response => {
    console.log('facebook success response', response)
    setAccessToken(response._token.accessToken)
  }

  const onLoginFailure = response =>
    console.log('facebook failure response', response)

  return (
    <div>
      <SocialButton
        provider="facebook"
        appId="432672034191065"
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
        densed={props.densed}
      >
        {props.children}
      </SocialButton>
      {error &&
        error.graphQLErrors.map(({ message }, i) => <h6 key={i}>{message}</h6>)}
    </div>
  )
}

export default AuthWithFacebook

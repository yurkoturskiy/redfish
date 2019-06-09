import React, { useState, useEffect } from 'react'
import { css } from 'linaria'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import SocialLogin from 'react-social-login'
// Images
import icon from '../../images/facebook-oauth-button-icon.svg'

const AUTH_WITH_FACEBOOK = gql`
  mutation authWithFacebook($accessToken: String!) {
    authWithFacebook(input: { accessToken: $accessToken }) {
      key
    }
  }
`
const facebookIcon = css`
  position: absolute;
  width: 32px;
  height: 32px;
  left: 8px;
  top: 8px;
`

const facebookButton = css`
  position: relative;
  border: 0px solid white;
  background: #4267b2;
  border-radius: 5px;
  color: white;
  height: 48px;
  text-align: center;
  width: 300px;
  font-size: 16px;
`

function Icon(props) {
  return <img src={icon} className={facebookIcon} />
}

const Button = ({ children, triggerLogin, ...props }) => (
  <button onClick={() => triggerLogin()} {...props}>
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

  const sendAuthenticationRequest = () =>
    authWithFacebook({ variables: { accessToken: accessToken } }).then(
      response => {
        handleResponse(response)
        console.log(response)
      }
    )

  const redirectToAppPage = () =>
    window.location.replace(process.env.REDFISH_APP_URL)

  const handleResponse = response => {
    localStorage.setItem('token', response.data.authWithFacebook.key)
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
    </div>
  )
}

export default AuthWithFacebook

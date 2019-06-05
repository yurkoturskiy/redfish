import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import FacebookLogin from 'react-facebook-login'

const AUTH_WITH_FACEBOOK = gql`
  mutation authWithFacebook($accessToken: String!) {
    authWithFacebook(input: { accessToken: $accessToken }) {
      key
    }
  }
`

function AuthWithFacebook(props) {
  const [isAuth, setIsAuth] = useState(false)
  const [authWithFacebook, { error, data }] = useMutation(AUTH_WITH_FACEBOOK)
  const [state, setState] = useState({
    isLoggedIn: false,
    userID: undefined,
    name: undefined,
    email: undefined,
    picture: undefined,
    accessToken: undefined,
  })

  useEffect(() => {
    if (state.accessToken) {
      authWithFacebook({ variables: { accessToken: state.accessToken } }).then(
        response => {
          handleResponse(response)
          console.log(response)
        }
      )
    }
    if (isAuth) {
      window.location.replace(process.env.REDFISH_APP_URL)
    }
  }, [state, isAuth])

  const handleResponse = response => {
    localStorage.setItem('token', response.data.authWithFacebook.key)
    setIsAuth(true)
    console.log('Token received and saved')
  }

  const responseFacebook = response => {
    console.log(response)

    setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      accessToken: response.accessToken,
    })
  }

  const componentClicked = () => console.log('clicked')

  let fbContent

  if (state.isLoggedIn) {
    fbContent = (
      <div
        style={{
          width: '400px',
          margin: 'auto',
          background: '#f4f4f4',
          padding: '20px',
        }}
      >
        <img src={state.picture} alt={state.name} />
        <h2>Welcome {state.name}</h2>
        Email: {state.email}
      </div>
    )
  } else {
    fbContent = (
      <FacebookLogin
        appId="432672034191065"
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    )
  }

  return <div>{fbContent}</div>
}

export default AuthWithFacebook

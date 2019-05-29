import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login'

function FacebookAuth() {
  const [state, setState] = useState({
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
    accessToken: '',
  })

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
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    )
  }

  return <div>{fbContent}</div>
}

export default FacebookAuth

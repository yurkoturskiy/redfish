import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Button from '@material/react-button'
// Local components
import StartForm from './StartForm'
import LoginFormContainer from './LoginFormContainer'
import RegistrationFormContainer from './RegistrationFormContainer'
import PasswordResetFormContainer from './PasswordResetFormContainer'
import PasswordResetConfirmFormContainer from './PasswordResetConfirmFormContainer'
import Spinner from '../styledUIElements/Spinner'

const LOCAL_STATE = gql`
  query {
    sending @client
  }
`

function AuthenticationContainer(props) {
  const [route, setRoute] = useState('start')
  const { loading, error, data } = useQuery(LOCAL_STATE)

  var content
  switch (route) {
    case 'start':
      content = <StartForm setRoute={setRoute} />
      break
    case 'login':
      content = <LoginFormContainer setRoute={setRoute} />
      break
    case 'signup':
      content = <RegistrationFormContainer setRoute={setRoute} />
      break
    case 'password-reset':
      content = <PasswordResetFormContainer setRoute={setRoute} />
      break
    case 'password-reset-confirm':
      content = <PasswordResetConfirmFormContainer setRoute={setRoute} />
      break
    default:
      content = <StartForm setRoute={setRoute} />
      break
  }

  const formWrapperStyle = {
    '--authentication-wrapper-pointer-event': data.sending ? 'none' : 'auto',
    '--authentication-wrapper-opacity': data.sending ? '0.2' : '1',
  }

  return (
    <div>
      {data.sending && <Spinner size="middle" />}
      <div className="authentication" style={formWrapperStyle}>
        {props.children || content}
      </div>
    </div>
  )
}

export default AuthenticationContainer

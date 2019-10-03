import React, { useState } from 'react'
import Button from '@material/react-button'
// Local components
import StartForm from './StartForm'
import LoginFormContainer from './LoginFormContainer'
import RegistrationFormContainer from './RegistrationFormContainer'
import PasswordResetFormContainer from './PasswordResetFormContainer'
import PasswordResetConfirmFormContainer from './PasswordResetConfirmFormContainer'

function AuthenticationContainer() {
  const [route, setRoute] = useState('start')

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

  return <div className="authentication">{content}</div>
}

export default AuthenticationContainer

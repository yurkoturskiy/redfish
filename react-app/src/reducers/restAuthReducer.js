import { SubmissionError } from 'redux-form'
// actions
import { REST_AUTH } from '../actions/restAuth'

const initState = () => {
  return {
    isAuth: (localStorage.getItem('token')) ? true : false,
    user: {
      pk: undefined, 
      username: undefined, 
      email: undefined,
      first_name: undefined,
      last_name: undefined,
    },
    uiFreeze: false,
    numRegsSucceed: 0,
    numPassResetSucceed: 0,
    numPassResetConfirmSucceed: 0,
  }
}

const restAuth = (state = initState(), action) => {
  if (action.type.indexOf('REQUEST') !== -1) {
    switch(action.type) {
      case REST_AUTH.REQUEST.LOGOUT:
        localStorage.removeItem('token')
        return initState()
      case REST_AUTH.REQUEST.REGISTRATION:
        state.uiFreeze = true
        return {...state}
      case REST_AUTH.REQUEST.PASSWORD_RESET:
        state.uiFreeze = true
        return {...state}
      case REST_AUTH.REQUEST.PASSWORD_RESET_CONFIRM:
        state.uiFreeze = true
        return {...state}
      default: 
        return state
    }
  }
  if (action.type.indexOf('SUCCESS') !== -1) {
    switch(action.type) {
      case REST_AUTH.SUCCESS.REGISTRATION:
        state.uiFreeze = false
        state.numRegsSucceed += 1
        return {...state}
      case REST_AUTH.SUCCESS.LOGIN:
        localStorage.setItem('token', action.payload.key)
        state.isAuth = true
        return {...state}
      case REST_AUTH.SUCCESS.PASSWORD_RESET:
        state.uiFreeze = false
        state.numPassResetSucceed += 1
        return {...state}
      case REST_AUTH.SUCCESS.PASSWORD_RESET_CONFIRM:
        state.uiFreeze = false
        state.numPassResetConfirmSucceed += 1
        return {...state}
      case REST_AUTH.SUCCESS.USER:
        state.user = action.payload
        return {...state}
      default:
        return state
    }
  } else if (action.type.indexOf('FAILURE') !== -1) {
    switch(action.payload.message) {
      // changing state acording to failure response messages
      case '401 - Unauthorized':
        localStorage.removeItem('token')
        state = initState() 
        break
    }
    switch(action.type) {
      case REST_AUTH.FAILURE.REGISTRATION:
        state.uiFreeze = false
        break
      case REST_AUTH.FAILURE.PASSWORD_RESET:
        state.uiFreeze = false
        break
      case REST_AUTH.FAILURE.PASSWORD_RESET_CONFIRM:
        state.uiFreeze = false
        break
      default:
        return state
    }
    return {...state}
  }
  switch(action.type) {
    case REST_AUTH.VALIDATE:
      if (action.response.payload.status && action.response.payload.status !== 200) {
        if (action.response.payload.response.non_field_errors) {
          action.response.payload.response._error = action.response.payload.response.non_field_errors  
        }
        throw new SubmissionError(action.response.payload.response)
      } else if (action.response.error) {
        throw new SubmissionError({
          _error: 'Something wrong with our server. Please try again.'
        })
      }
      break
    default:
      return state
  }
  return state
}

export default restAuth
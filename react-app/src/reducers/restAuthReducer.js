import { SubmissionError } from 'redux-form'
// actions
import { REST_AUTH } from '../actions/restAuth'
import { RESET_REQUEST_CONDITION } from '../actions/conditions'

const initState = () => ({
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
})

const requestConditionInitState = () => {
  let state = {}
  Object.entries(REST_AUTH.REQUEST).forEach(
    ([key, value]) => {
      state[key] = 0
    }
  )
  return state
}
export const requestCondition = (state = requestConditionInitState(), action) => {
  /* Setting conditions for the REST requests
  Useful for UI freezing and behaviour
  */
  if (action.type === RESET_REQUEST_CONDITION) {
    state[action.payload] = 0
  }
  if (action.type.indexOf('REQUEST') !== -1) {
    Object.entries(state).forEach(
      ([key, value]) => {
        state[key] = (action.type.indexOf(key) !== -1 ? 1 : state[key])
      }
    )
    return {...state}
  } else if (action.type.indexOf('SUCCESS') !== -1) {
    Object.entries(state).forEach(
      ([key, value]) => {
        state[key] = (action.type.indexOf(key) !== -1 ? 2 : state[key])
      }
    )
    return {...state}
  } else if (action.type.indexOf('FAILURE') !== -1) {
    Object.entries(state).forEach(
      ([key, value]) => {
        state[key] = (action.type.indexOf(key) !== -1 ? -1 : state[key])
      }
    )
    return {...state}
  }
  return state
}

export const restAuth = (state = initState(), action) => {
  if (action.type.indexOf('REQUEST') !== -1) {
    switch(action.type) {
      case REST_AUTH.REQUEST.LOGOUT:
        localStorage.removeItem('token')
        return initState()
      default: 
        return state
    }
  } else if (action.type.indexOf('SUCCESS') !== -1) {
    switch(action.type) {
      case REST_AUTH.SUCCESS.LOGIN:
        localStorage.setItem('token', action.payload.key)
        state.isAuth = true
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
    return {...state}
  }
  if (action.type === REST_AUTH.VALIDATE) {
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
    return state
  }
  return state
}
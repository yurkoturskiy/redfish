// actions
import { REST_AUTH } from '../actions/restAuth'
import { SHOW_HIDE_PASSWORD } from '../actions/ui'

const initState = () => {
  return {
    showPassState: false,
    passwordValidation: {
      feedback: {
        suggestions: [],
        warning: "",
      },
      score: undefined,
    },
  }
}

const ui = (state = initState(), action) => {
  switch(action.type) {
    case SHOW_HIDE_PASSWORD:
      state.showPassState = state.showPassState === false ? true : false
      return {...state}
    case REST_AUTH.PASSWORD_VALIDATE:
      state.passwordValidation.feedback = action.payload.feedback
      console.log(action.payload.password)
      state.passwordValidation.score = (
        (action.payload.score === 0 && 'too guessable') ||
        (action.payload.score === 1 && 'very guessable') ||
        (action.payload.score === 2 && 'somewhat guessable') ||
        (action.payload.score === 3 && 'safely unguessable') ||
        (action.payload.score === 4 && 'very unguessable')
      )
      state.passwordValidation.score = (
        action.payload.password === "" ? undefined : state.passwordValidation.score)
      return {...state}
    default:
      return state
  }
}

export default ui
// actions
import { PASSWORD_FIELD_VALIDATE } from '../actions/restAuth'
import { SWITCH_PASSWORD_VISIBILITY } from '../actions/conditions'

const initState = () => {
  return {
    passwordVisibilityCondition: false,
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
    case SWITCH_PASSWORD_VISIBILITY:
      state.passwordVisibilityCondition = state.passwordVisibilityCondition ? false : true
      return {...state}
    case PASSWORD_FIELD_VALIDATE:
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
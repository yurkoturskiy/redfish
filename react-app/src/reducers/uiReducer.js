import { SHOW_HIDE_PASSWORD } from '../actions/ui'


const initState = () => {
  return {
    showPassState: false,
  }
}

const ui = (state = initState(), action) => {
  switch(action.type) {
    case SHOW_HIDE_PASSWORD:
      state.showPassState = state.showPassState === false ? true : false
      return {...state}
    default:
      return state
  }
}

export default ui
// actions
import {
  SNIPPETS_SUCCESS,
} from '../actions/snippets'

const initState = () => {
  return {
    snippets: 'none', 
  }  
}

const snippets = (state = initState(), action) => {
  switch(action.type) {
    case SNIPPETS_SUCCESS:
      var data = JSON.stringify(action.payload.results)
      state.snippets = data
      return {...state}
    default:
      return state
  }
}

export default snippets
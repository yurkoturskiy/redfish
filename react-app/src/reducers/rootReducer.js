import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import snippets from './snippetsReducer'
import restAuth from './restAuthReducer'

const rootReducer = combineReducers({
  snippets,
  restAuth,
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})

export default rootReducer
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// reducers
import snippets from './snippetsReducer'
import {restAuth, requestCondition} from './restAuthReducer'
import ui from './uiReducer'

const rootReducer = combineReducers({
  snippets,
  restAuth,
  requestCondition,
  ui,
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})

export default rootReducer
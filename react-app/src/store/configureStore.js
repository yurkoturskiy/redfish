import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import { apiMiddleware } from 'redux-api-middleware'

const store = createStore(rootReducer, applyMiddleware(apiMiddleware, createLogger()))

export default store
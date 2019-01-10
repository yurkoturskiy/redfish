import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import { apiMiddleware } from 'redux-api-middleware'
import passValidation from '../middleware/passValidation'

const store = createStore(
	rootReducer, 
	applyMiddleware(
		passValidation, 
		apiMiddleware, 
		createLogger(),
	)
)

export default store
import rootReducer from './rootReducer'

import {
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	USER_REQUEST, 
	USER_SUCCESS, 
	USER_FAILURE,
} from '../actions/restAuth'
const initState = {
	isAuth: (localStorage.getItem('token')) ? true : false,
	user: {
		pk: undefined, 
		username: undefined, 
		email: undefined,
		first_name: undefined,
		last_name: undefined,
	},
}
const emptyState = initState

const checkAuth = (state) => {
	if (state.isAuth === false) {
		state.isAuth = true
		return state
	}
}

const restAuth = (state = initState, action) => {
	if (action.type.indexOf('SUCCESS') !== -1) {
		switch(action.type) {
			case LOGIN_SUCCESS:
				localStorage.setItem('token', action.payload.key)
				state.isAuth = true
				return {...state}
			case LOGOUT_SUCCESS:
				localStorage.removeItem('token')
				state = emptyState
				state.isAuth = false
				return {...emptyState}
			case USER_SUCCESS:
				state.user = action.payload
				return {...state}
		}
		return state
	} else if (action.type.indexOf('FAILURE') !== -1) {
		if (action.payload.message == '401 - Unauthorized') {
			state.isAuth = false
			localStorage.removeItem('token')
			return {...state}
		}
	}
	return state
}

export default restAuth
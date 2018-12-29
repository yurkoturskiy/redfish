import rootReducer from './rootReducer'

import {
	REGISTRATION_REQUEST,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
	LOGIN_SUCCESS,
	PASSWORD_RESET_REQUEST,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAILURE,
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
	uiFreeze: false,
	// passResetRequesting: false,
	// regRequesting: false,
	numPassResetSucceed: 0,
	numRegsSucceed: 0,
}
const emptyState = initState

const checkAuth = (state) => {
	if (state.isAuth === false) {
		state.isAuth = true
		return state
	}
}

const restAuth = (state = initState, action) => {
	if (action.type.indexOf('REQUEST') !== -1) {
		switch(action.type) {
			case REGISTRATION_REQUEST:
				state.uiFreeze = true
				return {...state}
			case PASSWORD_RESET_REQUEST:
				state.uiFreeze = true
				return {...state}
		}
	}
	if (action.type.indexOf('SUCCESS') !== -1) {
		switch(action.type) {
			case REGISTRATION_SUCCESS:
				state.uiFreeze = false
				state.numRegsSucceed += 1
				return {...state}
			case LOGIN_SUCCESS:
				localStorage.setItem('token', action.payload.key)
				state.isAuth = true
				return {...state}
			case PASSWORD_RESET_SUCCESS:
				state.uiFreeze = false
				state.numPassResetSucceed += 1
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
		}
		switch(action.type) {
			case REGISTRATION_FAILURE:
				state.uiFreeze = false
				return {...state}
			case PASSWORD_RESET_FAILURE:
				state.uiFreeze = false
				return {...state}
		}

		return {...state}
	}
	return state
}

export default restAuth
import rootReducer from './rootReducer'

import {
	REGISTRATION_REQUEST,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
	LOGIN_SUCCESS,
	PASSWORD_RESET_REQUEST,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAILURE,
	PASSWORD_RESET_CONFIRM_REQUEST,
	PASSWORD_RESET_CONFIRM_SUCCESS,
	PASSWORD_RESET_CONFIRM_FAILURE,
	LOGOUT_SUCCESS,
	LOGOUT_REQUEST,
	USER_REQUEST, 
	USER_SUCCESS, 
	USER_FAILURE,
} from '../actions/restAuth'


const initState = () => {
	return {
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
		numRegsSucceed: 0,
		numPassResetSucceed: 0,
		numPassResetConfirmSucceed: 0,
	}
}

const restAuth = (state = initState(), action) => {
	if (action.type.indexOf('REQUEST') !== -1) {
		switch(action.type) {
			case LOGOUT_REQUEST:
				localStorage.removeItem('token')
				return initState()
			case REGISTRATION_REQUEST:
				state.uiFreeze = true
				return {...state}
			case PASSWORD_RESET_REQUEST:
				state.uiFreeze = true
				return {...state}
			case PASSWORD_RESET_CONFIRM_REQUEST:
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
			case PASSWORD_RESET_CONFIRM_SUCCESS:
				state.uiFreeze = false
				state.numPassResetConfirmSucceed += 1
				return {...state}
			case USER_SUCCESS:
				state.user = action.payload
				return {...state}
		}
		return state
	} else if (action.type.indexOf('FAILURE') !== -1) {
		switch(action.payload.message) {
			// changing state acording to failure response messages
			case '401 - Unauthorized':
				localStorage.removeItem('token')
				state = initState()	
				break
		}
		switch(action.type) {
			case REGISTRATION_FAILURE:
				state.uiFreeze = false
				break
			case PASSWORD_RESET_FAILURE:
				state.uiFreeze = false
				break
			case PASSWORD_RESET_CONFIRM_FAILURE:
				state.uiFreeze = false
				break
		}
		return {...state}
	}
	return state
}

export default restAuth
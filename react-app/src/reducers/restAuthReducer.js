import rootReducer from './rootReducer'


import {REST_AUTH} from '../actions/restAuth'


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
			case REST_AUTH.REQUEST.LOGOUT:
				localStorage.removeItem('token')
				return initState()
			case REST_AUTH.REQUEST.REGISTRATION:
				state.uiFreeze = true
				return {...state}
			case REST_AUTH.REQUEST.PASSWORD_RESET:
				state.uiFreeze = true
				return {...state}
			case REST_AUTH.REQUEST.PASSWORD_RESET_CONFIRM:
				state.uiFreeze = true
				return {...state}
		}
	}
	if (action.type.indexOf('SUCCESS') !== -1) {
		switch(action.type) {
			case REST_AUTH.SUCCESS.REGISTRATION:
				state.uiFreeze = false
				state.numRegsSucceed += 1
				return {...state}
			case REST_AUTH.SUCCESS.LOGIN:
				localStorage.setItem('token', action.payload.key)
				state.isAuth = true
				return {...state}
			case REST_AUTH.SUCCESS.PASSWORD_RESET:
				state.uiFreeze = false
				state.numPassResetSucceed += 1
				return {...state}
			case REST_AUTH.SUCCESS.PASSWORD_RESET_CONFIRM:
				state.uiFreeze = false
				state.numPassResetConfirmSucceed += 1
				return {...state}
			case REST_AUTH.SUCCESS.USER:
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
			case REST_AUTH.FAILURE.REGISTRATION:
				state.uiFreeze = false
				break
			case REST_AUTH.FAILURE.PASSWORD_RESET:
				state.uiFreeze = false
				break
			case REST_AUTH.FAILURE.PASSWORD_RESET_CONFIRM:
				state.uiFreeze = false
				break
		}
		return {...state}
	}
	return state
}

export default restAuth
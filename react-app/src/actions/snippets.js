import { RSAA } from 'redux-api-middleware'

const url = 'http://127.0.0.1:9000/'


export const LOGIN_REQUEST = '@@login/LOGIN_REQUEST'
export const LOGIN_SUCCESS = '@@login/LOGIN_SUCCESS'
export const LOGIN_FAILURE = '@@login/LOGIN_FAILURE'
export const login = (values) => ({
	[RSAA]: {
		endpoint: url + 'rest-auth/login/',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(values),
		types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
	}
})


export const LOGOUT_REQUEST = '@@logout/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = '@@logout/LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = '@@logout/LOGOUT_FAILURE'
export const logout = () => ({
	[RSAA]: {
		endpoint: url + 'rest-auth/logout/',
		method: 'POST',
	    headers: { 
	    	'Content-Type': 'application/json',
	    	'Authorization': 'Token ' + localStorage.getItem('token')
	    },
		types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
	}
})

export const REGISTRATION_REQUEST = '@@registration/REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = '@@registration/REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = '@@registration/REGISTRATION_FAILURE'
export const registration = (values) => ({
	[RSAA]: {
		endpoint: url + 'rest-auth/registration/',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(values),
		types: [REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILURE],
	}
})

export const PASSWORD_RESET_REQUEST = '@@password_reset/PASSWORD_RESET_REQUEST'
export const PASSWORD_RESET_SUCCESS = '@@password_reset/PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_FAILURE = '@@password_reset/PASSWORD_RESET_FAILURE'
export const passwordReset = (email) => ({
	[RSAA]: {
		endpoint: url + 'rest-auth/password/reset/',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(email),
		types: [PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE],
	}
})

export const PASSWORD_RESET_CONFIRM_REQUEST = '@@password_reset_confirm/PASSWORD_RESET_CONFIRM_REQUEST'
export const PASSWORD_RESET_CONFIRM_SUCCESS = '@@password_reset_confirm/PASSWORD_RESET_CONFIRM_SUCCESS'
export const PASSWORD_RESET_CONFIRM_FAILURE = '@@password_reset_confirm/PASSWORD_RESET_CONFIRM_FAILURE'
export const passwordResetConfirm = (values) => ({
	[RSAA]: {
		endpoint: url + 'rest-auth/password/reset/confirm/',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(values),
		types: [
			PASSWORD_RESET_CONFIRM_REQUEST, 
			PASSWORD_RESET_CONFIRM_SUCCESS, 
			PASSWORD_RESET_CONFIRM_FAILURE
		],
	}
})

export const USER_REQUEST = '@@user/USER_REQUEST'
export const USER_SUCCESS = '@@user/USER_SUCCESS'
export const USER_FAILURE = '@@user/USER_FAILURE'
export const users = payload => ({
  [RSAA]: {
    endpoint: url + 'rest/users/',
    method: 'GET',
    headers: { 
    	'Content-Type': 'application/json',
    	'Authorization': 'Token ' + localStorage.getItem('token')
    },
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE]
  }
})


export const SNIPPETS_REQUEST = '@@snippets/SNIPPETS_REQUEST'
export const SNIPPETS_SUCCESS = '@@snippets/SNIPPETS_SUCCESS'
export const SNIPPETS_FAILURE = '@@snippets/SNIPPETS_FAILURE'
export const snippets = payload => ({
  [RSAA]: {
    endpoint: url + 'rest/snippets/',
    method: 'GET',
    types: [SNIPPETS_REQUEST, SNIPPETS_SUCCESS, SNIPPETS_FAILURE]
  }
})
import {
	LOGIN_SUCCESS,
	USER_REQUEST, 
	USER_SUCCESS, 
	USER_FAILURE,
	SNIPPETS_REQUEST,
	SNIPPETS_SUCCESS,
	SNIPPETS_FAILURE} from '../actions/snippets'

const initState = {
	token: 'none',
	snippets: 'none',
	users: 'none',
}

const snippets = (state = initState, action) => {
	switch(action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.key);
			state.token = action.payload.key
			return {...state}
		case SNIPPETS_SUCCESS:
			console.log('IT WORKS!!!')
			console.log(action.payload.results)
			var data = JSON.stringify(action.payload.results)
			// state.snippets = data
			state.snippets = data
			return {...state}
		case USER_SUCCESS:
			var data = JSON.stringify(action.payload.results)
			state.users = data
			return {...state}
		default:
			return state
	}
}

export default snippets
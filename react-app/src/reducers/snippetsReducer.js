import {
	SNIPPETS_REQUEST,
	SNIPPETS_SUCCESS,
	SNIPPETS_FAILURE} from '../actions/snippets'

const initState = {
	snippets: 'none',
}

const snippets = (state = initState, action) => {
	switch(action.type) {
		
		case SNIPPETS_SUCCESS:
			console.log('IT WORKS!!!')
			console.log(action.payload.results)
			var data = JSON.stringify(action.payload.results)
			// state.snippets = data
			state.snippets = data
			return {...state}
		default:
			return state
	}
}

export default snippets
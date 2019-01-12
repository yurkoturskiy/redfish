export const RESET_REQUEST_CONDITION = 'RESET_REQUESTS_CONDITION'
export const resetRequestCondition = (payload) => ({
	type: RESET_REQUEST_CONDITION,
	payload,
})

export const SWITCH_PASSWORD_VISIBILITY = 'SWITCH_PASSWORD_VISIBILITY'
export const switchPasswordVisibility = () => ({
	type: SWITCH_PASSWORD_VISIBILITY,
})
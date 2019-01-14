import zxcvbn from 'zxcvbn'
import { PASSWORD_FIELD_VALIDATE } from '../actions/restAuth'

const passValidation = store => next => action => {
  switch (action.type) {
    case PASSWORD_FIELD_VALIDATE:
      const password = action.payload.target.value
      const evaluate = zxcvbn(password)
      action.payload = evaluate
      return next(action)
    default:
      return next(action)
  }
}

export default passValidation
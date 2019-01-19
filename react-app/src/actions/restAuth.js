import { RSAA } from 'redux-api-middleware'

const URL = 'http://localhost:9000/'

export const restApiAction = ({
  endpoint,
  method, 
  types,
  values,
  isPrivate,
}) => ({
  [RSAA]: {
    endpoint: URL + endpoint,
    method: method,
    headers: (
      isPrivate ? {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
      } : {
        'Content-Type': 'application/json',
      }
    ),
    body: JSON.stringify(values),
    types: types,
  }
})


export const LOGIN_REQUEST = '@@rest_auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = '@@rest_auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = '@@rest_auth/LOGIN_FAILURE'
export const login = (values) => (
  restApiAction({
    endpoint: 'rest-auth/login/',
    method: 'POST',
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    values: values,
  })
)


export const LOGOUT_REQUEST = '@@rest_auth/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = '@@rest_auth/LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = '@@rest_auth/LOGOUT_FAILURE'
export const logout = () => (
  restApiAction({
    endpoint: 'rest-auth/logout/',
    method: 'POST',
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    isPrivate: true,
  })
)


export const REGISTRATION_REQUEST = '@@rest_auth/REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = '@@rest_auth/REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = '@@rest_auth/REGISTRATION_FAILURE'
export const registration = (values) => (
  restApiAction({
    endpoint: 'rest-auth/registration/',
    method: 'POST',
    types: [REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILURE],
    values: values,
  })
)


export const VERIFY_EMAIL_REQUEST = '@@rest_auth/VERIFY_EMAIL_REQUEST'
export const VERIFY_EMAIL_SUCCESS = '@@rest_auth/VERIFY_EMAIL_SUCCESS'
export const VERIFY_EMAIL_FAILURE = '@@rest_auth/VERIFY_EMAIL_FAILURE'
export const verifyEmail = (values) => (
  restApiAction({
    endpoint: 'rest-auth/registration/verify-email/',
    method: 'POST',
    types: [VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE],
    values: values,
  })
)


export const PASSWORD_RESET_REQUEST = '@@rest_auth/PASSWORD_RESET_REQUEST'
export const PASSWORD_RESET_SUCCESS = '@@rest_auth/PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_FAILURE = '@@rest_auth/PASSWORD_RESET_FAILURE'
export const passwordReset = (values) => (
  restApiAction({
    endpoint: 'rest-auth/password/reset/',
    method: 'POST',
    types: [PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE],
    values: values,
  })
)


export const PASSWORD_RESET_CONFIRM_REQUEST = '@@rest_auth/PASSWORD_RESET_CONFIRM_REQUEST'
export const PASSWORD_RESET_CONFIRM_SUCCESS = '@@rest_auth/PASSWORD_RESET_CONFIRM_SUCCESS'
export const PASSWORD_RESET_CONFIRM_FAILURE = '@@rest_auth/PASSWORD_RESET_CONFIRM_FAILURE'
export const passwordResetConfirm = (values) => (
  restApiAction({
    endpoint:'rest-auth/password/reset/confirm/',
    method:'POST',
    types: [
      PASSWORD_RESET_CONFIRM_REQUEST,
      PASSWORD_RESET_CONFIRM_SUCCESS,
      PASSWORD_RESET_CONFIRM_FAILURE,
    ],
    values: values,
  })
) 


export const USER_REQUEST = '@@rest_auth/USER_REQUEST'
export const USER_SUCCESS = '@@rest_auth/USER_SUCCESS'
export const USER_FAILURE = '@@rest_auth/USER_FAILURE'
export const user = () => (
  restApiAction({
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    endpoint: 'rest-auth/user/',
    method: 'GET',
    isPrivate: true,
  })
) 


export const VALIDATE_FORM_RESPONSE = '@@redux_form/VALIDATE_FORM_RESPONSE'
export const validateFormResponse = (response, values) => ({
  type: VALIDATE_FORM_RESPONSE,
  values,
  response,
})


export const PASSWORD_FIELD_VALIDATE = '@@zxcvbn/PASSWORD_FIELD_VALIDATE'
export const passValidate = (payload) => ({
  type: PASSWORD_FIELD_VALIDATE,
  payload,
})
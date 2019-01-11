import { RSAA } from 'redux-api-middleware'

const url = 'http://127.0.0.1:9000/'

export const REST_AUTH = {
  REQUEST: {
    LOGIN: '@@login/LOGIN_REQUEST',
    LOGOUT: '@@logout/LOGOUT_REQUEST',
    REGISTRATION: '@@registration/REGISTRATION_REQUEST',
    CONFIRM_EMAIL: '@@confirm_email/CONFIRM_EMAIL_REQUEST',
    PASSWORD_RESET: '@@password_reset/PASSWORD_RESET_REQUEST',
    PASSWORD_RESET_CONFIRM: '@@password_reset_confirm/PASSWORD_RESET_CONFIRM_REQUEST',
    USER: '@@user/USER_REQUEST',
  },
  SUCCESS: {
    LOGIN: '@@login/LOGIN_SUCCESS',
    LOGOUT: '@@logout/LOGOUT_SUCCESS',
    REGISTRATION: '@@registration/REGISTRATION_SUCCESS',
    CONFIRM_EMAIL: '@@confirm_email/CONFIRM_EMAIL_SUCCESS',
    PASSWORD_RESET: '@@password_reset/PASSWORD_RESET_SUCCESS',
    PASSWORD_RESET_CONFIRM: '@@password_reset_confirm/PASSWORD_RESET_CONFIRM_SUCCESS',
    USER: '@@user/USER_SUCCESS',
  },
  FAILURE: {
    LOGIN: '@@login/LOGIN_FAILURE',
    LOGOUT: '@@logout/LOGOUT_FAILURE',
    REGISTRATION: '@@registration/REGISTRATION_FAILURE',
    CONFIRM_EMAIL: '@@confirm_email/CONFIRM_EMAIL_FAILURE',
    PASSWORD_RESET: '@@password_reset/PASSWORD_RESET_FAILURE',
    PASSWORD_RESET_CONFIRM: '@@password_reset_confirm/PASSWORD_RESET_CONFIRM_FAILURE',
    USER: '@@user/USER_FAILURE',
  },
  VALIDATE: '@@validate/RESPONSE_VALIDATE',
  PASSWORD_VALIDATE: '@@password_validate/PASSWORD_VALIDATE'
}


export const login = (values) => ({
  [RSAA]: {
    endpoint: url + 'rest-auth/login/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      REST_AUTH.REQUEST.LOGIN,
      REST_AUTH.SUCCESS.LOGIN,
      REST_AUTH.FAILURE.LOGIN,
    ],
  }
})

export const logout = () => ({
  [RSAA]: {
    endpoint: url + 'rest-auth/logout/',
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    },
    types: [
      REST_AUTH.REQUEST.LOGOUT,
      REST_AUTH.SUCCESS.LOGOUT,
      REST_AUTH.FAILURE.LOGOUT,
    ],
  }
})

export const registration = (values) => ({
  [RSAA]: {
    endpoint: url + 'rest-auth/registration/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      REST_AUTH.REQUEST.REGISTRATION,
      REST_AUTH.SUCCESS.REGISTRATION,
      REST_AUTH.FAILURE.REGISTRATION,
    ],
  }
})

export const confirmEmail = (values) => ({
  [RSAA]: {
    endpoint: url + 'rest-auth/registration/verify-email/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      REST_AUTH.REQUEST.REGISTRATION,
      REST_AUTH.SUCCESS.REGISTRATION,
      REST_AUTH.FAILURE.REGISTRATION,
    ],
  }
})

export const passwordReset = (email) => ({
  [RSAA]: {
    endpoint: url + 'rest-auth/password/reset/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
    types: [
      REST_AUTH.REQUEST.PASSWORD_RESET,
      REST_AUTH.SUCCESS.PASSWORD_RESET,
      REST_AUTH.FAILURE.PASSWORD_RESET,
    ],
  }
})

export const passwordResetConfirm = (values) => ({
  [RSAA]: {
    endpoint: url + 'rest-auth/password/reset/confirm/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      REST_AUTH.REQUEST.PASSWORD_RESET_CONFIRM,
      REST_AUTH.SUCCESS.PASSWORD_RESET_CONFIRM,
      REST_AUTH.FAILURE.PASSWORD_RESET_CONFIRM,
    ],
  }
})

export const user = payload => ({
  [RSAA]: {
    endpoint: url + 'rest-auth/user/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    },
    types: [
      REST_AUTH.REQUEST.USER,
      REST_AUTH.SUCCESS.USER,
      REST_AUTH.FAILURE.USER,
    ],
  }
})

export const validate = (response, values) => ({
  type: REST_AUTH.VALIDATE,
  values,
  response,
})

export const passValidate = (payload) => ({
  type: REST_AUTH.PASSWORD_VALIDATE,
  payload,
})
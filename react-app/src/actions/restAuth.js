import { RSAA } from 'redux-api-middleware'

const URL = 'http://127.0.0.1:9000/'


class Endpoint {
  constructor(name, endpoint, method, authIsRequired) {
    this.name = name
    this.endpoint = URL + endpoint
    this.method = method
    this.authIsRequired = authIsRequired
    this.types = {
      request: '@@' + this.name + '/' + this.name.toUpperCase() + '_REQUEST',
      success: '@@' + this.name + '/' + this.name.toUpperCase() + '_SUCCESS',
      failure: '@@' + this.name + '/' + this.name.toUpperCase() + '_FAILURE',
    }
  }
  __call__(values=undefined) {
    return {
      [RSAA]: {
        endpoint: this.dispatch.endpoint,
        method: this.dispatch.method,
        headers: (
          this.dispatch.authIsRequired ? {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token'),
          } : {
            'Content-Type': 'application/json',
          }
        ),
        body: JSON.stringify(values),
        types: [
          this.dispatch.types.request, 
          this.dispatch.types.success, 
          this.dispatch.types.failure,
        ],
      }  
    }
    
  }
}

var ObjectCallable_handler = {
    get: function get(self, key) {
        if (self.hasOwnProperty(key)) {
            return self[key];
        } else { 
          return self.dispatch[key]; 
        }
    },
    apply: function apply(self, thisValue, args) {
        return (self.__call__ || self.dispatch.__call__).apply(self, args);
    }
};

function Action(...args) {
    var cls = new Endpoint(...args)
    var p = new Proxy(function() { }, ObjectCallable_handler);
    p.dispatch = cls;
    return p;
}


export var login = Action('login', 'rest-auth/login/', 'POST', false)
export var logout = Action('logout', 'rest-auth/logout/', 'POST', true)
export var registration = Action('registration', 'rest-auth/registration/', 'POST', false)
export var verifyEmail = Action('verifyEmail', 'rest-auth/registration/verify-email/', 'POST', false)
export var passwordReset = Action('passwordReset', 'rest-auth/password/reset/', 'POST', false)
export var passwordResetConfirm = Action('passwordResetConfirm', 'rest-auth/password/reset/confirm/', 'POST', false)
export var user = Action('user', 'rest-auth/user/', 'GET', true)


export const REST_AUTH = {
  VALIDATE: '@@validate/RESPONSE_VALIDATE',
  PASSWORD_VALIDATE: '@@password_validate/PASSWORD_VALIDATE'
}

export const validate = (response, values) => ({
  type: REST_AUTH.VALIDATE,
  values,
  response,
})

export const passValidate = (payload) => ({
  type: REST_AUTH.PASSWORD_VALIDATE,
  payload,
})
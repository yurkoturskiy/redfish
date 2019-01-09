import { RSAA } from 'redux-api-middleware'

const url = 'http://127.0.0.1:9000/'

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
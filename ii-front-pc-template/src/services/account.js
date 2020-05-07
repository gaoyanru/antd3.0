import request from 'ii-utils/request'

export const fetchAccountInfo = ({ token = '' }) => request.get('/login/account', { token }, {
  baseURL: __SAAS_API_PREFIX__
})

export const exitAccount = ({ token }) => request.post('/login/expire', { }, {
  baseURL: __SAAS_API_PREFIX__,
  params: { token }
})

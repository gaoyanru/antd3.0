import axios from 'axios'
import Cookies from 'js-cookie'
import R_Pipe from 'ramda/es/pipe'
import R_Path from 'ramda/es/path'
import _log from './log'

const log = _log.tag('request')

const baseURL = typeof __API_PREFIX__ === 'undefined' ? '' : __API_PREFIX__

const defaultConfig = {
  baseURL,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
    'token': Cookies.get('oauth_token')
  },
  timeout: 10000,
}

const createInstance = config => {
  return axios.create(config)
}

// // 创建一个默认的axios实例
const instance = createInstance(defaultConfig)

// 打印请求信息
const logBeforeRequest = requestConfig => {
  const { method, url } = requestConfig
  log(`${method} ${instance.defaults.baseURL + url} begin`)
  return requestConfig
}

// 检测http状态码
const checkHttpStatus = response => {

  if (response.status !== 200) {
    const err = new Error(`http status is ${response.status}`)
    err.httpStatus = response.status
    err.msg = '网络请求出错'
    throw err
  }

  return response
}

// 检查返回的数据中的code码
const checkDataCode = data => {
  if (Number(data.code) === 200) {
    log('warning=warning============返回的code码为200, 需要统一为0==========warning=warning')
  }
  if (Number(data.code) !== 0 && Number(data.code) !== 200) {
    const err = new Error(`code is not 0, response.data is ${JSON.stringify(data)}`)

    err.code = data.code
    err.msg = data.message || data.msg // 使用msg字段，message字段会覆盖上面的错误信息
    throw err
  }
  return data
}

const actionsBeforeRequest = [ logBeforeRequest ]
const actionsAfterRequest = [
  checkHttpStatus,
  R_Path(['data']), // 取出response.data
  checkDataCode,
  R_Path(['data']) // response.data.data
]

/**
 * 
 * @param {string} method 
 * @param {object} config 
 * @param {string} url 请求地址
 * @param {any} data 请求参数
 * @param {object} singleConfig 单次请求需要的额外配置
 */
const createRequestMethod = (method = 'get', config = {}) => async (url = '', data = {}, singleConfig = {}) => {

  const requestConfig = {
    url,
    method,
    params: method === 'get' ? data : null,
    data: method === 'get' ? null : data,
    ...config,
    ...singleConfig,
  }

  // 请求前的操作,该函数接收请求参数，返回请求参数
  const beforeRequest = R_Pipe(...actionsBeforeRequest)

  // 请求后的操作，接收repose作为参数
  const afterRequest = R_Pipe(...actionsAfterRequest)

  try {
   const response = await instance.request(
    beforeRequest(requestConfig)
   )
    return afterRequest(response)
  } catch (e) {
    log.error(`${method} ${url} fail, param is`, data)
    log.error(e)
    throw e
  }
}

// 对外提供ajax get 和post方法
export default {
  get: createRequestMethod('get'),
  post: createRequestMethod('post'),
  put: createRequestMethod('put'),
  delete: createRequestMethod('delete'),
}

export {
  instance,
  createRequestMethod,
  actionsBeforeRequest,
  actionsAfterRequest,
}

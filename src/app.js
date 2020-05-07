import { instance }  from 'ii-utils/request'
import { Message } from 'ii-ui'
import { router } from 'umi'
import _log from 'ii-utils/log'

// catch error
const catchUnhandledError = () => {
  const logErr = _log.tag('global-onerror')
  const logReject = _log.tag('global-onunhandledrejection')
  const logRejectEvent = _log.tag('global-unhandledrejection-event')

  window.onerror = (msg, url, lineNo, columnNo, error) => {
    Message.error(msg)
    logErr.error(error)
    return true
  }

  window.onunhandledrejection = reject => {
    if (reject.reason.code) return false// 从request抛出的错误不处理
    if (reject.reason && !reject.reason.code) { // 保证不是request中抛出的请求错误
      reject.reason.message && Message.error(reject.reason.message)
    }
    reject.reason.msg && Message.error(reject.reason.msg)
    logReject.error(reject)

    return true
  }

  // window.addEventListener('unhandledrejection', function(event) {
  //   logRejectEvent.error(event)
  //   return true
  // })

}


// 修改request
const resetRequest = () => {
  const { token = '', ...rest } = instance.defaults.headers || {}
  instance.defaults.headers = {
    ...rest,
    Authorization: token
  }

  // 做一些业务相关的拦截操作，通用报错已在ii-utils/request处理
  instance.interceptors.response.use(response => {
    const { data: httpData, status } = response
    const { code, message } = httpData

    if (status === 200 && Number(code) !== 0) {
      // Message.error(message)
      // switch(Number(code)) {
      //   case 210050: {
      //     router.push('/login')
      //     break
      //   }
      //   case 210000: {
      //     router.push('/login')
      //     break
      //   }
      //   default:
      //     break
      // }
    }
    
    return response
  })
}

// 初始化app
const initApp = () => {
  resetRequest()
  catchUnhandledError()
}

log('instance', instance.defaults)
initApp()

export const dva = {
  config: {
    onError(err) {
    },
  },
};


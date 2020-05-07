import Cookie from 'js-cookie'
import { Message } from 'ii-ui'
import { router }  from 'umi'
import { instance } from 'ii-utils/request'
import * as accountService from '../services/account'

export default {
  namespace: 'account',
  state: {
    id: 0,
    nickName: '名字为空',
    avatar: 'https://110.ai-indeed.com/favicon.ico',
    oauth_token: Cookie.get('oauth_token') || ''
  },
  reducers: {
    setAccount(state, { payload: account }) {
      return { ...state, ...account }
    },

    setToken(state, { payload: oauth_token }) {
      return { ...state, oauth_token }
    }
  },
  effects: {

    *fetch(action, { call, put, select }) {
      try {
        const token = yield select(state => state.account.oauth_token)
        const { name: nickName, id } = yield call(accountService.fetchAccountInfo, { token })
        yield put({ type: 'setAccount', payload: { nickName, id } })
      } catch (e) {
        log.error(e)
      }
    },

    *exit(action, { call, put, select }) {
      const token = yield select(state => state.account.oauth_token)
      yield call(accountService.exitAccount, { token })
      yield put({ type: 'saveToken', payload: '' })
    },

    // token更新时，修改cookie和request中的token值
    *saveToken({ payload: token }, { call, put }) { 
      Cookie.set('oauth_token', token)
      instance.defaults.headers = {
        ...instance.defaults.headers,
        token,
      }
      yield put({ type: 'setToken', payload: token  })

      if (token === '') {
        Message.error('身份已失效，请重新登录')
        router.push('/login')
      }

    }
  }
}
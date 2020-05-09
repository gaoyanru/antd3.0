import * as service from 'src/services/api'
import { Message } from 'ii-ui'
const TABLE_NAME_SPACE = 'VulnerabilityFirstTableView'

export default {
  namespace: TABLE_NAME_SPACE,
  state: {
    total: 0,
    currentItems: [],
    detail: {}
  },
  reducers: {
    setModelsList(state, { payload: { total, currentItems }}) {
      return {
        ...state,
        total,
        currentItems
      }
    },
    setDetail(state, { payload: { detail }}) {
      return {
        ...state,
        detail
      }
    }
  },
  effects: {
    *fetchList({ payload: { page = 1, size = 20, keywords = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchVulnerabilityFirstList, { page, size, keywords })
      const { totalCount, datas: currentItems = [] } = modelsList || {}
      yield put({ type: 'setModelsList', payload: { total: totalCount, currentItems }})
    },
    *fetchDetail({ payload: id }, {call, put}) {
      const detail = yield call(service.fetchVulnerabilityFirstDetail, id)
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *clearDetail(_, {call, put}) {
      const detail = {}
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *createItem({payload}, { call, put }) {
      yield call(service.addVulnerabilityFirst, payload)
      Message.success('操作成功')
    },
    *updateItem({payload}, { call, put }) {
      yield call(service.updateVulnerabilityFirst, payload)
      Message.success('操作成功')
    }
  }
}
import * as service from 'src/services/api'
import { Message } from 'ii-ui'
const TABLE_NAME_SPACE = 'BasedataModelTableView'

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
    *fetchBasedataModelList({ payload: { page = 1, size = 20, keywords = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchBasedataModelList, { page, size, keywords })
      const { totalCount, datas: currentItems = [] } = modelsList || {}
      yield put({ type: 'setModelsList', payload: { total: totalCount, currentItems }})
    },
    *fetchDetail({ payload: id }, {call, put}) {
      console.log(id, 'id')
      const detail = yield call(service.fetchBasedataModelDetail, id)
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *createItem({payload}, { call, put }) {
      yield call(service.addBasedataModel, payload)
      Message.success('操作成功')
    },
    *updateItem({payload}, { call, put }) {
      yield call(service.updateBasedataModel, payload)
      Message.success('操作成功')
    }
  }
}
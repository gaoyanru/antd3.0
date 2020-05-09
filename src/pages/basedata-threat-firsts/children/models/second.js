import * as service from 'src/services/api'
import { Message } from 'ii-ui'
const TABLE_NAME_SPACE = 'BasedataThreatSecondTableView'

export default {
  namespace: TABLE_NAME_SPACE,
  state: {
    total: 0,
    currentItems: [],
    detail: {},
    firstList: [],
    allFirstList: [],
    threatTypes: []
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
    },
    setFirstList(state, { payload: { firstList, allFirstList }}) {
      return {
        ...state,
        firstList,
        allFirstList
      }
    },
    setThreatTypes(state, { payload: { threatTypes }}) {
      return {
        ...state,
        threatTypes
      }
    },
  },
  effects: {
    *fetchList({ payload: { page = 1, size = 20, keywords = '', threadFirstsId = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchBasedataThreatSecondList, { page, size, keywords, threadFirstsId })
      const { totalCount, datas: currentItems = [] } = modelsList || {}
      yield put({ type: 'setModelsList', payload: { total: totalCount, currentItems }})
    },
    *fetchListFirst({ payload: { page = 1, size = 20, keywords = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchBasedataThreatFirstList, { page, size, keywords })
      const { datas: firstList = [] } = modelsList || {}
      const allFirstList = [{threat_firsts_id: '', threat_firsts_name: '全部'}].concat(firstList)
      yield put({ type: 'setFirstList', payload: { firstList, allFirstList }})
    },
    *fetchThreattypeList({ payload: { page = 1, size = 20, keywords = ''}}, { call, put }) {
      const modelsList = yield call(service.fetchThreattypeList, { page, size, keywords})
      const { datas: threatTypes = [] } = modelsList || {}
      yield put({ type: 'setThreatTypes', payload: { threatTypes }})
    },
    *fetchDetail({ payload: id }, {call, put}) {
      const detail = yield call(service.fetchBasedataThreatSecondDetail, id)
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *clearDetail(_, {call, put}) {
      const detail = {}
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *createItem({payload}, { call, put }) {
      yield call(service.addBasedataThreatSecond, payload)
      Message.success('操作成功')
    },
    *updateItem({payload}, { call, put }) {
      yield call(service.updateBasedataThreatSecond, payload)
      Message.success('操作成功')
    }
  }
}
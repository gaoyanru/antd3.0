import * as service from 'src/services/api'
import { Message } from 'ii-ui'
const TABLE_NAME_SPACE = 'VulnerabilitySecondTableView'

export default {
  namespace: TABLE_NAME_SPACE,
  state: {
    total: 0,
    currentItems: [],
    detail: {},
    firstList: [],
    allFirstList: []
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
    }
  },
  effects: {
    *fetchList({ payload: { page = 1, size = 20, keywords = '', vulnerabilityFirstsId = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchVulnerabilitySecondList, { page, size, keywords, vulnerabilityFirstsId })
      const { totalCount, datas: currentItems = [] } = modelsList || {}
      yield put({ type: 'setModelsList', payload: { total: totalCount, currentItems }})
    },
    *fetchListFirst({ payload: { page = 1, size = 20, keywords = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchVulnerabilityFirstList, { page, size, keywords })
      const { datas: firstList = [] } = modelsList || {}
      const allFirstList = [{vulnerability_firsts_id: '', vulnerability_firsts_name: '全部'}].concat(firstList)
      yield put({ type: 'setFirstList', payload: { firstList, allFirstList }})
    },
    *fetchDetail({ payload: id }, {call, put}) {
      const detail = yield call(service.fetchVulnerabilitySecondDetail, id)
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *clearDetail(_, {call, put}) {
      const detail = {}
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *createItem({payload}, { call, put }) {
      yield call(service.addVulnerabilitySecond, payload)
      Message.success('操作成功')
    },
    *updateItem({payload}, { call, put }) {
      yield call(service.updateVulnerabilitySecond, payload)
      Message.success('操作成功')
    }
  }
}
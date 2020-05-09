import * as service from 'src/services/api'
import { Message } from 'ii-ui'
const TABLE_NAME_SPACE = 'BasedataAssetsTableView'

export default {
  namespace: TABLE_NAME_SPACE,
  state: {
    total: 0,
    currentItems: [],
    detail: {},
    firstlevelList: [],
    secondlevelList: []
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
    setFirstlevelList(state, { payload: { firstlevelList }}) {
      return {
        ...state,
        firstlevelList
      }
    },
    setSecondlevelList(state, { payload: { secondlevelList }}) {
      return {
        ...state,
        secondlevelList
      }
    },
  },
  effects: {
    *fetchList({ payload: { page = 1, size = 20, keywords = '', assetFirstsId = '', assetSecondsId = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchBasedataAssetsList, { page, size, keywords, assetFirstsId, assetSecondsId })
      const { totalCount, datas: currentItems = [] } = modelsList || {}
      yield put({ type: 'setModelsList', payload: { total: totalCount, currentItems }})
    },
    *fetchFirstlevelList({ payload: { page = 1, size = 20, keywords = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchFirstlevelList, { page, size, keywords })
      const { datas } = modelsList || {}
      const firstlevelList = [{asset_firsts_name: '全部', asset_firsts_id: ''}].concat(datas)
      yield put({ type: 'setFirstlevelList', payload: { firstlevelList }})
    },
    *fetchSecondlevelList({ payload: { page = 1, size = 20, keywords = '' }}, { call, put }) {
      const modelsList = yield call(service.fetchSecondlevelList, { page, size, keywords })
      const { datas } = modelsList || {}
      const secondlevelList = [{asset_seconds_name: '全部', asset_seconds_id: ''}].concat(datas)
      yield put({ type: 'setSecondlevelList', payload: { secondlevelList }})
    },
    *fetchDetail({ payload: id }, {call, put}) {
      const detail = yield call(service.fetchBasedataAssetsDetail, id)
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *clearDetail(_, {call, put}) {
      const detail = {}
      yield put({ type: 'setDetail', payload: { detail }})
    },
    *createItem({payload}, { call, put }) {
      yield call(service.addBasedataAssets, payload)
      Message.success('操作成功')
    },
    *updateItem({payload}, { call, put }) {
      yield call(service.updateBasedataAssets, payload)
      Message.success('操作成功')
    }
  }
}
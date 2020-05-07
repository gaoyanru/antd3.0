import { createEntityModel } from 'ii-utils/redux-helper'
import * as service from 'src/services/api'

const NAME_SPACE = 'project'

export default {
  ...createEntityModel(NAME_SPACE),
  effects: {

    *fetchItem({ payload: { id = 0 }}, { call, put }) {
      const item = yield call(service.fetchItem, { id })
      yield put({ type: 'saveSingle', payload: item })
      return item
    },

    *fetchList({ payload }, { call, put }) {
      const listData = yield call(service.fetchList, payload )
      const { records = [] } = listData
      yield put({ type: 'saveList', payload: records })
      return listData
    },
    
    *updateItem({ payload }, { call, put }) {
      yield call(service.updateItem, payload)
      yield put({ type: 'saveSingle', payload })
    },
    
    *deleteItem({ payload: { id = 0 }}, { call, put }) {
      yield call(service.deleteItem, { id })
      yield put({ type: 'deleteById', payload: { id }})
    },

    *createItem({ payload }, { call, put }) {
      yield call(service.createItem, payload)
    }
  }
}

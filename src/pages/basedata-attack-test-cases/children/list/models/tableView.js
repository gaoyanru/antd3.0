import * as service from 'src/services/api'
const TABLE_NAME_SPACE = 'TestCasesTableView'

export default {
  namespace: TABLE_NAME_SPACE,
  state: {
    total: 0,
    currentItems: []
  },
  reducers: {
    setModelsList(state, { payload: { total, currentItems }}) {
      return {
        ...state,
        total,
        currentItems
      }
    },
    // setConfigStoreList(state, { payload: { resData }}) {
    //   return {
    //     ...state,
    //     configStoreList: resData
    //   }
    // }
  },
  effects: {
    *fetchTestCasesList({ payload: { page = 1, size = 20, keywords = '' }}, { call, put }) {
      console.log(page, size, '11111')
      const modelsList = yield call(service.fetchTestCasesList, { page, size, keywords })
      console.log(modelsList, 'modelsList')
      const { totalCount, datas: currentItems = [] } = modelsList || {}
      yield put({ type: 'setModelsList', payload: { total: totalCount, currentItems }})
    },
    // *fetchConfigStoreList(_, {call, put}) {
    //   const resData = yield call(service.fetchConfigStoreList)
    //   yield put({ type: 'setConfigStoreList', payload: { resData }})
    // },
    // *jobName({ payload: { value }} ,{ call, put }) {
    //   console.log('value', value)
    //   const dataName = yield call(service.jobName, value)
    //   return dataName
    // },
  }
}
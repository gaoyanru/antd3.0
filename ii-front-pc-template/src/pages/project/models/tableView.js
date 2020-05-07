import * as services from 'src/services/api'

const NAME_SPACE = 'projectTableView'
const ENTITY_NAME_SPACE = 'project'

export default {
  namespace: NAME_SPACE,
  state: {
    total: 0,
    currentIds: [],
    currentPage: 0,
  },
  reducers: {
    setTableData(state, { payload: { total, currentIds, currentPage }}) {
      return {
        ...state,
        total,
        currentPage,
        currentIds,
      }
    }
  },
  effects: {
    // 列表中获取数据
    *fetchList({ payload: { page = 0 }}, { call, put }) {
      const { total = 0, records: currentItems = [], page: currentPage = 0 } = yield call(services.fetchList, { page })
      const currentIds = currentItems.map(item => item.id)

      yield put({ type: `${ENTITY_NAME_SPACE}/saveList`, payload: currentItems })
      yield put({ type: 'setTableData', payload: { total, currentPage, currentIds }})
    },
  }
}
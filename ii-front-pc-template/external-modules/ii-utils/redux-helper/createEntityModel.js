/**
 * 创建保存entity接口的model,entity是与后端实体对应，带有id的数据
 * 内部按照key -> value的形式保存
 * 提供5个操作数据的action:
 * clear
 * saveList (save表示更新或添加)
 * saveSingle
 * deleteById
 * deleteByIds
 */

const createEntityModel = (namespace = 'entity', identityKey = 'id') => ({
  namespace,
  state: {},
  reducers: {
    clear(state) {
      return {}
    },

    saveList(state, { payload: list }) {
      if (!Array.isArray(list)) {
        throw new Error('saveList only accept array as payload data')
      }

      const savedEntities = list.reduce((res, item) => {
        if (typeof item[identityKey] === 'undefined') {
          throw new Error(`saveList's item should has ${identityKey}`)
        }
        // 更新原来的数据
        res[item[identityKey]] = {
          ...state[item[identityKey]],
          ...item
        }
        return res
      }, {})
      
      return {
        ...state,
        ...savedEntities
      }
    },

    saveSingle(state, { payload: entity }) {
      if (typeof entity[identityKey] === 'undefined') {
        throw new Error(`saveSingle's data should has ${identityKey}`)
      }

      const originData = state[entity[identityKey]] || {}

      return {
        ...state,
        [entity[identityKey]]: {
          ...originData,
          ...entity
        }
      }
    },

    deleteById(state, { payload: id }) {
      const newState = { ...state }
      if (newState[id]) {
        delete newState[id]
      }

      return newState
    },
    
    deleteByIds(state, { payload: ids }) {
      if (!Array.isArray(ids)) {
        throw new Error('deleteByIds only accepts array')
      }
      const newState = { ...state }

      ids.forEach(id => {
        if (newState[id]) {
          delete newState[id]
        }
      })
      return newState
    }
  }
})

export default createEntityModel

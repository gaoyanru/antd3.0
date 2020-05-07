import createEntityModel from '../createEntityModel'

describe('createEntityModel', () => {
    
    it('createEntityModel identityKey should work', () => {
      const model = createEntityModel('entity', 'mainId')
      let state = model.reducers.saveSingle({}, { payload: { mainId: 1, data: 1 }})
      expect(state[1].data).toBe(1)
      state = model.reducers.saveList({}, { payload: [{ mainId: 2, data: 2 }]})
      expect(state[2].data).toBe(2)
      state = model.reducers.deleteById({}, { payload: 1})
      expect(state[1]).toBe(undefined)
      state = model.reducers.deleteByIds({}, { payload: [2]})
      expect(state[2]).toBe(undefined)
    })

})
import request from 'ii-utils/request'
// 风评模型管理列表
export const fetchModelsList = ({keywords, page, size}) => request.get(`/ra-basedata-model-algorithms?keywords=${keywords}&page=${page}&size=${size}`)
// 缓解措施库列表
export const fetchBasedataModelList = ({keywords, page, size}) => request.get(`/ra-basedata-countermeasures?keywords=${keywords}&page=${page}&size=${size}`)
// 缓解措施新增
export const addBasedataModel = (params) => request.post(`/ra-basedata-countermeasures`, params)
// 缓解措施修改及删除
export const updateBasedataModel = (params) => request.put('/ra-basedata-countermeasures', params)
// 缓解措施详情获取
export const fetchBasedataModelDetail = ({id}) => request.get(`/ra-basedata-countermeasures/${id}`)
// 测试用例列表页
export const fetchTestCasesList = ({keywords, page, size}) => request.get(`/ra-basedata-attack-test-cases?keywords=${keywords}&page=${page}&size=${size}`)
// 测试用例新增
export const addTestCasesModel = (params) => request.post(`/ra-basedata-attack-test-cases`, params)
// 测试用例修改及删除
export const updateTestCasesModel = (params) => request.put('/ra-basedata-attack-test-cases', params)
// 测试用例详情获取
export const fetchTestCasesDetail = ({id}) => request.get(`/ra-basedata-attack-test-cases/${id}`)
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

// 一级脆弱性列表页
export const fetchVulnerabilityFirstList = ({keywords, page, size}) => request.get(`/ra-basedata-vulnerability-firsts?keywords=${keywords}&page=${page}&size=${size}`)
// 一级脆弱性新增
export const addVulnerabilityFirst = (params) => request.post(`/ra-basedata-vulnerability-firsts`, params)
// 一级脆弱性修改及删除
export const updateVulnerabilityFirst = (params) => request.put('/ra-basedata-vulnerability-firsts', params)
// 一级脆弱性详情获取
export const fetchVulnerabilityFirstDetail = ({id}) => request.get(`/ra-basedata-vulnerability-firsts/${id}`)
// 二级级脆弱性列表页
export const fetchVulnerabilitySecondList = ({keywords, page, size, vulnerabilityFirstsId}) => request.get(`/ra-basedata-vulnerability-seconds?keywords=${keywords}&page=${page}&size=${size}&vulnerabilityFirstsId=${vulnerabilityFirstsId}`)
// 二级脆弱性新增
export const addVulnerabilitySecond = (params) => request.post(`/ra-basedata-vulnerability-seconds`, params)
// 二级脆弱性修改及删除
export const updateVulnerabilitySecond = (params) => request.put('/ra-basedata-vulnerability-seconds', params)
// 二级脆弱性详情获取
export const fetchVulnerabilitySecondDetail = ({id}) => request.get(`/ra-basedata-vulnerability-seconds/${id}`)

// 一级威胁性列表页
export const fetchBasedataThreatFirstList = ({keywords, page, size}) => request.get(`/ra-basedata-threat-firsts?keywords=${keywords}&page=${page}&size=${size}`)
// 一级威胁性新增
export const addBasedataThreatFirst = (params) => request.post(`/ra-basedata-threat-firsts`, params)
// 一级威胁性修改及删除
export const updateBasedataThreatFirst = (params) => request.put('/ra-basedata-threat-firsts', params)
// 一级威胁性详情获取
export const fetchBasedataThreatFirstDetail = ({id}) => request.get(`/ra-basedata-threat-firsts/${id}`)
// 二级级威胁性列表页
export const fetchBasedataThreatSecondList = ({keywords, page, size, threadFirstsId}) => request.get(`/ra-basedata-threat-seconds?keywords=${keywords}&page=${page}&size=${size}&threadFirstsId=${threadFirstsId}`)
// 二级威胁性新增
export const addBasedataThreatSecond = (params) => request.post(`/ra-basedata-threat-seconds`, params)
// 二级威胁性修改及删除
export const updateBasedataThreatSecond = (params) => request.put('/ra-basedata-threat-seconds', params)
// 二级威胁性详情获取
export const fetchBasedataThreatSecondDetail = ({id}) => request.get(`/ra-basedata-threat-seconds/${id}`)
// 二级威胁性新增获取安全分类
export const fetchThreattypeList = ({keywords, page, size}) => request.get(`/ra-basedata-threat-type?keywords=${keywords}&page=${page}&size=${size}`)

// 资产列表页
export const fetchBasedataAssetsList = ({keywords, page, size, assetFirstsId, assetSecondsId}) => request.get(`/ra-basedata-assets?keywords=${keywords}&page=${page}&size=${size}&assetFirstsId=${assetFirstsId}&assetSecondsId=${assetSecondsId}`)
// 资产查询条件一级类别
export const fetchFirstlevelList = ({keywords, page, size}) => request.get(`/ra-basedata-asset-firsts?keywords=${keywords}&page=${page}&size=${size}`)
// 资产查询条件二级类别
export const fetchSecondlevelList = ({keywords, page, size}) => request.get(`/ra-basedata-asset-seconds?keywords=${keywords}&page=${page}&size=${size}`)
// 资产新增
export const addBasedataAssets = (params) => request.post(`/ra-basedata-assets`, params)
// 资产修改及删除
export const updateBasedataAssets = (params) => request.put('/ra-basedata-assets', params)
// 资产详情获取
export const fetchBasedataAssetsDetail = ({id}) => request.get(`/ra-basedata-assets/${id}`)
// 资产一级类别新增
export const addBasedataAssetFirsts = (params) => request.post(`/ra-basedata-asset-firsts`, params)
// 资产一级类别修改及删除
export const updateBasedataAssetFirsts = (params) => request.put('/ra-basedata-asset-firsts', params)
// 资二级类别新增
export const addBasedataAssetSecond = (params) => request.post(`/ra-basedata-asset-seconds`, params)
// 资二级类别修改及删除
export const updateBasedataAssetSecond = (params) => request.put('/ra-basedata-asset-seconds', params)
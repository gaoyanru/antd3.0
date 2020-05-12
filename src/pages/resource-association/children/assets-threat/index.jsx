import { useState, useEffect } from 'react'
import { Select, Input, Button } from 'ii-ui'
import { connect } from 'dva'
import ProjectTable from './ProjectTable'
// import Detail from './Detail'

import './index.less'

const { Search } = Input
const TABLE_NAME_SPACE = 'AssetsthreatTableView'

const AssetsthreatList = (props) => {
  const { fetchList, firstAlllevelList = [], secondAlllevelList = [], fetchFirstlevelList, fetchSecondlevelList} = props
  const [keywords, setKeywords] = useState()
  const [params, setParams] = useState({page: 1, size: 10})
  const [firstId, setFirstId] = useState()
  const [secondId, setSecondId] = useState()
  const [visible, setVisible] = useState(false)
  const [currentId, setCurrentId] = useState()

  useEffect(() => {
    fetchFirstlevelList({page:1, size: 100})
    fetchSecondlevelList({page:1, size: 100})
  }, [])
  useEffect(() => {
    fetchList({...params, keywords, assetFirstsId: firstId, assetSecondsId: secondId})
  }, [keywords, firstId, secondId]) 
  return (
    <div className='riskModel-table-container'>
      <div className='title'>资产-威胁关系映射</div>
      <div className='table-con'>
        <div className='table-header'>
          <div>
            <Search
              placeholder='输入您想要查询的内容'
              onSearch={value => setKeywords(value)}
              style={{ width: 200 }}
            />
            <Select placeholder='一级类别' onChange={value => setFirstId(value)} style={{ width: 200, marginLeft: 10, marginRight: 10 }}>
            {
              firstAlllevelList.length > 0 && firstAlllevelList.map((item) => {
                return (
                  <Select.Option key={item.asset_firsts_id} value={item.asset_firsts_id}>{item.asset_firsts_name}</Select.Option>
                )
              })
            }
            </Select>
            <Select placeholder='二级级类别' onChange={value => setSecondId(value)} style={{ width: 200 }}>
              {
                secondAlllevelList.length > 0 && secondAlllevelList.map((item) => {
                  return (
                    <Select.Option key={item.asset_seconds_id} value={item.asset_seconds_id}>{item.asset_seconds_name}</Select.Option>
                  )
                })
              }
            </Select>
          </div>
          <div>
            <Button
              className='button-type'
              onClick={() => {
                setVisibleCategory(true)
              }}
            >
              管理类别
            </Button>
            <Button
              className='button'
              type='primary'
              onClick={() => {
                setCurrentId(0)
                setVisible(true)
              }}
            >
              添加资产
            </Button>
          </div>
        </div>
        <ProjectTable
          size={params.size}
          page={params.page}
          showModal={(currentid) => {
            setCurrentId(currentid)
            setVisible(true)
          }}
          fetchList={data => {
            setParams({...data})
            fetchList({...data, keywords})
          }}
        />
      </div>
      {/* {
        visible &&
        <Detail
          id={currentId}
          visible={visible}
          onCancel={() => setVisible(false)}
        />
      } */}
    </div>
  )
}
const mapState = state => {
  const { firstAlllevelList, secondAlllevelList } = state[TABLE_NAME_SPACE] || {}
  return {
    firstAlllevelList,
    secondAlllevelList
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchList`, payload: params }),
  fetchFirstlevelList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchFirstlevelList`, payload: params }),
  fetchSecondlevelList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchSecondlevelList`, payload: params })
})
export default connect(mapState, mapDispatchToProps)(AssetsthreatList)
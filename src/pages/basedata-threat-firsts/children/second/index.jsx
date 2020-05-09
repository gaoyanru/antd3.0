import { useState, useEffect } from 'react'
import { Input, Button, Select } from 'ii-ui'
import { connect } from 'dva'
import ProjectTable from './ProjectTable'
import Detail from './Detail'
import './index.less'

const { Search } = Input
const TABLE_NAME_SPACE = 'BasedataThreatSecondTableView'

const Second = (props) => {
  const { fetchList, allFirstList, fetchListFirst } = props
  const [keywords, setKeywords] = useState()
  const [firstId, setFirstId] = useState()
  const [visible, setVisible] = useState(false)
  const [currentId, setCurrentId] = useState()
  const [params, setParams] = useState({page: 1, size: 10})

  useEffect(() => {
    fetchListFirst({page: 1, size: 100})
  }, [])
  useEffect(() => {
    console.log(firstId, 'firstId')
    fetchList({...params, keywords, threadFirstsId: firstId})
  }, [keywords, firstId]) 
  return (
    <div className='table-con'>
      <div className='table-header'>
        <div>
          <Select placeholder='请选择一级威胁性名称' onChange={value => setFirstId(value)} style={{ width: 200, marginRight: 10 }}>
            {
              allFirstList.length > 0 && allFirstList.map((item) => {
                return (
                  <Select.Option key={item.threat_firsts_id} value={item.threat_firsts_id}>{item.threat_firsts_name}</Select.Option>
                )
              })
            }
            
          </Select>
          <Search
            placeholder='请输入二级威胁性名称'
            onSearch={value => setKeywords(value)}
            style={{ width: 350 }}
          />
        </div>
        <Button
          className='button'
          type='primary'
          onClick={() => {
            setCurrentId(0)
            setVisible(true)
          }}
        >
          添加威胁
        </Button>
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
      {
        visible &&
        <Detail
          id={currentId}
          visible={visible}
          onCancel={() => setVisible(false)}
        />
      }
    </div>
  )
}
const mapState = state => {
  const { allFirstList } = state[TABLE_NAME_SPACE] || {}
  return {
    allFirstList
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchList`, payload: params }),
  fetchListFirst: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchListFirst`, payload: params }),
})
export default connect(mapState, mapDispatchToProps)(Second)
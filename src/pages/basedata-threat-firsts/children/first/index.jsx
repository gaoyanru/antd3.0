import { useState, useEffect } from 'react'
import { Input, Button } from 'ii-ui'
import { connect } from 'dva'
import ProjectTable from './ProjectTable'
import Detail from './Detail'
import './index.less'

const { Search } = Input
const TABLE_NAME_SPACE = 'VulnerabilityFirstTableView'

const First = (props) => {
  const { fetchList } = props
  const [keywords, setKeywords] = useState()
  const [visible, setVisible] = useState(false)
  const [currentId, setCurrentId] = useState()
  const [params, setParams] = useState({page: 1, size: 10})

  useEffect(() => {
    fetchList({...params, keywords})
  }, [keywords]) 
  return (
    <div className='table-con'>
      <div className='table-header'>
        <Search
          placeholder='输入您想要查询的内容'
          onSearch={value => setKeywords(value)}
          style={{ width: 350 }}
        />
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
  const { total } = state[TABLE_NAME_SPACE] || {}
  return {
    total
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchList`, payload: params }),
})
export default connect(mapState, mapDispatchToProps)(First)
import { useState, useEffect } from 'react'
import { Table, Input, Button } from 'ii-ui'
import { connect } from 'dva'
import ProjectTable from './ProjectTable'
import { router } from 'umi'
import './index.less'

const { Search } = Input
const TABLE_NAME_SPACE = 'TestCasesTableView'
// const FilterGroup = Table.FilterGroup

// const options = [
//   {
//     field: 'searchWord',
//     InputOption: (props) => <Input
//       {...props}
//       placeholder='输入店铺名称/描述'
//       style={{ width: 350 }}
//     />
//   }
// ]

const BasedataModellist = (props) => {
  const { fetchList } = props
  const [keywords, setKeywords] = useState()
  const [params, setParams] = useState({page: 1, size: 10})
  // const [params] = useState({currentPage: 1})
  // const { currentPage = 1, searchWord } = params

  // useEffect(() => {
  //   fetchConfigStoreList()
  // }, [])

  useEffect(() => {
    fetchList({...params, keywords})
  }, [keywords]) 
  return (
    <div className='riskModel-table-container'>
      <div className='title'>攻击路径库</div>
      <div className='table-con'>
        <div className='table-header'>
          <Search
            placeholder='输入您想要查询的内容'
            onSearch={value => setKeywords(value)}
            style={{ width: 350 }}
          />
          <Button className='button' type='primary' onClick={() => {}}>添加测试用例</Button>
        </div>
        <ProjectTable
          size={params.size}
          page={params.page}
          fetchList={data => {
            setParams({...data})
            fetchList({...data, keywords})
          }}
        />
      </div>
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
  fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchTestCasesList`, payload: params }),
  // fetchConfigStoreList: () => dispatch({ type: `${TABLE_NAME_SPACE}/fetchConfigStoreList`})
})
export default connect(mapState, mapDispatchToProps)(BasedataModellist)
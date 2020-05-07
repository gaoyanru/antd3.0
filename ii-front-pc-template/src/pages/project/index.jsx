import { useEffect, useState, useCallback } from 'react'
import { connect } from 'dva'
import { Table, Select } from 'ii-ui'
import ProjectTable, { TABLE_NAME_SPACE } from './ProjectTable'

const SelectOption = Select.SelectInput
const FilterGroup = Table.FilterGroup

const mockCreators = [{
  value: 1,
  label: '创建人1',
},{
  value: 2,
  label: '创建人2',
},{
  value: 3,
  label: '创建人3',
}]

const options = [{
  label: '创建者',
  field: 'created_by',
  InputOption: props => <SelectOption
    {...props}
    style={{ width: 300 }}
    options={mockCreators}
  />
}]

const ProjectListContainer = ({ currentItems, tableLoading, fetchList}) => {
  const [ params, setParams ] = useState({})

  useEffect(() => {
    log('params is', params)
    fetchList(params)
  }, [ params ])

  return <div className="project-table-container">
    <FilterGroup options={options} onChange={newParams => setParams({ ...newParams, page: 0 })} showSubmit={false} />
    <ProjectTable changePage={ page => setParams({ ...params, page })} />
  </div>
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchList`, payload: params })
})

export default connect(null, mapDispatchToProps)(ProjectListContainer)


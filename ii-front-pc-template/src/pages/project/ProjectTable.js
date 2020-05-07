import { Table } from 'ii-ui'
import { connect } from 'dva'
import { useMemo } from 'react'

const TABLE_NAME_SPACE = 'projectTableView'
const ENTITY_NAME_SPACE = 'project'

const createColumns = () => [
  {
    title: '项目名称',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: '55%',
  },
  {
    title: '任务数',
    dataIndex: 'storeId',
    width: '15%',
  },
  {
    title: '操作',
    key: 'edit',
    render: record => <div className="item-actions">
    <span className="span-btn" >编辑</span>
    <span className="span-btn" >删除</span>
    </div>,
    width: '15%',
  },
]

const ItemTable = ({ currentItems, tableLoading, changePage, total, currentPage: current = 0 }) => {

  const pagination = {
    current,
    total,
    pageSize: 20,
    onChange: changePage
  }

  return (
    <Table
      pagination={pagination}
      loading={tableLoading}
      rowKey={record => record.id}
      dataSource={currentItems}
      scroll={{
        y: 500,
      }}
      columns={createColumns()}
    />
  )
}

const mapState = state => {
  const { currentIds = [], total, currentPage } = state[TABLE_NAME_SPACE] || {}
  const entityState = state[ENTITY_NAME_SPACE] || {}
  const currentItems = currentIds.map(id => entityState[id] || {})

  return {
    currentItems,
    tableLoading: state.loading.effects[`${TABLE_NAME_SPACE}/fetchList`] || false,
    total,
    currentPage,
  }
}

export default connect(mapState)(ItemTable)
export {
  TABLE_NAME_SPACE,
  ENTITY_NAME_SPACE,
}
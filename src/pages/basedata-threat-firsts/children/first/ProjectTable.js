import { Table, Modal } from 'ii-ui'
import { connect } from 'dva'
import moment from 'moment'

const TABLE_NAME_SPACE = 'VulnerabilityFirstTableView'

const confirmDelete = ({ dispatch, id }) => Modal.confirm({
  title: '确认删除',
  content: '确认该条数据吗？',
  onOk: async () => {
    await dispatch({ type: `${TABLE_NAME_SPACE}/updateItem`, payload: {is_deleted: true, vulnerability_firsts_id: id} })
    await dispatch({ type: `${TABLE_NAME_SPACE}/fetchList`, payload: {page: 1, size: 10} })
  }
})

const createColumns = (showModal, dispatch) => [
  {
    title: '序号',
    render: (text, record, index) => {
      return (
        <span>{index + 1}</span>
      )
    }
	},
  {
    title: '一级威胁性编号',
    dataIndex: 'vulnerability_firsts_code'
	},
	{
    title: '一级威胁性名称',
    dataIndex: 'vulnerability_firsts_name'
  },
  {
    title: '描述',
    dataIndex: 'vulnerability_firsts_desc'
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    render: (text) => {
      return (
        <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
      )
    }
	},
	{
		title: '操作',
    key: 'edit',
		render: (record) => {
      const { vulnerability_firsts_id: id } = record
			return (
				<div className='item-actions'>
          <span className='span-btn' onClick={() => showModal(id)}>编辑</span>
          <span className='span-btn' onClick={() => confirmDelete({dispatch, id})}>删除</span>
        </div>
			)
		}
	}
]

const ItemTable = (props) => {
  // log(props, 'propsStore')
  const { currentItems, page = 1, total, fetchList, tableLoading, size, showModal, dispatch } = props
  console.log(props, 'props')
  const pageSizeOptions = ['10', '20']
	const pagination = {
    current: page,
    total,
    pageSize: size,
    onChange: (page) => {
      console.log(page, 'page')
      fetchList({ page, size})
    },
    onShowSizeChange: (page, size) => {
      console.log(size, 'size')
      fetchList({ page: 1, size })
    },
    showTotal: (total, range) => `总共 ${total} 条`,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions,
    size: 'small'
  }
	return (
    <Table
      pagination={pagination}
      loading={tableLoading}
      rowKey={record => record.vulnerability_firsts_id}
      dataSource={currentItems}
      columns={createColumns(showModal, dispatch)}
    />
	)
}
const mapState = state => {
  const { currentItems = [], total} = state[TABLE_NAME_SPACE] || {}
  return {
    currentItems,
    tableLoading: state.loading.effects[`${TABLE_NAME_SPACE}/fetchBasedataModelList`] || false,
    total
  }
}
export default connect(mapState)(ItemTable)
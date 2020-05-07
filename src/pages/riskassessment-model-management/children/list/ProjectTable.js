import { Table, Modal } from 'ii-ui'
import { connect } from 'dva'

const TABLE_NAME_SPACE = 'riskModelTableView'

const createColumns = () => [
  {
    title: '序号',
    render: (text, record, index) => {
      return (
        <span>{index + 1}</span>
      )
    }
	},
  {
    title: '名称',
    dataIndex: 'algorithm_name'
	},
	{
    title: '代号',
    dataIndex: 'algorithm_code'
  },
  {
    title: '描述',
    dataIndex: 'algorithm_desc'
  },
  {
    title: '创建时间',
    dataIndex: 'description2'
	},
	{
		title: '操作',
    key: 'edit',
		render: (record) => {
      // const { storeId } = record
			return (
				<div className='item-actions'>
          <span className='span-btn'>查看</span>
          <span className='span-btn'>编辑</span>
					{/* <span className='span-btn' onClick={() => confirmDelete({ dispatch, storeId})}>删除</span> */}
          {/* <span className='span-btn' onClick={() => confirmDelete({ dispatch, storeId})}>删除</span> */}
        </div>
			)
		}
	}
]

const ItemTable = (props) => {
  // log(props, 'propsStore')
  const { currentItems, page = 1, total, fetchList, tableLoading, size } = props
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
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions,
    size: 'small'
  }
	return (
    <Table
      pagination={pagination}
      loading={tableLoading}
      rowKey={record => record.algorithm_id}
      dataSource={currentItems}
      columns={createColumns()}
    />
	)
}
const mapState = state => {
  const { currentItems = [], total} = state[TABLE_NAME_SPACE] || {}
  return {
    currentItems,
    tableLoading: state.loading.effects[`${TABLE_NAME_SPACE}/fetchModelsList`] || false,
    total
  }
}
export default connect(mapState)(ItemTable)
import { Table, Modal } from 'ii-ui'
import { connect } from 'dva'

const TABLE_NAME_SPACE = 'TestCasesTableView'

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
    title: '测试用例编号',
    dataIndex: 'attack_test_case_code'
	},
	{
    title: '测试用例名称',
    dataIndex: 'attack_test_case_name'
  },
  {
    title: '测试用例步骤',
    dataIndex: 'attack_test_case_steps'
  },
  {
    title: '创建时间',
    dataIndex: 'create_time'
	},
	{
		title: '操作',
    key: 'edit',
		render: (record) => {
      // const { storeId } = record
			return (
				<div className='item-actions'>
          <span className='span-btn'>编辑</span>
          <span className='span-btn'>删除</span>
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
      rowKey={record => record.attack_test_case_id}
      dataSource={currentItems}
      columns={createColumns()}
    />
	)
}
const mapState = state => {
  const { currentItems = [], total} = state[TABLE_NAME_SPACE] || {}
  return {
    currentItems,
    tableLoading: state.loading.effects[`${TABLE_NAME_SPACE}/fetchTestCasesList`] || false,
    total
  }
}
export default connect(mapState)(ItemTable)
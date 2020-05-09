import { Modal, Form, Input, Select } from 'ii-ui'
import { useDebounce } from 'ii-utils/react-helper'
import { connect } from 'dva'
import './index.less'
import { useEffect } from 'react';

const TABLE_NAME_SPACE = 'BasedataAssetsTableView'

const ModalDetail = (props) => {
  const { visible, onCancel, id, form, fetchList, updateItem, createItem, detail, fetchDetail, clearDetail, firstlevelList = [], secondlevelList = []} = props
  const { getFieldDecorator, getFieldsValue,  validateFields } = form
  const { asset_name, asset_firsts_id, asset_seconds_id } = getFieldsValue()

  useEffect(() => {
    id ? fetchDetail(id) : clearDetail()
  }, [id])
 
  const onSubmit = useDebounce(() => {
    validateFields(async (error, values) => {
      console.log(values, 'values')
      if (error) return
      id ? await updateItem ({ asset_id: id, is_deleted: false, ...values }) : await createItem ({ ...values })
      onCancel()
      fetchList({page: 1, size: 10})
    })
  }, [ asset_name, asset_firsts_id, asset_seconds_id ])
  
	const handleCancel = () => {
		onCancel()
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };
  return (
		<Modal
			title={ !id ? '添加资产' : '修改资产' }
			visible={visible}
			onOk={onSubmit}
      onCancel={handleCancel}
		>
			<Form {...formItemLayout} className="project-editor-container">
        <Form.Item
          label='资产名称'
        >
          {getFieldDecorator('asset_name', {
            initialValue: detail.asset_name,
            rules: [
              { required: true, message: '请输入资产名称' }
            ]
          })(
            <Input placeholder='请输入资产名称'/>
          )}
        </Form.Item>
        <Form.Item
          label='一级类别'
        >
          {getFieldDecorator('asset_firsts_id', {
            initialValue: detail.asset_firsts_id,
            rules: [{
              required: true,
              message: '请选择一级类别',
            }]
          })(
            <Select placeholder='请选择一级类别'>
              {
                firstlevelList.length > 0 && firstlevelList.map((item) => {
                  return (
                    <Select.Option key={item.asset_firsts_id} value={item.asset_firsts_id}>{item.asset_firsts_name}</Select.Option>
                  )
                })
              }
              
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label='二级类别'
        >
          {getFieldDecorator('asset_seconds_id', {
            initialValue: detail.asset_seconds_id,
            rules: [{
              required: true,
              message: '请选择二级类别',
            }]
          })(
            <Select placeholder='请选择二级类别'>
              {
                secondlevelList.length > 0 && secondlevelList.map((item) => {
                  return (
                    <Select.Option key={item.asset_seconds_id} value={item.asset_seconds_id}>{item.asset_seconds_name}</Select.Option>
                  )
                })
              }
              
            </Select>
          )}
        </Form.Item>
      </Form>
		</Modal>
	)
}

const mapState = (state, ownProps) => {
  const { detail, firstlevelList, secondlevelList } = state[TABLE_NAME_SPACE] || {}
  return ({
    detail,
    firstlevelList,
    secondlevelList
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDetail: (id) =>  dispatch({ type: `${TABLE_NAME_SPACE}/fetchDetail`, payload: { id } }),
    createItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/createItem`, payload }),
    updateItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/updateItem`, payload }),
    clearDetail: () => dispatch({ type: `${TABLE_NAME_SPACE}/clearDetail`}),
    fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchList`, payload: params }),
  }
}
export default connect(mapState, mapDispatchToProps)(Form.create()(ModalDetail))
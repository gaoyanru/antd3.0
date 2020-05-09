 import { Modal, Form, Input } from 'ii-ui'
import { useDebounce } from 'ii-utils/react-helper'
import { connect } from 'dva'
import './index.less'
import { useEffect } from 'react';

const TABLE_NAME_SPACE = 'VulnerabilityFirstTableView'

const ModalDetail = (props) => {
  const { visible, onCancel, id, form, fetchList, updateItem, createItem, detail, fetchDetail, clearDetail } = props
  const { getFieldDecorator, getFieldsValue,  validateFields } = form
  const { vulnerability_firsts_name, vulnerability_firsts_code, vulnerability_firsts_desc} = getFieldsValue()

  useEffect(() => {
    id ? fetchDetail(id) : clearDetail()
  }, [id])

  const onSubmit = useDebounce(() => {
    validateFields(async (error, values) => {
      console.log(values, 'values')
      if (error) return
      id ? await updateItem ({ countermeasure_id: id, is_deleted: false, ...values }) : await createItem ({ ...values })
      onCancel()
      fetchList({page: 1, size: 10})
    })
  }, [ vulnerability_firsts_name, vulnerability_firsts_code, vulnerability_firsts_desc])
  
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
			title={ !id ? '添加一级威胁' : '修改一级威胁' }
			visible={visible}
			onOk={onSubmit}
      onCancel={handleCancel}
		>
			<Form {...formItemLayout} className="project-editor-container">
        <Form.Item
          label='威胁名称'
        >
          {getFieldDecorator('vulnerability_firsts_name', {
            initialValue: detail.vulnerability_firsts_name,
            rules: [
              { required: true, message: '请输入威胁名称' }
            ]
          })(
            <Input placeholder='请输入威胁名称'/>
          )}
        </Form.Item>
        <Form.Item
          label='威胁编号'
        >
          {getFieldDecorator('vulnerability_firsts_code', {
            initialValue: detail.vulnerability_firsts_code,
            rules: [{
              required: true,
              message: '请输入威胁编号',
            }]
          })(
            <Input placeholder='请输入威胁编号'/>
          )}
        </Form.Item>
        <Form.Item
          label="威胁描述"
        >
          {getFieldDecorator('vulnerability_firsts_desc', {
            initialValue: detail.vulnerability_firsts_desc,
            rules: [{
              required: true,
              message: '请输入威胁描述',
            }]
          })(
            <Input.TextArea
              placeholder='请输入威胁描述'
              rows={5}
            />
          )}
        </Form.Item>
      </Form>
		</Modal>
	)
}

const mapState = (state, ownProps) => {
  const { detail } = state[TABLE_NAME_SPACE] || {}
  return ({
    detail
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
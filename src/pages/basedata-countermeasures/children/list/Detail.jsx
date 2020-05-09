 import { Modal, Form, Input } from 'ii-ui'
import { useDebounce } from 'ii-utils/react-helper'
import { connect } from 'dva'
import './index.less'
import { useEffect } from 'react';

const TABLE_NAME_SPACE = 'BasedataModelTableView'

const ModalDetail = (props) => {
  const { visible, onCancel, id, form, fetchList, updateItem, createItem, detail, fetchDetail, clearDetail } = props
  const { getFieldDecorator, getFieldsValue,  validateFields } = form
  const { countermeasure_name, countermeasure_desc, countermeasure_code} = getFieldsValue()

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
  }, [ countermeasure_name, countermeasure_desc, countermeasure_code])
  
	const handleCancel = () => {
		onCancel()
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  return (
		<Modal
			title={ !id ? '添加缓解措施' : '修改缓解措施' }
			visible={visible}
			onOk={onSubmit}
      onCancel={handleCancel}
		>
			<Form {...formItemLayout} className="project-editor-container">
        <Form.Item
          label='缓解措施名称'
        >
          {getFieldDecorator('countermeasure_name', {
            initialValue: detail.countermeasure_name,
            rules: [
              { required: true, message: '请输入缓解措施名称' }
            ]
          })(
            <Input placeholder='请输入缓解措施名称'/>
          )}
        </Form.Item>
        <Form.Item
          label='缓解措施编号'
        >
          {getFieldDecorator('countermeasure_code', {
            initialValue: detail.countermeasure_code,
            rules: [{
              required: true,
              message: '请输入缓解措施编号',
            }]
          })(
            <Input placeholder='请输入缓解措施编号'/>
          )}
        </Form.Item>
        <Form.Item
          label="缓解措施描述"
        >
          {getFieldDecorator('countermeasure_desc', {
            initialValue: detail.countermeasure_desc,
            rules: [{
              required: true,
              message: '请输入缓解措施描述',
            }]
          })(
            <Input.TextArea
              rows={5}
              placeholder='请输入缓解措施描述'
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
    fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchBasedataModelList`, payload: params }),
  }
}
export default connect(mapState, mapDispatchToProps)(Form.create()(ModalDetail))
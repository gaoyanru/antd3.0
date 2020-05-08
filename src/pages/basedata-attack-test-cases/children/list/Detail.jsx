 import { Modal, Form, Input } from 'ii-ui'
import { useDebounce } from 'ii-utils/react-helper'
import { connect } from 'dva'
import './index.less'
import { useEffect } from 'react';

const TABLE_NAME_SPACE = 'TestCasesTableView'

const ModalDetail = (props) => {
  const { visible, onCancel, id, form, fetchList, updateItem, createItem, detail, fetchDetail, clearDetail } = props
  const { getFieldDecorator, getFieldsValue,  validateFields } = form
  const { attack_test_case_name, attack_test_case_code, attack_test_case_steps } = getFieldsValue()

  useEffect(() => {
    id ? fetchDetail(id) : clearDetail()
  }, [id])

  const onSubmit = useDebounce(() => {
    validateFields(async (error, values) => {
      if (error) return
      id ? await updateItem ({ attack_test_case_id: id, is_deleted: false, ...values }) : await createItem ({ ...values })
      onCancel()
      fetchList({page: 1, size: 10})
    })
  }, [ attack_test_case_name, attack_test_case_code, attack_test_case_steps])
  
	const handleCancel = () => {
		onCancel()
  }
  return (
		<Modal
			title={ !id ? '添加测试用例' : '修改测试用例' }
			visible={visible}
			onOk={onSubmit}
      onCancel={handleCancel}
		>
			<Form className="project-editor-container">
        <Form.Item
          label='名称'
        >
          {getFieldDecorator('attack_test_case_name', {
            initialValue: detail.attack_test_case_name,
            rules: [
              { required: true, message: '输入名称' }
            ]
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label='编号'
        >
          {getFieldDecorator('attack_test_case_code', {
            initialValue: detail.attack_test_case_code,
            rules: [{
              required: true,
              message: '请输入编号',
            }]
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label="步骤"
        >
          {getFieldDecorator('attack_test_case_steps', {
            initialValue: detail.attack_test_case_steps,
            rules: [{
              required: true,
              message: '请输入步骤',
            }]
          })(
            <Input.TextArea
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
    fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchTestCasesList`, payload: params }),
  }
}
export default connect(mapState, mapDispatchToProps)(Form.create()(ModalDetail))
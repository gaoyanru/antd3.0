import { Modal, Form, Input, Select } from 'ii-ui'
import { useDebounce } from 'ii-utils/react-helper'
import { connect } from 'dva'
import './index.less'
import { useEffect } from 'react';

const TABLE_NAME_SPACE = 'BasedataThreatSecondTableView'

const ModalDetail = (props) => {
  const { visible, onCancel, id, form, fetchList, updateItem, createItem, detail, fetchDetail, clearDetail, firstList = [] } = props
  const { getFieldDecorator, getFieldsValue,  validateFields } = form
  const { threat_seconds_name, threat_seconds_code, threat_firsts_id, threat_seconds_desc } = getFieldsValue()

  useEffect(() => {
    id ? fetchDetail(id) : clearDetail()
  }, [id])
  // useEffect(() => {
  //   fetchListFirst({page: 1, size: 100})
  // }, [])
  const onSubmit = useDebounce(() => {
    validateFields(async (error, values) => {
      console.log(values, 'values')
      if (error) return
      id ? await updateItem ({ vulnerability_seconds_id: id, is_deleted: false, ...values }) : await createItem ({ ...values })
      onCancel()
      fetchList({page: 1, size: 10})
    })
  }, [ threat_seconds_name, threat_seconds_code, threat_firsts_id, threat_seconds_desc])
  
	const handleCancel = () => {
		onCancel()
  }
  console.log(firstList, 'firstList')
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
			title={ !id ? '添加二级威胁' : '修改二级威胁' }
			visible={visible}
			onOk={onSubmit}
      onCancel={handleCancel}
		>
			<Form {...formItemLayout} className="project-editor-container">
        <Form.Item
          label='威胁名称'
        >
          {getFieldDecorator('threat_seconds_name', {
            initialValue: detail.threat_seconds_name,
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
          {getFieldDecorator('threat_seconds_code', {
            initialValue: detail.threat_seconds_code,
            rules: [{
              required: true,
              message: '请输入威胁编号',
            }]
          })(
            <Input placeholder='请输入威胁编号'/>
          )}
        </Form.Item>
        <Form.Item
          label='一级威胁性'
        >
          {getFieldDecorator('threat_type_id', {
            initialValue: detail.threat_type_id,
            rules: [{
              required: true,
              message: '请选择一级威胁性',
            }]
          })(
            <Select placeholder='请选择一级威胁性'>
              {
                firstList.length > 0 && firstList.map((item) => {
                  return (
                    <Select.Option key={item.threat_firsts_id} value={item.threat_firsts_id}>{item.threat_firsts_name}</Select.Option>
                  )
                })
              }
              
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="威胁描述"
        >
          {getFieldDecorator('threat_seconds_desc', {
            initialValue: detail.threat_seconds_desc,
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
  const { detail, firstList } = state[TABLE_NAME_SPACE] || {}
  return ({
    detail,
    firstList
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDetail: (id) =>  dispatch({ type: `${TABLE_NAME_SPACE}/fetchDetail`, payload: { id } }),
    createItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/createItem`, payload }),
    updateItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/updateItem`, payload }),
    clearDetail: () => dispatch({ type: `${TABLE_NAME_SPACE}/clearDetail`}),
    fetchList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchList`, payload: params })
  }
}
export default connect(mapState, mapDispatchToProps)(Form.create()(ModalDetail))
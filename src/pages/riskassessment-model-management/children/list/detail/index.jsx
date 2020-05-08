import { useState, useEffect } from 'react'
import { Form, Input, Select } from 'ii-ui'
import CalculationFactor from './CalculationFactor'
import AddModel from './AddModel'

import './index.less'

const FormItem = Form.Item
const TextArea = Input.TextArea

const riskModelDetail = (props) => {
  console.log(props, 'props')
  const { form, detailParams= {} } = props
  const { getFieldDecorator } = form

  const [params, setParams] = useState(detailParams)

  const changeParams = (field, value) => {
    console.log(field, value, 'field, value')
    const newParams = detailParams
    newParams[field] = value
    setParams(newParams)
    // changeDetailParams(newParams)
  }
  return (
    <div className='riskModel-table-container'>
      <div className='title'>风评模型管理</div>
      <div className='table-con'>
        <Form className='form-container-base'>
          <FormItem label='模型名称' colon={false} className='item-first'>
            {getFieldDecorator('algorithm_name', {
              initialValue: detailParams.algorithm_name,
              rules: [
                { required: true, message: '请输入模型名称'}
              ]
            })(
              <Input style={{width: 430}} placeholder='请输入模型名称' disabled={detailParams.model_id} onChange={(e) => changeParams('algorithm_name', e.target.value)}/>
            )}
          </FormItem>
          <FormItem label='代号' colon={false}>
            {getFieldDecorator('algorithm_code', {
              initialValue: detailParams.algorithm_code
            })(
              <Input style={{width: 430}} placeholder='请输入代号' disabled={detailParams.model_id} onChange={(e) => changeParams('algorithm_code', e.target.value)}/>
            )}
          </FormItem>
          <FormItem label='描述' colon={false}>
            {getFieldDecorator('algorithm_desc', {
              initialValue: detailParams.algorithm_desc
            })(
              <TextArea placeholder='请输入描述' rows={3} disabled={detailParams.model_id} onChange={(e) => changeParams('algorithm_desc', e.target.value)}></TextArea>
            )}
          </FormItem>
        </Form>
        <CalculationFactor></CalculationFactor>
        <AddModel></AddModel>
      </div>
    </div>
  )
}
export default Form.create()(riskModelDetail)
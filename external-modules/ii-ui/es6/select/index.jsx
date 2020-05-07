import React from 'react'
import { Select } from 'antd'
import enhanceControlledComponent from '../utils/enhanceControlledComponent'

const { Option } = Select

// 下拉选择器
const SelectInput = ({ options = [], ...rest }) => <Select {...rest}>
  {options.map((item, index) => <Option key={index} value={item.value}>{item.label}</Option>)}
</Select>

Select.SelectInput = enhanceControlledComponent(SelectInput)

export default Select

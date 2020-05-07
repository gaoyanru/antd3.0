import Button from '../button'
import PropTypes from 'prop-types'
import useDebounce from '../utils/useDebounce'
import React, { useState, useEffect, useMemo } from 'react'

import './style/ii-filter-group.less'

const FilterGroup = ({ options = [], defaultParams = {}, onSubmit = noop, onChange = noop, loading = false, showSubmit = true, submitText = '确定', ...rest }) => {
  const [ params, setParams ] = useState(defaultParams)

  const onSubmitClick = useDebounce(() => {
    onSubmit(params)
  }, [ params, onSubmit ])

  useEffect(() => {
    onChange(params)
  }, [ params ])

  return <div className="ii-filter-group" {...rest}>
    {
      options.map((item, index) => {
        const { label = '', field = '', InputOption } = item
        return <div key={index} className="ii-filter-item">
          { label && <div className="filter-label">{ label }:</div>}
          <InputOption
          value={params[field]}
          params={params}
          onChange={value => {
            if (value && value.target) {
              value = value.target.value
            }
            setParams({ ...params, [field]: value })
          }}
        />
        </div>
      })
    }
    { showSubmit && <Button type="primary" onClick={onSubmitClick} loading={loading}>{ submitText }</Button>}
  </div>
}

FilterGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string, // 不指定label则不显示
    field: PropTypes.string.isRequired, // 请求中对应的字段
    InputOption: PropTypes.func.isRequired, // 过滤器对应的组件，下拉选择/输入框/是啊金选择等
  }),).isRequired,
  onChange: PropTypes.func, // 内部参数发生变化时的回调，如果没有提交按钮，可以在此处触发请求
  onSubmit: PropTypes.func, // 有按钮时，点击按钮触发
  submitText: PropTypes.string, // 按钮文字
  showSubmit: PropTypes.bool, // 是否显示提交按钮
  loading: PropTypes.bool,
  defaultParams: PropTypes.object, // 默认值
}

export default FilterGroup
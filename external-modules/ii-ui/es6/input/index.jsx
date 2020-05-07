import React, { useMemo } from 'react'
import { Input } from 'antd'
import enhanceControlledComponent from '../utils/enhanceControlledComponent'

const limitChange = (maxLength = 0) => onChange => {
  return e => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.substring(0, maxLength)
    }
    onChange(e)
  }
}

const InputMax = ({ value = '', maxLength = 0, onChange, children, ...rest }) => {
  const onInputChange = useMemo(() => limitChange(maxLength)(onChange), [onChange, maxLength])
  return <div className="ii-ui-input">
  <div className="ii-ui-input-addon">
  {`${value ? value.length : 0}/${maxLength}`}
  </div>
  <Input
  value={value}
  onChange={onInputChange}
  {...rest}
  />
  {children}
</div>
}

const TextAreaMax = ({ value = '', maxLength = 0, onChange, ...rest }) => {
  const onInputChange = useMemo(() => limitChange(maxLength)(onChange), [onChange, maxLength])

  return <div className="ii-ui-input">
  <div className="ii-ui-input-addon">
    {`${value ? value.length : 0}/${maxLength}`}
  </div>
  <Input.TextArea
    value={value}
    onChange={onInputChange}
    {...rest}
  />
</div>
}

const InputWithMax = enhanceControlledComponent(InputMax)
const TextAreaWithMax = enhanceControlledComponent(TextAreaMax)

Input.InputWithMax = InputWithMax
Input.TextAreaWithMax = TextAreaWithMax

export default Input

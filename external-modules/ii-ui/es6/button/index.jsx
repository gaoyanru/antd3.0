import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

const IIButton = ({ size = '01', children, className = '', ...rest }) => {
  return <Button
    className={`${className} btn-size-${size}`}
    {...rest}
  >{ children }</Button>
}

IIButton.propTypes = {
  ...Button.propTypes,
  size: PropTypes.oneOf(['01', '02', '03', '04'])
}


export default IIButton

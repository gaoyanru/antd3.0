import React from 'react'
const Icon = ({ icon, size = 16, style, className = '', ...rest }) => (<svg className={`${className} icon`} style={{
  ...style,
  width: size + 'px',
  height: size + 'px',
}} {...rest} aria-hidden="true">
  <use xlinkHref={'#' + icon}></use>
</svg>)

export default Icon
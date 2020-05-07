import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

const noop = () => {}

// 给自定义的modal组件添加一个show的方法，CustomModal.show可以直接显示模态框
export default CustomModal => {

  CustomModal.show = props => {
    if (!g_app._store) {
      throw new Error('can not find window.g_app._store')
    }
    const { onCancel = noop, onOk = noop, ...rest } = props
    const div = document.createElement('div')
    document.body.appendChild(div)
    
    const destroy = () => {
      const result = ReactDOM.unmountComponentAtNode(div)
      if (result && div) {
        document.body.removeChild(div)
      }
    }
    
    const wrappedOnOk = async (...args) => {
      await onOk(...args)
      destroy()
    }

    const wrappedOnCancel = (...args) => {
      onCancel(...args)
      destroy()
    }

    ReactDOM.render(
      <Provider store={window.g_app._store}>
        <CustomModal {...rest} onOk={wrappedOnOk} onCancel={wrappedOnCancel} />
      </Provider>
      ,
      div
    )

    return destroy
  } 
  return CustomModal
}
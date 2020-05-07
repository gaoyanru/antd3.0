import React, { useState, useCallback } from 'react'
import {
  Modal
} from 'antd'
import enhanceModal from './enhanceModal'
import Button from '../button'

const noop = () => {}

const ModalConfirm = ({
  title = '提示',
  content = '请确认',
  onOk = noop,
  onCancel = noop,
  confirmLoading = false ,
  ...rest
}) => {
  const [ loading, setLoading ] = useState(false)

  const onOkClick = useCallback(async e => {
    try {
      setLoading(true)
      await onOk()
    } finally {
      setLoading(false)
    }
  }, [ onOk ])

  return <Modal
  visible
  title={title}
  className="ii-modal-confirm"
  width={350}
  onCancel={onCancel}
  footer={[
    <Button key="cancel" size="02" onClick={onCancel}>取消</Button>,
    <Button key="confirm" size="02" type="primary" onClick={onOkClick} loading={loading}>确认</Button>,
  ]}
  {...rest}
  >
    <div className = "ii-modal-content">{ content }</div>
  </Modal>
}

Modal.enhanceModal = enhanceModal
Modal.confirm = enhanceModal(ModalConfirm).show

export default Modal

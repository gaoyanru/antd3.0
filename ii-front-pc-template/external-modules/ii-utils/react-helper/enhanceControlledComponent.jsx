import { useImperativeHandle, forwardRef } from 'react'

function enhanceControlledComponent(Component) {
  const EnhancedComponent = (props, ref) => {
    EnhancedComponent.displayName = Component.displayName
    useImperativeHandle(ref, () => ({}))

    return <Component {...props} />
  }

  return forwardRef(EnhancedComponent)
}

export default enhanceControlledComponent

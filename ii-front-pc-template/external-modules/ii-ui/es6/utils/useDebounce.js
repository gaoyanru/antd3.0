import { useRef, useCallback } from 'react'
import _debounce from 'lodash.debounce'

/**
 * 
 * @param {*} func 
 * @param {Array} deps 必填：debounce函数内部所依赖的hooks，这些变量发生变化时，debounce需要重新创建
 * @param {*} time 
 * @param {*} config 
 */
function useDebounce(func, deps, time = 300, config = { leading: true }) {
  let debounceFunc = useCallback(_debounce(func, time, config), deps)

  return debounceFunc
}

export default useDebounce

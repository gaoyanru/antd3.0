"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {*} func 
 * @param {Array} deps 必填：debounce函数内部所依赖的hooks，这些变量发生变化时，debounce需要重新创建
 * @param {*} time 
 * @param {*} config 
 */
function useDebounce(func, deps) {
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    leading: true
  };
  var debounceFunc = (0, _react.useCallback)((0, _lodash.default)(func, time, config), deps);
  return debounceFunc;
}

var _default = useDebounce;
exports.default = _default;
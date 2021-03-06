"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function enhanceControlledComponent(Component) {
  var EnhancedComponent = function EnhancedComponent(props, ref) {
    EnhancedComponent.displayName = Component.displayName;
    (0, _react.useImperativeHandle)(ref, function () {
      return {};
    });
    return _react.default.createElement(Component, props);
  };

  return (0, _react.forwardRef)(EnhancedComponent);
}

var _default = enhanceControlledComponent;
exports.default = _default;
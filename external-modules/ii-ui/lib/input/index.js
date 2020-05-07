"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _enhanceControlledComponent = _interopRequireDefault(require("../utils/enhanceControlledComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var limitChange = function limitChange() {
  var maxLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return function (onChange) {
    return function (e) {
      if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.substring(0, maxLength);
      }

      onChange(e);
    };
  };
};

var InputMax = function InputMax(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === void 0 ? 0 : _ref$maxLength,
      onChange = _ref.onChange,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["value", "maxLength", "onChange", "children"]);

  var onInputChange = (0, _react.useMemo)(function () {
    return limitChange(maxLength)(onChange);
  }, [onChange, maxLength]);
  return _react.default.createElement("div", {
    className: "ii-ui-input"
  }, _react.default.createElement("div", {
    className: "ii-ui-input-addon"
  }, "".concat(value ? value.length : 0, "/").concat(maxLength)), _react.default.createElement(_antd.Input, _extends({
    value: value,
    onChange: onInputChange
  }, rest)), children);
};

var TextAreaMax = function TextAreaMax(_ref2) {
  var _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? '' : _ref2$value,
      _ref2$maxLength = _ref2.maxLength,
      maxLength = _ref2$maxLength === void 0 ? 0 : _ref2$maxLength,
      onChange = _ref2.onChange,
      rest = _objectWithoutProperties(_ref2, ["value", "maxLength", "onChange"]);

  var onInputChange = (0, _react.useMemo)(function () {
    return limitChange(maxLength)(onChange);
  }, [onChange, maxLength]);
  return _react.default.createElement("div", {
    className: "ii-ui-input"
  }, _react.default.createElement("div", {
    className: "ii-ui-input-addon"
  }, "".concat(value ? value.length : 0, "/").concat(maxLength)), _react.default.createElement(_antd.Input.TextArea, _extends({
    value: value,
    onChange: onInputChange
  }, rest)));
};

var InputWithMax = (0, _enhanceControlledComponent.default)(InputMax);
var TextAreaWithMax = (0, _enhanceControlledComponent.default)(TextAreaMax);
_antd.Input.InputWithMax = InputWithMax;
_antd.Input.TextAreaWithMax = TextAreaWithMax;
var _default = _antd.Input;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _enhanceControlledComponent = _interopRequireDefault(require("../utils/enhanceControlledComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Option = _antd.Select.Option; // 下拉选择器

var SelectInput = function SelectInput(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      rest = _objectWithoutProperties(_ref, ["options"]);

  return _react.default.createElement(_antd.Select, rest, options.map(function (item, index) {
    return _react.default.createElement(Option, {
      key: index,
      value: item.value
    }, item.label);
  }));
};

_antd.Select.SelectInput = (0, _enhanceControlledComponent.default)(SelectInput);
var _default = _antd.Select;
exports.default = _default;
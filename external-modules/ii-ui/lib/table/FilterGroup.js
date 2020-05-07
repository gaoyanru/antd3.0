"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _button = _interopRequireDefault(require("../button"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useDebounce = _interopRequireDefault(require("../utils/useDebounce"));

var _react = _interopRequireWildcard(require("react"));

require("./style/ii-filter-group.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FilterGroup = function FilterGroup(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      _ref$defaultParams = _ref.defaultParams,
      defaultParams = _ref$defaultParams === void 0 ? {} : _ref$defaultParams,
      _ref$onSubmit = _ref.onSubmit,
      onSubmit = _ref$onSubmit === void 0 ? noop : _ref$onSubmit,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      _ref$showSubmit = _ref.showSubmit,
      showSubmit = _ref$showSubmit === void 0 ? true : _ref$showSubmit,
      _ref$submitText = _ref.submitText,
      submitText = _ref$submitText === void 0 ? '确定' : _ref$submitText,
      rest = _objectWithoutProperties(_ref, ["options", "defaultParams", "onSubmit", "onChange", "loading", "showSubmit", "submitText"]);

  var _useState = (0, _react.useState)(defaultParams),
      _useState2 = _slicedToArray(_useState, 2),
      params = _useState2[0],
      setParams = _useState2[1];

  var onSubmitClick = (0, _useDebounce.default)(function () {
    onSubmit(params);
  }, [params, onSubmit]);
  (0, _react.useEffect)(function () {
    onChange(params);
  }, [params]);
  return _react.default.createElement("div", _extends({
    className: "ii-filter-group"
  }, rest), options.map(function (item, index) {
    var _item$label = item.label,
        label = _item$label === void 0 ? '' : _item$label,
        _item$field = item.field,
        field = _item$field === void 0 ? '' : _item$field,
        InputOption = item.InputOption;
    return _react.default.createElement("div", {
      key: index,
      className: "ii-filter-item"
    }, label && _react.default.createElement("div", {
      className: "filter-label"
    }, label, ":"), _react.default.createElement(InputOption, {
      value: params[field],
      params: params,
      onChange: function onChange(value) {
        if (value && value.target) {
          value = value.target.value;
        }

        setParams(_objectSpread({}, params, _defineProperty({}, field, value)));
      }
    }));
  }), showSubmit && _react.default.createElement(_button.default, {
    type: "primary",
    onClick: onSubmitClick,
    loading: loading
  }, submitText));
};

FilterGroup.propTypes = {
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string,
    // 不指定label则不显示
    field: _propTypes.default.string.isRequired,
    // 请求中对应的字段
    InputOption: _propTypes.default.func.isRequired // 过滤器对应的组件，下拉选择/输入框/是啊金选择等

  })).isRequired,
  onChange: _propTypes.default.func,
  // 内部参数发生变化时的回调，如果没有提交按钮，可以在此处触发请求
  onSubmit: _propTypes.default.func,
  // 有按钮时，点击按钮触发
  submitText: _propTypes.default.string,
  // 按钮文字
  showSubmit: _propTypes.default.bool,
  // 是否显示提交按钮
  loading: _propTypes.default.bool,
  defaultParams: _propTypes.default.object // 默认值

};
var _default = FilterGroup;
exports.default = _default;
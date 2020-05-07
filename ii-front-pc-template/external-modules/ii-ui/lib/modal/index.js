"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _enhanceModal = _interopRequireDefault(require("./enhanceModal"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var noop = function noop() {};

var ModalConfirm = function ModalConfirm(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? '提示' : _ref$title,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? '请确认' : _ref$content,
      _ref$onOk = _ref.onOk,
      onOk = _ref$onOk === void 0 ? noop : _ref$onOk,
      _ref$onCancel = _ref.onCancel,
      onCancel = _ref$onCancel === void 0 ? noop : _ref$onCancel,
      _ref$confirmLoading = _ref.confirmLoading,
      confirmLoading = _ref$confirmLoading === void 0 ? false : _ref$confirmLoading,
      rest = _objectWithoutProperties(_ref, ["title", "content", "onOk", "onCancel", "confirmLoading"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var onOkClick = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setLoading(true);
              _context.next = 4;
              return onOk();

            case 4:
              _context.prev = 4;
              setLoading(false);
              return _context.finish(4);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0,, 4, 7]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [onOk]);
  return _react.default.createElement(_antd.Modal, _extends({
    visible: true,
    title: title,
    className: "ii-modal-confirm",
    width: 350,
    onCancel: onCancel,
    footer: [_react.default.createElement(_button.default, {
      key: "cancel",
      size: "02",
      onClick: onCancel
    }, "\u53D6\u6D88"), _react.default.createElement(_button.default, {
      key: "confirm",
      size: "02",
      type: "primary",
      onClick: onOkClick,
      loading: loading
    }, "\u786E\u8BA4")]
  }, rest), _react.default.createElement("div", {
    className: "ii-modal-content"
  }, content));
};

_antd.Modal.enhanceModal = _enhanceModal.default;
_antd.Modal.confirm = (0, _enhanceModal.default)(ModalConfirm).show;
var _default = _antd.Modal;
exports.default = _default;
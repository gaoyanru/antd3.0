"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var noop = function noop() {}; // 给自定义的modal组件添加一个show的方法，CustomModal.show可以直接显示模态框


var _default = function _default(CustomModal) {
  CustomModal.show = function (props) {
    if (!g_app._store) {
      throw new Error('can not find window.g_app._store');
    }

    var _props$onCancel = props.onCancel,
        onCancel = _props$onCancel === void 0 ? noop : _props$onCancel,
        _props$onOk = props.onOk,
        onOk = _props$onOk === void 0 ? noop : _props$onOk,
        rest = _objectWithoutProperties(props, ["onCancel", "onOk"]);

    var div = document.createElement('div');
    document.body.appendChild(div);

    var destroy = function destroy() {
      var result = _reactDom.default.unmountComponentAtNode(div);

      if (result && div) {
        document.body.removeChild(div);
      }
    };

    var wrappedOnOk =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return onOk.apply(void 0, _args);

              case 2:
                destroy();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function wrappedOnOk() {
        return _ref.apply(this, arguments);
      };
    }();

    var wrappedOnCancel = function wrappedOnCancel() {
      onCancel.apply(void 0, arguments);
      destroy();
    };

    _reactDom.default.render(_react.default.createElement(_reactRedux.Provider, {
      store: window.g_app._store
    }, _react.default.createElement(CustomModal, _extends({}, rest, {
      onOk: wrappedOnOk,
      onCancel: wrappedOnCancel
    }))), div);

    return destroy;
  };

  return CustomModal;
};

exports.default = _default;
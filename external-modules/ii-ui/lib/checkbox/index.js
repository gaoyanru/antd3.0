"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _antd = require("antd");

var _enhanceControlledComponent = _interopRequireDefault(require("../utils/enhanceControlledComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_antd.Checkbox.Group = (0, _enhanceControlledComponent.default)(_antd.Checkbox.Group);
var _default = _antd.Checkbox;
exports.default = _default;
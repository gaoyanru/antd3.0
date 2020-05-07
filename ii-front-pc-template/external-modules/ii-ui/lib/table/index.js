"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _antd = require("antd");

var _FilterGroup = _interopRequireDefault(require("./FilterGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_antd.Table.FilterGroup = _FilterGroup.default;
var _default = _antd.Table;
exports.default = _default;
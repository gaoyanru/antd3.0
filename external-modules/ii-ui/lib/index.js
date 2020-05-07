"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IILayout", {
  enumerable: true,
  get: function get() {
    return _iiLayout.default;
  }
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function get() {
    return _icon.default;
  }
});
Object.defineProperty(exports, "Breadcrumbs", {
  enumerable: true,
  get: function get() {
    return _breadcrumbs.default;
  }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _table.default;
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _input.default;
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _form.default;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _button.default;
  }
});
Object.defineProperty(exports, "Modal", {
  enumerable: true,
  get: function get() {
    return _modal.default;
  }
});
Object.defineProperty(exports, "Message", {
  enumerable: true,
  get: function get() {
    return _message.default;
  }
});
Object.defineProperty(exports, "Tooltip", {
  enumerable: true,
  get: function get() {
    return _tooltip.default;
  }
});
Object.defineProperty(exports, "Steps", {
  enumerable: true,
  get: function get() {
    return _steps.default;
  }
});
Object.defineProperty(exports, "Cascader", {
  enumerable: true,
  get: function get() {
    return _cascader.default;
  }
});
Object.defineProperty(exports, "Checkbox", {
  enumerable: true,
  get: function get() {
    return _checkbox.default;
  }
});
Object.defineProperty(exports, "Radio", {
  enumerable: true,
  get: function get() {
    return _radio.default;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _select.default;
  }
});
Object.defineProperty(exports, "Upload", {
  enumerable: true,
  get: function get() {
    return _upload.default;
  }
});
Object.defineProperty(exports, "Progress", {
  enumerable: true,
  get: function get() {
    return _progress.default;
  }
});
Object.defineProperty(exports, "Menu", {
  enumerable: true,
  get: function get() {
    return _menu.default;
  }
});
Object.defineProperty(exports, "Dropdown", {
  enumerable: true,
  get: function get() {
    return _dropdown.default;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function get() {
    return _tabs.default;
  }
});
Object.defineProperty(exports, "DatePicker", {
  enumerable: true,
  get: function get() {
    return _datepicker.default;
  }
});
Object.defineProperty(exports, "Tag", {
  enumerable: true,
  get: function get() {
    return _tag.default;
  }
});

var _dayjs = _interopRequireDefault(require("dayjs"));

var _customParseFormat = _interopRequireDefault(require("dayjs/plugin/customParseFormat"));

var _weekOfYear = _interopRequireDefault(require("dayjs/plugin/weekOfYear"));

var _isMoment = _interopRequireDefault(require("dayjs/plugin/isMoment"));

var _badMutable = _interopRequireDefault(require("dayjs/plugin/badMutable"));

var _localeData = _interopRequireDefault(require("dayjs/plugin/localeData"));

var _advancedFormat = _interopRequireDefault(require("dayjs/plugin/advancedFormat"));

var _weekYear = _interopRequireDefault(require("dayjs/plugin/weekYear"));

var _isSameOrBefore = _interopRequireDefault(require("dayjs/plugin/isSameOrBefore"));

var _isSameOrAfter = _interopRequireDefault(require("dayjs/plugin/isSameOrAfter"));

require("dayjs/locale/zh-cn");

var _iiLayout = _interopRequireDefault(require("./ii-layout"));

var _icon = _interopRequireDefault(require("./icon"));

var _breadcrumbs = _interopRequireDefault(require("./breadcrumbs"));

var _table = _interopRequireDefault(require("./table"));

var _input = _interopRequireDefault(require("./input"));

var _form = _interopRequireDefault(require("./form"));

var _button = _interopRequireDefault(require("./button"));

var _modal = _interopRequireDefault(require("./modal"));

var _message = _interopRequireDefault(require("./message"));

var _tooltip = _interopRequireDefault(require("./tooltip"));

var _steps = _interopRequireDefault(require("./steps"));

var _cascader = _interopRequireDefault(require("./cascader"));

var _checkbox = _interopRequireDefault(require("./checkbox"));

var _radio = _interopRequireDefault(require("./radio"));

var _select = _interopRequireDefault(require("./select"));

var _upload = _interopRequireDefault(require("./upload"));

var _progress = _interopRequireDefault(require("./progress"));

var _menu = _interopRequireDefault(require("./menu"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _tabs = _interopRequireDefault(require("./tabs"));

var _datepicker = _interopRequireDefault(require("./datepicker"));

var _tag = _interopRequireDefault(require("./tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ai-indeed 通用ui库
// 用dayjs代替moment，同时修改webpack 的alias 加入 moment ---> dayjs
_dayjs.default.extend(_isSameOrBefore.default);

_dayjs.default.extend(_isSameOrAfter.default);

_dayjs.default.extend(_advancedFormat.default);

_dayjs.default.extend(_customParseFormat.default);

_dayjs.default.extend(_weekYear.default);

_dayjs.default.extend(_weekOfYear.default);

_dayjs.default.extend(_isMoment.default);

_dayjs.default.extend(_localeData.default);

_dayjs.default.extend(_badMutable.default);

_dayjs.default.locale('zh-cn');
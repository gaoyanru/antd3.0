"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _antd = require("antd");

var _icon = _interopRequireDefault(require("../icon"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _umi = require("umi");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Sider = _antd.Layout.Sider;
var Item = _antd.Menu.Item,
    SubMenu = _antd.Menu.SubMenu; // 菜单标题

var NameSpan = function NameSpan(_ref) {
  var _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? '' : _ref$icon;
  return _react.default.createElement("span", {
    className: "menu-item-title-wrapper"
  }, _react.default.createElement(_icon.default, {
    icon: icon,
    style: {
      width: 16,
      height: 16
    }
  }), _react.default.createElement("span", null, name));
};
/**
 * 
 * @param {Array} routes 
 * @param {boolean} collapsed 
 * @param {number} deep  // 菜单层级
 */


var mapMenuItemFromRoute = function mapMenuItemFromRoute() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return routes.reduce(function (menuItemList, item) {
    var _item$name = item.name,
        name = _item$name === void 0 ? '' : _item$name,
        _item$path = item.path,
        path = _item$path === void 0 ? '/' : _item$path,
        _item$routes = item.routes,
        itemRoutes = _item$routes === void 0 ? [] : _item$routes,
        _item$icon = item.icon,
        icon = _item$icon === void 0 ? '' : _item$icon,
        _item$isMenuItem = item.isMenuItem,
        isMenuItem = _item$isMenuItem === void 0 ? false : _item$isMenuItem;

    if (name && isMenuItem) {
      menuItemList.push( // 存在子路由数组并且子路由元素至少包含一个带名字的路由就显示子路由对应的子菜单
      // 此处默认不显示不带名字的路由
      itemRoutes.length > 0 && itemRoutes.some(function (item) {
        return item.isMenuItem && !!name;
      }) ? _react.default.createElement(SubMenu, {
        key: path,
        title: _react.default.createElement(NameSpan, {
          name: name,
          icon: icon
        })
      }, mapMenuItemFromRoute(itemRoutes)) : _react.default.createElement(Item, {
        key: path
      }, _react.default.createElement(NameSpan, {
        name: name,
        icon: icon
      })));
    }

    return menuItemList;
  }, []);
};

var defaultToggleButtonRender = function defaultToggleButtonRender(collapsed) {
  return _react.default.createElement(_icon.default, {
    icon: collapsed ? 'iconzhankaicaidan' : 'iconshouqicaidan',
    size: 32
  });
};

var IILayout = function IILayout(props) {
  var _props$routes = props.routes,
      routes = _props$routes === void 0 ? [] : _props$routes,
      _props$siderWidth = props.siderWidth,
      siderWidth = _props$siderWidth === void 0 ? 256 : _props$siderWidth,
      _props$header = props.header,
      header = _props$header === void 0 ? 'logo' : _props$header,
      _props$logo = props.logo,
      logo = _props$logo === void 0 ? 'logo' : _props$logo,
      _props$location = props.location,
      location = _props$location === void 0 ? '' : _props$location,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? 'dark' : _props$theme,
      _props$onCollapse = props.onCollapse,
      onCollapse = _props$onCollapse === void 0 ? noop : _props$onCollapse,
      _props$renderToggleBu = props.renderToggleButton,
      renderToggleButton = _props$renderToggleBu === void 0 ? defaultToggleButtonRender : _props$renderToggleBu;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var onItemClick = (0, _react.useCallback)(function (data) {
    _umi.router.push(data.key);
  }, []);
  var currentkeys = (0, _react.useMemo)(function () {
    return location.pathname.split('/').slice(1).reduce(function (res, item, index) {
      var current = index === 0 ? "/".concat(item) : "".concat(res[index - 1], "/").concat(item);
      res[index] = current;
      return res;
    }, []);
  }, [location]);
  var onCollapseClick = (0, _react.useCallback)(function () {
    setCollapsed(!collapsed);
    onCollapse(!collapsed);
    setTimeout(function () {
      // 触发rezise，比如一些tooltips依赖resize重新定位
      window.dispatchEvent(new Event('resize'));
    }, 200); // 延迟发送，等待dom修改完毕
  }, [collapsed]);

  var toggleButton = _react.default.cloneElement(renderToggleButton(collapsed), {
    onClick: onCollapseClick,
    className: "collapse-btn"
  });

  return _react.default.createElement(_antd.Layout, {
    className: "".concat(collapsed ? 'collapsed' : '', " ii-basic-layout ii-layout-theme-").concat(theme)
  }, _react.default.createElement(Sider, {
    collapsible: true,
    collapsed: collapsed,
    width: siderWidth,
    collapsedWidth: "64",
    theme: theme
  }, _react.default.createElement("div", {
    className: "logo-section"
  }, logo), _react.default.createElement(_antd.Menu, {
    defaultSelectedKeys: currentkeys,
    defaultOpenKeys: currentkeys,
    mode: "inline",
    theme: theme,
    onClick: onItemClick
  }, mapMenuItemFromRoute(routes)), toggleButton), _react.default.createElement(_antd.Layout, null, _react.default.createElement(Header, null, header), _react.default.createElement(Content, null, props.children)));
};

IILayout.propTypes = {
  routes: _propTypes.default.array.isRequired,
  header: _propTypes.default.node.isRequired,
  logo: _propTypes.default.node.isRequired,
  location: _propTypes.default.object.isRequired,
  theme: _propTypes.default.oneOf(['dark', 'light'])
};
var _default = IILayout;
exports.default = _default;
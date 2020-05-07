"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBreadcrumbs = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _navlink = _interopRequireDefault(require("umi/navlink"));

var _reactRouterBreadcrumbsHoc = _interopRequireDefault(require("react-router-breadcrumbs-hoc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const routes = [
//   { path: '/', breadcrumb: '首页' },
//   { path: '/member-management', breadcrumb: '成员管理' },
//   { path: '/account-center', breadcrumb: '账户中心' },
//   { path: '/account-center/basic-info', breadcrumb: '基本信息' },
// ];
var Breadcrumbs = function Breadcrumbs(props) {
  var breadcrumbs = props.breadcrumbs;
  return _react.default.createElement("div", {
    className: "ii-breadcrumbs"
  }, breadcrumbs.map(function (_ref, index) {
    var breadcrumb = _ref.breadcrumb,
        match = _ref.match;
    // 暂时只显示中文路径
    return !/[0-9a-zA-Z]/.test(breadcrumb.props.children) && _react.default.createElement("span", {
      key: match.url
    }, _react.default.createElement("i", null, " > "), _react.default.createElement(_navlink.default, {
      to: match.url,
      exact: true
    }, breadcrumb));
  }));
}; // 根据传入的routes生成上面带全部pathd路径和breadcrumb的数组


var recursiveCreateRoutes = function recursiveCreateRoutes() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var prePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return routes.reduce(function (routeList, item) {
    var _item$name = item.name,
        name = _item$name === void 0 ? '' : _item$name,
        _item$path = item.path,
        path = _item$path === void 0 ? '' : _item$path,
        _item$routes = item.routes,
        itemRoutes = _item$routes === void 0 ? [] : _item$routes;
    routeList.push({
      path: path,
      breadcrumb: name
    });

    if (itemRoutes.length > 0) {
      routeList = routeList.concat(recursiveCreateRoutes(itemRoutes, path));
    }

    return routeList;
  }, []);
};

var createBreadcrumbs = function createBreadcrumbs(routes) {
  var excludePaths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var routeList = recursiveCreateRoutes(routes);
  return (0, _reactRouterBreadcrumbsHoc.default)(routeList, {
    excludePaths: excludePaths
  })(Breadcrumbs);
};

exports.createBreadcrumbs = createBreadcrumbs;

var _default = (0, _reactRouterBreadcrumbsHoc.default)()(Breadcrumbs);

exports.default = _default;
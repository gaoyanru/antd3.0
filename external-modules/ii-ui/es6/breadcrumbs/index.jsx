import React from 'react'
import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

// const routes = [
//   { path: '/', breadcrumb: '首页' },
//   { path: '/member-management', breadcrumb: '成员管理' },
//   { path: '/account-center', breadcrumb: '账户中心' },
//   { path: '/account-center/basic-info', breadcrumb: '基本信息' },
// ];

const Breadcrumbs = props => {
  const { breadcrumbs } = props
  return <div className="ii-breadcrumbs">
    {
      breadcrumbs.map(({ breadcrumb, match }, index) => {
        // 暂时只显示中文路径
      return !/[0-9a-zA-Z]/.test(breadcrumb.props.children) && <span key={match.url}>
        <i> > </i>
        <NavLink to={match.url} exact>{ breadcrumb }</NavLink>
      </span>
    })
    }
  </div>
}

// 根据传入的routes生成上面带全部pathd路径和breadcrumb的数组
const recursiveCreateRoutes = (routes = [], prePath = '') => routes.reduce((routeList, item) => {
  const { name = '', path = '', routes: itemRoutes = [] } = item
    routeList.push({ path, breadcrumb: name })
  if (itemRoutes.length > 0) {
    routeList = routeList.concat(recursiveCreateRoutes(itemRoutes, path))
  }
  
  return routeList
}, [])


const createBreadcrumbs = (routes, excludePaths = []) => {
  const routeList = recursiveCreateRoutes(routes)
    return withBreadcrumbs(routeList, { excludePaths })(Breadcrumbs)
}

export default withBreadcrumbs()(Breadcrumbs)

export {
  createBreadcrumbs
}
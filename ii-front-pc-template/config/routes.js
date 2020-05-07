/**
 * 路由配置文件
 */

const routes = [{
    path: '/login',
    // name: '首页',
    component: './login/index',
  },
  {
    path: '/',
    name: '首页',
    component: '../layouts/index',
    routes: [{
        path: '/', // 子路由的第一个路由放置一个重定向，设置默认显示的路由地址
        exact: true,
        redirect: '/account-center/basic-info',
      },{
        path: '/list', // 子路由的第一个路由放置一个重定向，设置默认显示的路由地址
        name: '项目列表',
        icon: 'iconshunxu',
        component: './project',
        isMenuItem: true,
      },
      {
        path: '/account-center',
        name: '账户中心',
        icon: 'iconzhanghuzhongxin',
        component: './account-center',
        isMenuItem: true,
        routes: [{
          path: '/account-center',
          redirect: '/account-center/basic-info',
          exact: true
        },
          {
            path: '/account-center/basic-info',
            name: '基本信息',
            isMenuItem: true,
            component: './account-center/children/basic-info'
          },
        ]
      },
    ]
  },
]

module.exports = routes

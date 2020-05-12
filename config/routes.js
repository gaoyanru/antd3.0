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
      }, {
        path: '/riskassessment-model-management', // 子路由的第一个路由放置一个重定向，设置默认显示的路由地址
        icon: 'icon-fengping',
        name: '风评模型管理',
        isMenuItem: true,
        routes: [{
          path: '/riskassessment-model-management',
          redirect: '/riskassessment-model-management/list',
          exact: true
        }, {
          path: '/riskassessment-model-management/list',
          component: './riskassessment-model-management/children/list'
        }, {
          path: '/riskassessment-model-management/detail',
          name: '添加模型',
          component: './riskassessment-model-management/children/list/detail'
        }]
      }, {
        path: '/basedata-countermeasures',
        icon: 'icon-huanjie',
        name: '缓解措施',
        isMenuItem: true,
        routes: [{
          path: '/basedata-countermeasures',
          redirect: '/basedata-countermeasures/list',
          exact: true
        }, {
          path: '/basedata-countermeasures/list',
          component: './basedata-countermeasures/children/list'
        }]
      }, {
        path: '/basedata-attack-test-cases',
        icon: 'icon-gongjilujing',
        name: '攻击路径库',
        isMenuItem: true,
        routes: [{
          path: '/basedata-attack-test-cases',
          redirect: '/basedata-attack-test-cases/list',
          exact: true
        }, {
          path: '/basedata-attack-test-cases/list',
          component: './basedata-attack-test-cases/children/list'
        }]
      }, {
        path: '/basedata-vulnerability',
        icon: 'icon-cuiruoxing',
        name: '脆弱性基础库',
        isMenuItem: true,
        routes: [{
          path: '/basedata-vulnerability',
          redirect: '/basedata-vulnerability/list',
          exact: true
        }, {
          path: '/basedata-vulnerability/list',
          component: './basedata-vulnerability/children'
        }, {
          path: '/basedata-vulnerability/list/:type?',
          component: './basedata-vulnerability/children'
        }]
      }, {
        path: '/basedata-threat-firsts',
        icon: 'icon-weixianweixie',
        name: '威胁性场景库',
        isMenuItem: true,
        routes: [{
          path: '/basedata-threat-firsts',
          redirect: '/basedata-threat-firsts/list',
          exact: true
        }, {
          path: '/basedata-threat-firsts/list',
          component: './basedata-threat-firsts/children'
        }, {
          path: '/basedata-threat-firsts/list/:type?',
          component: './basedata-threat-firsts/children'
        }]
      }, {
        path: '/basedata-assets',
        icon: 'icon-zichan',
        name: '资产库',
        isMenuItem: true,
        routes: [{
          path: '/basedata-assets',
          redirect: '/basedata-assets/list',
          exact: true
        }, {
          path: '/basedata-assets/list',
          component: './basedata-assets/children'
        }]
      }, {
        path: '/resource-association',
        icon: 'icon-zichan',
        name: '资产关联库',
        isMenuItem: true,
        routes: [{
          path: '/resource-association',
          redirect: '/resource-association/assets-threat/list',
          exact: true
        }, {
          path: '/resource-association/assets-threat/list',
          name: '资产-威胁关系映射',
          isMenuItem: true,
          component: './resource-association/children/assets-threat'
        }]
      }
    ]
  },
]

module.exports = routes

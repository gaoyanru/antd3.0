const env = process.env.RUNTIME_ENV

const envList = ['default', 'development', 'production']

if (typeof env === 'undefined' || envList.indexOf(env) === -1) {
  throw new Error('RUNTIME_ENV is undefined, should set env param RUNTIME_ENV')
}

const projectConfigMap = {
  'default': {
    cdnPrefix: "/", // less变量为空字符串会有问题
    // 后端接口地址
    apiPrefix: 'http://ras.dev.ii-ai.tech/risk-assessment/api/v1/',
    // 用户中心登录页地址
    // userCenter: 'http://qa.zarab-front.ii-ai.tech/account',
    // 用户中心后台接口地址
    // saasApiPrefix: 'http://dev.apis.ii-ai.tech/dev/uic/api'
  },

  'development': {
    // 后端接口地址
    apiPrefix: 'http://ras.dev.ii-ai.tech/risk-assessment/api/v1/',
    // 用户中心登录页地址
    // userCenter: 'http://qa.zarab-front.ii-ai.tech/account',
    // 用户中心后台接口地址
    // saasApiPrefix: 'http://dev.apis.ii-ai.tech/dev/uic/api'
  },

  'production': {
    // 后端接口地址
    // apiPrefix: 'http://dev.apis.ii-ai.tech/dev/open/skydon/api/v1',
    // // 用户中心登录页地址
    // userCenter: 'http://localhost:8001/account',
    // // 用户中心后台接口地址
    // saasApiPrefix: 'http://172.16.0.251:8089'
  }

}

const projectConfig = {
  ...projectConfigMap['default'],
  ...projectConfigMap[env],
}

console.log('env is', env, 'projectConfig is', projectConfig)

module.exports = projectConfig
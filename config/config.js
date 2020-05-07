const path = require('path')
const routes = require('./routes')
const projectConfig = require('./project.config.js')

// ref: https://umijs.org/config/
export default {
  routes,
  history: 'hash',
  treeShaking: true,
  disableCSSModules: true,
  alias: {
    '~': './node_modules/',
    'src': path.resolve(__dirname, '../src'),
    'config': path.resolve(__dirname, './'),
    'ii-ui': path.resolve(__dirname, '../external-modules/ii-ui/'),
    'ii-utils': path.resolve(__dirname, '../external-modules/ii-utils/'),
  },
  lessLoaderOptions: {
    globalVars: {
      cdnPrefix: projectConfig.cdnPrefix
    },
    javascriptEnabled: true
  },
  extraBabelIncludes: [
    // '/node_modules/ii-ui',
    // path.resolve('../node_modules/ii-utils/index.js'),
    /\/ii\-utils\//,
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      dva: {
        immer: true,
      },
      dynamicImport: { webpackChunkName: true },
      title: 'code',
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  define: {
    __CDN_PREFIX__: projectConfig.cdnPrefix,
    __API_PREFIX__: projectConfig.apiPrefix,
    __USER_CENTER__: projectConfig.userCenter,
    __SAAS_API_PREFIX__: projectConfig.saasApiPrefix
  },
  chainWebpack(config, { webpack }) {
    config
      .plugin('Provider')
        .use(webpack.ProvidePlugin, [{
          log: 'ii-utils/log',
          noop: 'ii-utils/noop',
        }])
      .end()
    }
}

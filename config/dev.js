/**
 * const prefixCls = 'style-154847';
 * const images = '/static/images/config';
 * @Author: czy0729
 * @Date: 2019-02-20 12:43:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 05:38:24
 * @Path /config/dev.js
 */
// NOTE H5 端使用 devServer 实现跨域，需要修改 package.json 的运行命令，加入环境变量
const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://api.bgm.tv"'

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST
  },
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        },
        '/oauth/access_token/': {
          target: JSON.parse('"https://bgm.tv/"'),
          changeOrigin: true
        }
      },
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
      inline: true,
      progress: true
    }
  }
}

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG:'"dev"',
  API_ROOT: '"http://172.16.0.107:8085/app',
  // API_ROOT: '"http://172.16.11.157:8085/app"',
  // API_ROOT: '"http://172.16.11.138:8085/app"',
  OUTSIDE_ROOT: '"http://172.16.0.151:8085/outside/api/outside"',
  WEBSOCKET_ROOT: '"http://172.16.0.151:8091/"'

  /**
   * ip for gxkai
   */
  // API_ROOT: '"http://192.168.31.228:8085/app/"',
  // OUTSIDE_ROOT: '"http://192.168.31.228:8085/outside/outside"',
  // WEBSOCKET_ROOT: '"http://192.168.31.228:8091/"'

  /**
   * ip for wjw
   */
  // API_ROOT: '"http://172.16.11.138:8085/app/api"',
  // OUTSIDE_ROOT: '"http://172.16.11.138:8085/outside/outside"',
  // WEBSOCKET_ROOT: '"http://172.16.11.138:8091/"'
})

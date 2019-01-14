'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG:'"test"',
  // API_ROOT: '"https://ebhealth.cn:19004/api/app/api"',
  // OUTSIDE_ROOT: '"https://ebhealth.cn:19004/api/outside/outside"',
  // WEBSOCKET_ROOT: '"https://ebhealth.cn:19004/websocket"'
  API_ROOT: '"http://localhost:8085/app/api"',
  OUTSIDE_ROOT: '"http://localhost:8085/outside/outside"',
  WEBSOCKET_ROOT: '"http://localhost:8091/"'
})

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SHOP_ROOT: '"https://ebhealth.cn:19004/api/shop"',
  WEBSOCKET_ROOT: '"https://ebhealth.cn:19004/websocket"',
  APP_ROOT: '"https://ebhealth.cn:19004/api/app"',
  SUPERVISE_ROOT: '"https://ebhealth.cn:19004/api/supervise"'
  // SHOP_ROOT: '"http://localhost:8085/shop"',
  // WEBSOCKET_ROOT: '"http://localhost:8091/"',
  // APP_ROOT: '"http://localhost:8085/app"',
  // SUPERVISE_ROOT: '"http://localhost:8085/supervise"'
})

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://localhost:8081/api"',
  // OUTSIDE_ROOT: '"http://localhost:8083/api/outside"'
  API_ROOT: '"http://58.210.169.168:8081/api"',
  OUTSIDE_ROOT: '"http://58.210.169.168:8083/api/outside"'
})

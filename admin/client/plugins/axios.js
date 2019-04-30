/* eslint-disable no-debugger */
import axios from 'axios'
import {getToken, removeToken} from '../mixins'

axios.interceptors.request.use(
  async config => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 400) {
        removeToken()
        this.$router.redirect('/login')
        // 只有在当前路由不是登录页面才跳转
        // console.log('router：')
        // console.log(this.router.redirect())
        // this.router.push({
        //   path: '/login'
        // })
        // router.currentRoute.path !== '/login' &&
        // router.replace({
        //   path: '/login',
        //   query: { redirect: router.currentRoute.path },
        // })
      }
    }

    return Promise.reject(error.response.data)
  }
)

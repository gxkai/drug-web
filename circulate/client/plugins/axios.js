/* eslint-disable no-debugger */
import axios from 'axios'
import {getToken, removeToken} from '../mixins'

export default ({ redirect }) => {
  axios.interceptors.request.use(
    async config => {
      /**
       * process.env.NODE_ENV: 判断开发模式
       * @type {string}
       */
      config.baseURL = process.env.NODE_ENV !== 'production' ? 'http://172.16.11.140:8090' : 'http://172.16.11.140:8090'
      const token = await getToken()
      if (token) {
        config.headers.Authorization = token
      } else {
        redirect('/login')
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
          redirect('/login')
        }
        if (error.response.status === 500) {
          console.log(1)
          // removeToken()
          // redirect('/login')
        }
      }
      return Promise.reject(error)
    }
  )
}

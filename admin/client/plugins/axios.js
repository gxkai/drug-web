/* eslint-disable no-debugger */
import axios from 'axios'
import { getToken, removeToken } from '../mixins'

axios.interceptors.request.use(
  async config => {
    config.baseURL = process.env.NODE_ENV !== 'production' ? 'http://172.16.11.140:8091' : 'http://172.16.11.140:8091'
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
      if (error.response.status === 401) {
        removeToken()
      }
    }

    return Promise.reject(error.response.data)
  }
)

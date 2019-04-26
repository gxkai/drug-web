/* eslint-disable no-debugger */
import axios from 'axios'
import {setToken, getToken, removeToken} from '../mixins'

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
      if (error.response.status === 401) {
        removeToken()
        this.router.replace('/login')
      }
    }
  }
)

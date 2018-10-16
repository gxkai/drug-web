import axios from 'axios';
import { getToken } from './auth';
axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.timeout = 50000;
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    };
    config.validateStatus = status => {
      return status === 200;
    };
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = 'http://www.baidu.com';
      }
    }
    return Promise.reject(error);
  });

export default axios;

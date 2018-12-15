import axios from 'axios';
import { getToken, removeLogin } from './auth';
import { Toast } from 'vant';
axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.timeout = 500000;
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
          removeLogin();
          window.location.href = 'https://ebank.96079.com.cn/quyiyuan_zhks/';
          break;
        case 400:
          if (error.response.data.fieldErrors === true) {
            Toast(error.response.data.fieldErrors[0].message);
          } else {
            Toast(error.response.data.message);
          }
          break;
        default:
          Toast('网络异常');
          break;
      }
    }
    return Promise.reject(error);
  });
export default axios;

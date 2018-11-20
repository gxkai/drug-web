import axios from 'axios';
import { getToken, removeLogin } from './auth';
import { Toast } from 'vant';
import router from '../../router';
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
          removeLogin();
          router.push('/login');
          break;
        case 400:
          if (error.response.data.fieldErrors) {
            Toast(error.response.data.fieldErrors[0].message);
          }
          if (error.response.data.message) {
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

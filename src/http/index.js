import axios from 'axios';
import { getToken, removeToken } from '../storage';
import { Toast } from 'vant';
const qs = require('qs');
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
          removeToken();
          Toast('登陆失效，请重新从趣医入口进入');
          break;
        case 400:
          if (error.response.data.fieldErrors !== undefined && error.response.data.fieldErrors !== null) {
            Toast(error.response.data.fieldErrors[0].message);
          } else {
            Toast(`${error.response.data.message}`);
          }
          break;
        case 500:
          Toast(`${error.response.data.message}${error.response.data.exception}`);
          break;
        default:
          Toast('网络异常');
          break;
      }
    }
    return Promise.reject(error);
  });

const index = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, data, config) {
    return new Promise((resolve, reject) => {
      axios.put(url, data, config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, {
        params: params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      axios.post(url, data, config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default index;

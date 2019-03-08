import axios from 'axios';
import { Toast } from 'vant';
import router from '@/router';
import { getToken, removeToken } from '@/storage';
const qs = require('qs');
let http = axios.create({
  baseURL: process.env.SUPERVISE_ROOT,
  timeout: 50000
});
http.interceptors.request.use(
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
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          removeToken();
          Toast('账号在其他设备有登陆');
          router.push('/login');
          break;
        case 400:
          if (error.response.data.fieldErrors !== undefined && error.response.data.fieldErrors !== null) {
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
const supervise = {
  get(url, params) {
    if (params === undefined) {
      params = {};
    }
    params.date = (new Date()).getTime();
    return new Promise((resolve, reject) => {
      http.get(url, {
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
      http.put(url, data, config)
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
      http.delete(url, {
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
      http.post(url, data, config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default supervise;

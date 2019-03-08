import axios from 'axios';
import { Toast } from 'vant';
import router from '@/router';
import { getToken, removeToken } from '@/storage';
const qs = require('qs');

let httpReq = axios.create({
  baseURL: process.env.SHOP_ROOT,
  timeout: 50000
});
httpReq.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    };
    config.validateStatus = status => {
      return status === 200;
    };
    let token = getToken();
    if (token) {
      config.headers.token = token;
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

httpReq.interceptors.response.use(
  response => {
    return response.data;
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

const shop = {
  get(url, params) {
    if (params === undefined) {
      params = {};
    }
    params.date = (new Date()).getTime();
    return new Promise((resolve, reject) => {
      httpReq.get(url, {
        params: params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, data, config) {
    return new Promise((resolve, reject) => {
      httpReq.put(url, data, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      httpReq.delete(url, {
        params: params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      httpReq.post(url, data, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default shop;

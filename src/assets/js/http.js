import axios from './axios';
const qs = require('qs');
const http = {
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
export default http;

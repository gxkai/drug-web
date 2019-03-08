import axios from './axios';
const http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      axios.put(url, data)
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
        params: params
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
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

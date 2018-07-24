// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import store from './store';
import base from './assets/js/base';
import axios from 'axios';
import storage from 'good-storage';
import 'jquery';
import '../src/assets/js/flex';
import 'font-awesome/css/font-awesome.min.css';
import '../src/assets/css/bulma.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import BaiduMap from 'vue-baidu-map';

axios.defaults.baseURL = process.env.API_ROOT;
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    };
    config.validateStatus = status => {
      return status === 200;
    };
    const token = store.getters.token || storage.get('token');
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
          store.commit('SETTOKEN', '');
          store.commit('SETACCOUNT', {});
          router.push({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          });
      }
    }
    return Promise.reject(error);
  });

Vue.prototype.$http = axios;
Vue.prototype.$storage = storage;
Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(VueAwesomeSwiper);
Vue.use(base);
Vue.use(BaiduMap, {
  ak: 'FG7wxr1VUj0k2NwoO3yXzymd&services=&t=20170517145936'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

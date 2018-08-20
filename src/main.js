// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import store from './store';
import base from './assets/js/function';
import component from './assets/js/component';
import axios from 'axios';
import storage from 'good-storage';
import 'jquery';
import '../src/assets/js/flex';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import BaiduMap from 'vue-baidu-map';
import fastclick from 'fastclick';
import VueTouch from 'vue-touch';
import filters from './assets/js/filters';
// import './assets/js/vconsole';

import 'vue-event-calendar/dist/style.css';
import vueEventCalendar from 'vue-event-calendar';
Vue.use(vueEventCalendar, {locale: 'zh'});

axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.timeout = 5000;
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
          store.commit('SET_TOKEN', '');
          store.commit('SET_ACCOUNT', {});
          router.push({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          });
      }
    }
    return Promise.reject(error);
  });
Vue.prototype.$http = axios;
Vue.prototype.$outside = process.env.OUTSIDE_ROOT;
Vue.prototype.$storage = storage;
Vue.config.productionTip = false;
Vue.use(MintUI, {
  lazyload: {
    preLoad: 1.3,
    error: require('./assets/image/lazyLoad/default.png'),
    loading: require('./assets/image/lazyLoad/loading.gif'),
    attempt: 1,
    throttleWait: 100,
    filter: {
      webp(listener, options) {},
      progressive(listener, options) {}
    }
  }
});
Vue.use(VueAwesomeSwiper);
Vue.use(base);
Vue.use(component);
Vue.use(BaiduMap, {
  ak: 'FG7wxr1VUj0k2NwoO3yXzymd&services=&t=20170517145936'
});
/**
 * 解决移动端点击事件延迟
 */
fastclick.attach(document.body);
/**
 * 左滑动
 */
Vue.use(VueTouch, {name: 'v-touch'});
VueTouch.config.swipe = {
  direction: 'horizontal',
  threshold: 200
};
/**
 * 过滤器
 */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

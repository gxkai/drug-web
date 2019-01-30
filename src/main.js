// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import base from './utils';
import component from './components';
import http from './http';
import api from './api';
import storage from 'good-storage';
import './plugins/flex';
import VueAwesomeSwiper from './plugins/vue-awesome-swiper';
import BaiduMap from 'vue-baidu-map';
import fastclick from 'fastclick';
import filters from './filters';
import './icons/iconfont.css';
import './icons/vanIcon.css';
import './plugins/vconsole';
import _ from 'lodash';
import './plugins/vue-event-calendar/dist/style.css';
import vueEventCalendar from './plugins/vue-event-calendar';
import { Step,
  Steps,
  Actionsheet,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Popup,
  Loading,
  SwipeCell,
  Dialog,
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Row,
  Col,
  Swipe,
  SwipeItem,
  RadioGroup,
  Radio,
  SubmitBar,
  Rate,
  Button,
  Stepper,
  Search,
  List,
  PullRefresh,
  Field,
  CheckboxGroup,
  Checkbox,
  Tab,
  Tabs,
  Toast,
  Lazyload,
  Collapse,
  CollapseItem,
  Uploader,
  Picker } from 'vant';
import router from './router';
import Navigation from 'vue-navigation';
Vue.use(Navigation, { router });
Vue.use(Actionsheet).use(GoodsAction)
  .use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn)
  .use(Popup)
  .use(Loading)
  .use(SwipeCell)
  .use(Dialog)
  .use(NavBar)
  .use(Icon)
  .use(Cell)
  .use(CellGroup)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(RadioGroup)
  .use(Radio)
  .use(SubmitBar)
  .use(Rate)
  .use(Button)
  .use(Stepper)
  .use(Search)
  .use(List)
  .use(PullRefresh)
  .use(Field)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(Collapse)
  .use(CollapseItem)
  .use(Uploader)
  .use(Picker)
  .use(Step)
  .use(Steps)
  .use(Lazyload, {
    preLoad: 1,
    error: require('./assets/image/lazyLoad/default.png'),
    loading: require('./assets/image/lazyLoad/loading.gif'),
    attempt: 3
  });
Vue.use(vueEventCalendar, { locale: 'zh', className: '' });
Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.$storage = storage;
Vue.prototype._ = _;
Vue.config.productionTip = false;
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

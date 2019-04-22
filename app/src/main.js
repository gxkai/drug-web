// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.util.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import store from '@/store';
import component from '@/components';
import http from '@/http';
import api from '@/api';
import storage from 'good-storage';
import 'lib-flexible';
import 'normalize.css';
import BaiduMap from 'vue-baidu-map';
import fastclick from 'fastclick';
import filters from '@/filters';
import '@/icons/iconfont.css';
import dui from '@/components/global/dui';
import '@/plugins/vconsole';
import _ from 'lodash';
import directive from '@/directives';
import VueI18n from 'vue-i18n';
import mixinIndx from '@/mixins';
import {
  Step,
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
  Tag,
  Picker
} from 'vant';
import router from '@/router';
import Navigation from 'vue-navigation';
Vue.use(dui);
Vue.use(VueI18n);
Vue.use(directive);
Vue.use(Navigation, { router });
Vue.use(Actionsheet)
  .use(GoodsAction)
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
  .use(Tag)
  .use(Lazyload, {
    preLoad: 1,
    error: require('@/assets/img/lazyLoad/default.png'),
    loading: require('@/assets/img/lazyLoad/loading.png'),
    attempt: 0,
    throttleWait: 100
  });
Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.$storage = storage;
Vue.prototype._ = _;
Vue.config.productionTip = false;
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
/**
 * 多语言
 */
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    zh: require('./lang/zh')
  }
});
// 混入
Vue.mixin(mixinIndx);
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
});

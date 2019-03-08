// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './plugins/flex.js';
import shop from './http/shop';
import supervise from './http/supervise';
import './icons/iconfont.css';
import Navigation from 'vue-navigation';
import Mui from 'vue-awesome-mui';
import component from './components';
import filters from './filters';
// import 'vue-awesome-mui/mui/dist/css/mui.css';
// mount with global
import {Actionsheet,
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
  Picker,
  Notify} from 'vant';
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
  .use(Notify)
  .use(Lazyload, {
    preLoad: 1,
    error: require('./assets/image/lazyLoad/default.png'),
    loading: require('./assets/image/lazyLoad/loading.gif'),
    attempt: 3
  });
Vue.use(Mui);
Vue.use(Navigation, {router})
Vue.use(component);
Vue.prototype.$shop = shop;
Vue.prototype.$supervise = supervise;
Vue.prototype.getImgURL = (fileId, resolution) => {
  resolution = resolution || 'LARGE_LOGO';
  return `${process.env.APP_ROOT}/api/files/${fileId}/image?resolution=${resolution}`;
};

Vue.config.productionTip = false;
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

export default {
  install(Vue) {
    // 星星组件
    Vue.component('new-star', () => import('./global/star'));
    // 没有数据
    Vue.component('new-end', () => import('./global/end'));
    // radio组件
    Vue.component('new-radio', () => import('./global/radio'));
    // 加减器
    Vue.component('new-stepper', () => import('./global/stepper'));
    // top center bottom 三块布局
    Vue.component('new-layout', () => import('./global/layout'));
    // 悬浮窗
    Vue.component('new-move', () => import('./global/move'));
    // 上下留白
    Vue.component('new-white-space', () => import('./global/whiteSpace'));
    // 左右留白
    Vue.component('new-wing-blank', () => import('./global/wingBlank'));
    // 提交栏
    Vue.component('new-submit-bar', () => import('./global/submitBar'));
    // 图片带处方标志
    Vue.component('new-image', () => import('./global/image'));
    // 竖线
    Vue.component('new-line', () => import('./global/line'));
    // 咨询小人
    Vue.component('new-consult', () => import('./global/consult'));
    // 药品
    Vue.component('new-drug', () => import('./global/drug'));
    // 医院
    Vue.component('new-hospital', () => import('./global/hospital'));
    // 药店
    Vue.component('new-shop', () => import('./global/shop'));
    // 筛选栏
    Vue.component('new-filter-bar', () => import('./global/filterBar'));
    // 搜索栏
    Vue.component('new-search-bar', () => import('./global/searchBar'));
    // 提交按钮
    Vue.component('new-submit-button', () => import('./global/submitButton'));
    // 二次封装的图标
    Vue.component('new-icon', () => import('./global/icon'));
    // 底部入口
    Vue.component('new-footer-entry', () => import('./global/footerEntry'));
  }
};

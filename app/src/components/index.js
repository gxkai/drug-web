export default {
  install(Vue, options) {
    // 星星组件
    Vue.component('new-star', () => import('./star'));
    // 没有数据
    Vue.component('new-end', () => import('./end'));
    // radio组件
    Vue.component('new-radio', () => import('./radio'));
    // 加减器
    Vue.component('new-stepper', () => import('./stepper'));
    // top center bottom 三块布局
    Vue.component('new-layout', () => import('./layout'));
    // 悬浮窗
    Vue.component('new-move', () => import('./move'));
    // 上下留白
    Vue.component('new-white-space', () => import('./whiteSpace'));
    // 左右留白
    Vue.component('new-wing-blank', () => import('./wingBlank'));
    // 提交栏
    Vue.component('new-submit-bar', () => import('./submitBar'));
    // 图片带处方标志
    Vue.component('new-image', () => import('./image'));
    // 竖线
    Vue.component('new-line', () => import('./line'));
    // 咨询小人
    Vue.component('new-consult', () => import('./consult'));
    // 按钮
    Vue.component('new-button', () => import('./button'));
    // 药品
    Vue.component('new-drug', () => import('./drug'));
    // 医院
    Vue.component('new-hospital', () => import('./hospital'));
    // 药店
    Vue.component('new-shop', () => import('./shop'));
    // 筛选栏
    Vue.component('new-filter-bar', () => import('./filterBar'));
    // 搜索栏
    Vue.component('new-search-bar', () => import('./searchBar'));
    // 地址列表
    Vue.component('new-addresses', () => import('./addresses'));
    // 提交按钮
    Vue.component('new-submit-button', () => import('./submitButton'));
    // 二次封装的图标
    Vue.component('new-icon', () => import('./icon'));
  }
};

export default {
  install(Vue, options) {
    // 自定义头, TODO 移除
    Vue.component('new-header', () => import('./header'));
    // 星星组件
    Vue.component('new-star', () => import('./star'));
    // 没有数据
    Vue.component('new-no-data', () => import('./noData'));
    // 购物车预结算标签
    Vue.component('new-close-list', () => import('./closeList'));
    // 药品列表药品标签
    Vue.component('new-drug-item', () => import('./drugItem'));
    // radio组件
    Vue.component('new-radio', () => import('./radio'));
    // 订单列表切换组件
    Vue.component('new-order-tab', () => import('./orderTab'));
    // 我的收藏切换组件
    Vue.component('new-collect-tab', () => import('./collectTab'));
    // 药品详情页切换组件
    Vue.component('new-drug-tab', () => import('./drugTab'));
    // 订单列表标签
    Vue.component('new-order-item', () => import('./orderItem'));
    // 订单详情标签
    Vue.component('new-order-view-item', () => import('./orderViewItem'));
    // 药房预结算标签
    Vue.component('new-close-shop', () => import('./closeShop'));
    // 让利惠民倒计时组件
    Vue.component('new-time-down', () => import('./timeDown'));
    // 处方列表倒计时组件
    Vue.component('new-count-down', () => import('./countDown'));
    // 首页二级标题
    Vue.component('new-header-sec', () => import('./headerSec'));
    // 我的评价标签
    Vue.component('new-appraise-item', () => import('./appraiseItem'));
    // 优惠券标签
    Vue.component('new-coupon-item', () => import('./couponItem'));
    // 优惠券详情标签
    Vue.component('new-coupon-record-item', () => import('./couponRecordItem'));
    // 处方药房标签
    Vue.component('new-rx-shop-item', () => import('./rxShopItem'));
    // 处方医院标签
    Vue.component('new-rx-hospital-item', () => import('./rxHospitalItem'));
    // 加减器
    Vue.component('new-stepper', () => import('./stepper'));
    // top center bottom 三块布局
    Vue.component('new-layout', () => import('./layout'));
  }
};

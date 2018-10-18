export default {
  install(Vue, options) {
    Vue.component('new-header', () => import('../../components/header'));
    Vue.component('new-star', () => import('../../components/star'));
    Vue.component('new-no-data', () => import('../../components/noData'));
    Vue.component('new-edit-line', () => import('../../components/editLine'));
    Vue.component('new-close-list', () => import('../../components/closeList'));
    Vue.component('new-drug-refund', () => import('../../components/drugRefund'));
    Vue.component('refund-drug', () => import('../../components/refundDrugs'));
    Vue.component('new-drug-item', () => import('../../components/drugItem'));
    Vue.component('new-radio', () => import('../../components/radio'));
    Vue.component('new-pay-order-item', () => import('../../components/payOrderItem'));
    Vue.component('new-order-tab', () => import('../../components/orderTab'));
    Vue.component('new-collect-tab', () => import('../../components/collectTab'));
    Vue.component('new-drug-tab', () => import('../../components/drugTab'));
    Vue.component('new-order-item', () => import('../../components/orderItem'));
    Vue.component('new-order-view-item', () => import('../../components/orderViewItem'));
    Vue.component('new-close-shop', () => import('../../components/closeShop'));
    Vue.component('new-take-list', () => import('../../components/takeList'));
    Vue.component('new-refund', () => import('../../components/refund'));
    Vue.component('new-time-down', () => import('../../components/timeDown'));
    Vue.component('new-count-down', () => import('../../components/countDown'));
    Vue.component('new-header-sec', () => import('../../components/headerSec'));
    Vue.component('new-appraise-item', () => import('../../components/appraiseItem'));
    Vue.component('new-coupon-item', () => import('../../components/couponItem'));
    Vue.component('new-coupon-record-item', () => import('../../components/couponRecordItem'));
    Vue.component('new-rx-shop-item', () => import('../../components/rxShopItem'));
    Vue.component('new-rx-hospital-item', () => import('../../components/rxHospitalItem'));
    Vue.component('new-stepper', () => import('../../components/stepper'));
    Vue.component('new-layout', () => import('../../components/layout'));
  }
};

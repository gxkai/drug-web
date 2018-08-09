import newHeader from '../../components/header';
import newStar from '../../components/star';
import newFooter from '../../components/footer';
import newNoData from '../../components/noData';
import newEditDiv from '../../components/editDiv';
import newEditLine from '../../components/editLine';
import newMain from '../../components/main';
import newCloseList from '../../components/closeList';
import newLine from '../../components/line';
import newShops from '../../components/shops';
import joinCar from '../../components/joinCar';
import drugRefund from '../../components/drugRefund';
import drugs from '../../components/drugs';
import refundDrugs from '../../components/refundDrugs';
import drugShops from '../../components/drugShops';
import newRadio from '../../components/radio';
import newPayList from '../../components/payList';
import newOrderTab from '../../components/orderTab';
import newOrder from '../../components/order';
import newAllData from '../../components/allData';
import newLoading from '../../components/loading';
import rxCart from '../../components/rxCart';
import newCloseNormal from '../../components/closeNormal';
import newDrugBottom from '../../components/drugBottom';
import drugSearch from '../../components/drugSearch';
import newCloseHospital from '../../components/closeHospital';
import newTakeList from '../../components/takeList';
import newRefund from '../../components/refund';
import newTimeDown from '../../components/timeDown';
import newCountDown from '../../components/countDown';
import newcoupon from '../../components/coupon';

export default {
  install(Vue, options) {
    Vue.component('new-header', newHeader);
    Vue.component('new-star', newStar);
    Vue.component('new-footer', newFooter);
    Vue.component('new-no-data', newNoData);
    Vue.component('new-edit-div', newEditDiv);
    Vue.component('new-edit-line', newEditLine);
    Vue.component('new-main', newMain);
    Vue.component('new-shop', newShops);
    Vue.component('new-close-list', newCloseList);
    Vue.component('new-line', newLine);
    Vue.component('new-join-car', joinCar);
    Vue.component('new-drug-refund', drugRefund);
    Vue.component('new-drug', drugs);
    Vue.component('refund-drug', refundDrugs);
    Vue.component('new-drug-shops', drugShops);
    Vue.component('new-radio', newRadio);
    Vue.component('new-pay-list', newPayList);
    Vue.component('new-order-tab', newOrderTab);
    Vue.component('new-order', newOrder);
    Vue.component('new-all-data', newAllData);
    Vue.component('new-loading', newLoading);
    Vue.component('new-rxCart', rxCart);
    Vue.component('new-close-normal', newCloseNormal);
    Vue.component('new-drug-buttom', newDrugBottom);
    Vue.component('drug-search', drugSearch);
    Vue.component('new-close-hospital', newCloseHospital);
    Vue.component('new-take-list', newTakeList);
    Vue.component('new-refund', newRefund);
    Vue.component('new-time-down', newTimeDown);
    Vue.component('new-count-down', newCountDown);
    Vue.component('new-coupon', newcoupon);
  }
};

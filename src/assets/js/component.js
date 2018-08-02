import newHeader from '../../components/header';
import newStar from '../../components/start';
import newFooter from '../../components/footer';
import newNoData from '../../components/noData';
import newEditDiv from '../../components/editDiv';
import newEditLine from '../../components/editLine';
import newMain from '../../components/main';
import newCloseList from '../../components/closeList';
import newLine from '../../components/line';
import newShops from '../../components/shops';
import newRxShopDrug from '../../components/rxshopdrug';
import joincarBottom from '../../components/joincarBottom';
import drugRefund from '../../components/drugRefund';
import drugs from '../../components/drugs';
import refundDrugs from '../../components/refund-drugs';
import drugShops from '../../components/drug-shops';
import newRadio from '../../components/radio';
import newPayList from '../../components/payList';
import newOrderTab from '../../components/orderTab';
import newOrder from '../../components/order';
import newAllData from '../../components/allData';
import newLoading from '../../components/loading';

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
    Vue.component('new-rx-shop-drugs', newRxShopDrug);
    Vue.component('new-close-list', newCloseList);
    Vue.component('new-line', newLine);
    Vue.component('new-joincar', joincarBottom);
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
  }
};

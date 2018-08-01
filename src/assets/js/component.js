import newHeader from '../../components/header';
import newStar from '../../components/start';
import newFooter from '../../components/footer';
import newNoData from '../../components/no-data';
import newEditDiv from '../../components/edit-div';
import newEditLine from '../../components/edit-line';
import newMain from '../../components/main';
import newCloseList from '../../components/close-list';
import newLine from '../../components/line';
import newShops from '../../components/shops';
import newRxShopDrug from '../../components/rxshopdrug';
import drugRefund from '../../components/drugRefund';
import drugs from '../../components/drugs';
import refundDrugs from '../../components/refund-drugs';
import drugShops from '../../components/drug-shops';

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
    Vue.component('new-drug-refund', drugRefund);
    Vue.component('new-drug', drugs);
    Vue.component('refund-drug', refundDrugs);
    Vue.component('new-drug-shops', drugShops);
  }
};

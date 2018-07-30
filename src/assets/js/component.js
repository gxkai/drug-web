import newHeader from '../../components/header';
import newStar from '../../components/start';
import newFooter from '../../components/footer';
import newNoData from '../../components/no-data';
import newEditDiv from '../../components/edit-div';
import newEditLine from '../../components/edit-line';
import newMain from '../../components/main';
import newShops from '../../components/shops';

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
  }
};

import newHeader from '../../components/header';
import newStar from '../../components/start';
import newFooter from '../../components/footer';
import newNodata from '../../components/nodata';

export default {install(Vue, options) {
  Vue.component('new-header', newHeader);
  Vue.component('new-star', newStar);
  Vue.component('new-footer', newFooter);
  Vue.component('new-nodata',newNodata);
}};

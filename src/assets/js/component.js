import newHeader from '../../components/header';
import newStar from '../../components/start';
import newFooter from '../../components/footer';

export default {install(Vue, options) {
  Vue.component('new-header', newHeader);
  Vue.component('new-star', newStar);
  Vue.component('new-footer',newFooter);
}};

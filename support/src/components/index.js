export default {
  install(Vue, options) {
    Vue.component('base-layout', () => import('./baseLayout'));
    Vue.component('no-data', () => import('./noData'));
  }
};

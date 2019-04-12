/* eslint-disable new-cap */
export default {
  install(Vue, options) {
    /**
     * 获取图片链接
     * @param fileId
     * @param resolution
     * @returns {string}
     */
    Vue.prototype.getImgURL = (fileId, resolution) => {
      resolution = resolution || 'LARGE_LOGO';
      let url = `${process.env.API_ROOT}/api/files/${fileId}/image?resolution=${resolution}`;
      return url;
    };
    /**
     * 是否处方单判断
     * @param str
     * @returns {boolean}
     */
    Vue.prototype.isRx = (str) => {
      if (str === '0' || str === null || str === 'undefined') {
        return false;
      } else {
        return true;
      }
    };

    Vue.prototype.isNotRx = (str) => {
      if (str === '0' || str === null || str === 'undefined') {
        return true;
      } else {
        return false;
      }
    };
    /**
     * 地图coordType 转换
     */
    Vue.prototype.transformCoordType = (str) => {
      switch (str) {
        case 'wgs84':
          return 'wgs84ll';
        case 'gcj02':
          return 'gcj02ll';
        case 'bd09ll':
          return 'bd09ll';
      }
    };
    /**
     * html格式化
     * @param str
     * @returns {*}
     */
    Vue.prototype.delHtmlTag = (str) => {
      return str.replace(/<[^>]+>|&[^>]+;/g, '').trim();
    };
    Vue.prototype.getUrlKey = (name) => {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
      // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href))[1].replace(/\+/g, '%20')) || null;
    };
    /**
     * 检验访问端是否是手机
     * @returns {boolean}
     */
    Vue.prototype.isMobile = () => {
      var system = {
        win: false,
        mac: false,
        xll: false,
        ipad: false
      };
      var p = navigator.platform;
      system.win = p.indexOf('Win') === 0;
      system.mac = p.indexOf('Mac') === 0;
      system.x11 = (p === 'X11') || (p.indexOf('Linux') === 0);
      system.ipad = (navigator.userAgent.match(/iPad/i) != null);
      if (system.win || system.mac || system.xll || system.ipad) {
        return false;
      } else {
        return true;
      }
    };
    /**
     * 百度地图导航
     * @param name
     * @param address
     * @param lat
     * @param lng
     */
    Vue.prototype.jumpToBaidu = (name, address, lat, lng) => {
      return `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${name}&content=${address}&output=html&src=webapp.baidu.openAPIdemo  `;
    };
    let tpl;
    let tplFlag = false;
    /**
     * 加载
     * @returns {*}
     */
    Vue.prototype.$loading = () => {
      var loading = Vue.extend(require('../components/loading.vue').default);
      tpl = new loading().$mount().$el;
      document.body.appendChild(tpl);
      tplFlag = true;
      return tpl;
    };
    Vue.mixin({
      methods: {
        hideLoading() {
          if (tplFlag) {
            document.body.removeChild(tpl);
            tplFlag = false;
          }
        }
      }
    });
  }
};

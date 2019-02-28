/* eslint-disable new-cap */
import router from '../router';

export default {
  install(Vue, options) {
    /**
     * yyyy-MM-dd
     * @param timer
     * @returns {string}
     */
    Vue.prototype.dateConvert = (timer) => {
      var date = new Date(timer);
      var Y = date.getFullYear();
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var allTime = Y + '-' + M + '-' + D;
      return allTime;
    };
    /**
     * yyyy-MM-dd hh:MM:ss
     * @param timer
     * @returns {string}
     */
    Vue.prototype.timeConvert = (timer) => {
      if (timer !== null) {
        var date = new Date(timer);
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var allTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        return allTime;
      }
    };
    /**
     * 时间戳
     * yyyy/MM/dd hh:MM:ss
     * @param timer
     * @returns {string}
     */
    Vue.prototype.timeConvert2 = (timer) => {
      var date = new Date(timer);
      var Y = date.getFullYear();
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      var allTime = Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s;
      return allTime;
    };

    Vue.prototype.getCurrentTime = () => {
      let date = new Date();
      return [date.getFullYear(), ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())].join('-') + '  ' + [(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()),
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
        (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())].join(':');
    };
    /**
     * 获取图片链接
     * @param fileId
     * @param resolution
     * @returns {string}
     */
    Vue.prototype.getImgURL = (fileId, resolution) => {
      resolution = resolution || 'LARGE_LOGO';
      return process.env.API_ROOT + '/files/' + fileId + '/image?resolution=' + resolution;
    };
    /**
     * 获取收货二维码
     * @param orderId
     * @returns {string}
     */
    Vue.prototype.getQrCodeURL = (orderId) => {
      return process.env.API_ROOT + '/orders/' + orderId + '/qrCode';
    };
    /**
     * 切割字符串
     */
    Vue.prototype.formateText = (text, len) => {
      return text.trim().substring(0, len);
    };

    /**
     * 获取性别
     * @param gender
     */
    Vue.prototype.getGender = (gender) => {
      switch (gender) {
        case 'MALE':
          return '男';
        case 'FEMALE':
          return '女';
        default:
          return '';
      }
    };

    /**
     * 获取状态
     * @param state
     */
    Vue.prototype.transform = (state) => {
      switch (state) {
        case 'REFUNDING':
          return '退款中';
        case 'REFUND_COMPLETE':
          return '退款完成';
        case 'CLOSED':
          return '订单关闭';
      }
    };
    /**
     * 退款状态 英->中
     * @param str
     * @returns {string}
     */
    Vue.prototype.transformRefundState = (str) => {
      switch (str) {
        case 'REFUNDING':
          return '退款中';
        case 'COMPLETE':
          return '退款完成';
        case 'FAIL':
          return '退款失败';
        default:
          return '状态异常';
      }
    };

    /**
     * 订单状态 英->中
     * @param str
     */
    Vue.prototype.transformOrderState = (str) => {
      switch (str) {
        case 'TO_PAY':
          return '待付款';
        case 'TO_CHECK':
          return '待审核';
        case 'TO_DELIVERY':
          return '调剂中';
        case 'TO_RECEIVED':
          return '待收货';
        case 'TO_APPRAISE':
          return '待评价';
        case 'COMPLETED':
          return '已完成';
        case 'REFUNDING':
          return '退款中';
        case 'REFUND_COMPLETE':
          return '退款完成';
        case 'CLOSED':
          return '订单关闭';
      }
    };
    Vue.prototype.transformOrderStateSec = (state, refundState, _this) => {
      if (refundState === 'REFUNDING') {
        return _this.transformRefundState(refundState);
      } else {
        return _this.transformOrderState(state);
      }
    };
    /**
     * 是否空判断
     * @param str
     * @returns {boolean}
     */
    Vue.prototype.isBlank = (str) => {
      if (str === null || str === '' || str === 'undefined') {
        return true;
      } else {
        return false;
      }
    };

    Vue.prototype.isNotBlank = (str) => {
      if (str === null || str === '' || str === 'undefined') {
        return false;
      } else {
        return true;
      }
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
     * 跳转到处方详情页
     * @param str
     */
    Vue.prototype.linkToRxView = (str) => {
      router.push({ name: '/rxs/view', params: { rxId: str } });
    };
    /**
     * 跳转到药房药品规格页
     * @param str
     */
    Vue.prototype.linkToShopDrugSpec = (str) => {
      router.push({ name: '/shopDrugs', params: { shopDrugId: str } });
    };
    /**
     * 跳转到药房详情页
     * @param str
     */
    Vue.prototype.linkToShopView = (str) => {
      router.push({ name: '/shops/view', params: { shopId: str } });
    };
    /**
     * 跳转到订单地址页
     */
    Vue.prototype.linkToOrderAddress = (shopId) => {
      router.push({ name: '/orders/addresses', params: { shopId: shopId } });
    };
    /**
     * 跳转到医保卡绑定页
     */
    Vue.prototype.linkToCardBind = () => {
      router.push('/accounts/card/bind');
    };
    /**
     * 跳转到扫码收货页
     */
    Vue.prototype.linkToQRCode = () => {
      router.push('/qrCode');
    };
    /**
     * 跳转到处方药房药品页
     * @param rxId
     * @param shopId
     * @param name
     */
    Vue.prototype.linkToRxShopDrug = (rxId, shopId, name, type) => {
      router.push({ name: '/rxs/shops/drugs', params: { rxId: rxId, shopId: shopId, shopName: name, type: type } });
    };

    /**
     * 跳转到退款详情页
     * @param orderRefundId
     */
    Vue.prototype.linkToOrderRefundView = (orderRefundId) => {
      router.push({ name: '/orderRefunds/view', params: { orderRefundId: orderRefundId } });
    };

    /**
     * 跳转到取药页面
     * @param orderId
     */
    Vue.prototype.linkToTakeDrug = (orderId) => {
      router.push({ name: '/orders/takeDrug', params: { orderId: orderId } });
    };

    /**
     * 跳转到药品药房页面
     * @param drugSpecId
     * @param drugId
     */
    Vue.prototype.linkToDrugShop = (drugId) => {
      router.push({ name: '/drugs/shops', params: { drugId: drugId } });
    };

    /**
     * 跳转到药房详情页面
     * @param shopId
     */
    Vue.prototype.linkToShopInfo = (shopId) => {
      router.push({ name: '/shops/info', params: { id: shopId } });
    };

    /**
     * 跳转到药房药品页面
     * @param shopId
     */
    Vue.prototype.linkToShopDrugs = (shopId, typeId) => {
      router.push({ name: '/shops/drugs', params: { id: shopId, typeId: typeId } });
    };

    /**
     * 跳转到咨询页面
     * @param shopId
     */
    Vue.prototype.linkToChatView = (shopId) => {
      router.push({ name: '/chats/view', params: { shopId: shopId } });
    };

    /**
     * 跳转到消息类型
     */
    Vue.prototype.linkToMessageType = () => {
      router.push('/messageTypes');
    };

    /**
     * 跳转到医保消费机构
     * @param item
     */
    Vue.prototype.linkToConsumeInfo = (item) => {
      router.push({ name: '/accounts/insurance/consumeInfo', params: { consumeInfo: item } });
    };

    /**
     * 跳转到医保消费详情
     * @param item
     */
    Vue.prototype.linkToConsumeInfoMore = (item) => {
      router.push({ name: '/accounts/insurance/consumeInfoMore', params: { consumeInfoMore: item } });
    };
    /**
     * 跳转到优惠券详情
     * @param couponId
     */
    Vue.prototype.linkToPointView = (couponId) => {
      router.push({ name: '/points/view', params: { couponId: couponId } });
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
     * 保留小数
     * @param str
     * @returns {string}
     */
    Vue.prototype.toFixedTwo = (str) => {
      if (typeof str === 'number') {
        return str.toFixed(2);
      } else {
        return str;
      }
    };
    Vue.prototype.toFixedOne = (str) => {
      if (typeof str !== 'undefined' && str !== null) {
        return str.toFixed(1);
      }
    };

    /**
     * 订单创建后7天内可退款
     * @param createdDate
     * @returns {boolean}
     */
    Vue.prototype.refundVerification = (createdDate) => {
      if (createdDate + 7 * 86400000 - Date.parse(new Date()) > 0) {
        return true;
      } else {
        return false;
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
    /**
     * 加载
     * @returns {*}
     */
    Vue.prototype.loading = () => {
      var loading = Vue.extend(require('../components/loading.vue').default);
      tpl = new loading().$mount().$el;
      document.body.appendChild(tpl);
      return tpl;
    };
    Vue.mixin({
      methods: {
        hideLoading: function () {
          document.body.removeChild(tpl);
        }
      }
    });
  }
};

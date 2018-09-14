import { Toast } from 'mint-ui';
import router from '../../router';
import storage from 'good-storage';

const SEARCH_KEY = 'orderHis';
const SEARCH_MAX_LENGTH = 15;

function insertArray(arr, val, compare, maxlen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxlen && arr.length > maxlen) {
    arr.pop();
  }
}

export default {
  install(Vue, options) {
    /**
     * htpp请求报错
     * @param error
     */
    Vue.prototype.exception = (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (error.response.data.fieldErrors) {
              Toast(error.response.data.fieldErrors[0].message);
              return;
            }
            if (error.response.data.message) {
              Toast(error.response.data.message);
            }
            break;
          case 401:
            break;
          default:
            Toast('网络异常');
        }
      } else {
        Toast('网络异常');
        this.$router.push('/error');
      }
    };
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
      var date = new Date(timer);
      var Y = date.getFullYear();
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      var allTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
      return allTime;
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
      return process.env.API_ROOT + '/qrCode/orders/' + orderId;
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
     * 搜索历史存储
     * @param str
     * @returns {*}
     */
    Vue.prototype.saveSearch = (str) => {
      let searches = storage.get(SEARCH_KEY, []);
      insertArray(searches, str, (item) => {
        return item === str;
      }, SEARCH_MAX_LENGTH);
      storage.set(SEARCH_KEY, searches);
      return searches;
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
      router.push({ path: '/rxs/view', query: { rxId: str } });
    };
    /**
     * 跳转到药店药品规格页
     * @param str
     */
    Vue.prototype.linkToShopDrugSpec = (str) => {
      router.push({ path: '/shopDrugSpecs', query: { shopDrugSpecId: str } });
    };
    /**
     * 跳转到药店详情页
     * @param str
     */
    Vue.prototype.linkToShopView = (str) => {
      router.push({ path: '/shops/view', query: { shopId: str } });
    };
    /**
     * 跳转到订单地址页
     */
    Vue.prototype.linkToOrderAddress = () => {
      router.push('/orders/addresses');
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
     * 跳转到处方药店药品页
     * @param rxId
     * @param shopId
     * @param name
     */
    Vue.prototype.linkToRxShopDrug = (rxId, shopId, name, type) => {
      router.push({path: '/rxs/shops/drugs', query: {rxId: rxId, shopId: shopId, shopName: name, type: type}});
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
      if (typeof str !== 'undefined') {
        return str.toFixed(1);
      }
    };
  }
};

import {MessageBox} from 'mint-ui';
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
              MessageBox('提示', error.response.data.fieldErrors[0].message);
            }
            break;
          case 401:
            break;
          default:
            MessageBox('提示', '网络异常');
        }
      } else {
        MessageBox('提示', '网络异常');
      }
    };
    /**
     * yyyy-MM-dd hh:MM:ss
     * @param timer
     * @returns {string}
     */
    Vue.prototype.timeConvert = (timer) => {
      var date = new Date(timer);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var allTime = Y + M + D + h + m + s;
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
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var allTime = Y + M + D + h + m + s;
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
     * @returns {string}
     */
    Vue.prototype.getImgURL = (fileId) => {
      return 'http://localhost:8081/api/files/' + fileId + '/image';
    };
    /**
     * 获取图片链接
     * @param fileId
     * @param resolution
     * @returns {string}
     */
    Vue.prototype.getImgURL = (fileId, resolution) => {
      return 'http://localhost:8081/api/files/' + fileId + '/image?resolution=' + resolution;
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
        case 'CLOSES':
          return '订单关闭';
      }
    };
  }
};

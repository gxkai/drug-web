import {MessageBox} from 'mint-ui';
export default {
  install(Vue, options) {
    /**
     * htpp请求报错
     * @param error
     */
    Vue.prototype.exception = (error) => {
      debugger;
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
    /**
     * 获取图片链接
     * @param fileId
     * @param resolution
     * @returns {string}
     */
    Vue.prototype.getImgURL = (fileId, resolution) => {
      return '/files/' + fileId + '/image?resolution=' + resolution;
    };
  }
};

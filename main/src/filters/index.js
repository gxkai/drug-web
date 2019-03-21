export default {
  /**
   * 将手机号中间4位数字替换为星号
   * @param {string} str - 待处理字符串
   * @returns {string} 已处理字符串
   */
  asterisk(str) {
    str = String(str);
    return `${str.substr(0, 3)}****${str.substr(-4, 4)}`;
  },
  timeConvert(str) {
    if (str !== undefined) {
      var date = new Date(str);
      var Y = date.getFullYear();
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      var allTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
      return allTime;
    }
  },
  countTimeConvert(str) {
    if (str !== undefined && typeof str === 'number') {
      var date = new Date(str);
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      var allTime = m + ':' + s;
      return allTime;
    } else {
      return str;
    }
  }
};

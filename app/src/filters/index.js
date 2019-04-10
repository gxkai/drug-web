import moment from 'moment';
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
  dateFmt(input, fmt) {
    return moment(input).format(fmt);
  },
  dateFilter(input, filter) {
    var difValue = input;
    var dd = Math.floor(difValue / 1000 / 60 / 60 / 24);
    difValue = difValue % (1000 * 60 * 60 * 24);
    var hh = Math.floor(difValue / 1000 / 60 / 60);
    difValue = difValue % (1000 * 60 * 60);
    var mm = Math.floor(difValue / 1000 / 60);
    difValue = difValue % (1000 * 60);
    var ss = Math.floor(difValue / 1000);
    switch (filter) {
      case 'dd':
        return dd;
      case 'hh':
        return hh;
      case 'mm':
        return mm;
      case 'ss':
        return ss;
      default:
        return '';
    }
  }
};

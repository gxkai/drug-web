export default {
  /**
   * 将手机号中间4位数字替换为星号
   * @param {string} str - 待处理字符串
   * @returns {string} 已处理字符串
   */
  asterisk: function (str) {
    str = String(str);
    return `${str.substr(0, 3)}****${str.substr(-4, 4)}`;
  },
  /**
   * 判断字符串是否为空
   * @param str
   * @returns {boolean}
   */
  isNullOrEmpty: function (str) {
    if (str === null || str === '') {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 金额格式化，为空时处理为0.0
   * @param str
   * @returns {boolean}
   */
  formatAmount: function (str) {
    if (str === null || str === '') {
      return '0.0';
    } else {
      return str;
    }
  },
  /**
   * 订单状态 英->中
   * @param str
   */
  transformOrderState: function (str) {
    switch (str) {
      case 'TO_PAY':
        return '待付款';
      case 'TO_CHECK':
        return '待审核';
      case 'TO_DELIVERY':
        return '待发货';
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
  },
  transformGenderState(str) {
    switch (str) {
      case 'MALE':
        return '男';
      default:
        return '女';
    }
  }
};

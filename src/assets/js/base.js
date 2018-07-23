import {MessageBox} from 'mint-ui';
export default {
  install(Vue, options) {
    Vue.prototype.exception = (error) => {
      let res = error.response;
      if (res) {
        if (res.status === 400) {
          if (res.data.status === 400 && res.data.fieldErrors) {
            MessageBox('提示', res.data.fieldErrors[0].message);
          } else {
            MessageBox('提示', res.data.message);
          }
        } else {
          MessageBox('提示', '网络异常');
        }
      } else {
        MessageBox('提示', '网络异常');
      }
    };
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
    Vue.prototype.regMobiile = (inputString) => {
      var partten = /^1[3,5,8]\d{9}$/;
      if (partten.test(inputString)) {
        return true;
      } else {
        MessageBox({
          title: '提示',
          message: '请输入正确手机号码'
          // showCancelButton: true//如果这个为真  则会出来  取消  确定两个按钮  视情况而定
        });
        return false;
      }
    };
  }
};

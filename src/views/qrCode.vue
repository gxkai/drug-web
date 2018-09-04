<template>
  <div class="container">
    <div class="content" id="bcid">
    </div>
  </div>
</template>

<script>
  let scan = null;
  mui.init({// eslint-disable-line no-undef
    keyEventBind: {
      backbutton: true
    }
  });
  var first = null;
  mui.back = function () { // eslint-disable-line no-undef
    if (!first) {
      first = new Date().getTime();
      scan.close();
      history.go(-1);
      setTimeout(function () {
        first = null;
      }, 1000);
    } else {
      if (new Date().getTime() - first < 1000) {
        plus.runtime.quit();// eslint-disable-line no-undef
      }
    }
  };

  export default {
    data() {
      return {};
    },
    created() {
    },
    mounted() {
      this.startRecognize();
    },
    methods: {
      startRecognize() {
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid');// eslint-disable-line no-undef
        scan.onmarked = onmarked;
        scan.start();
        let that = this;
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:// eslint-disable-line no-undef
              type = 'QR';
              break;
            case plus.barcode.EAN13:// eslint-disable-line no-undef
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:// eslint-disable-line no-undef
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '');
          alert(result);
          that.$http.put(result)
            .then(res => {
              alert('succeed');
              scan.close();
              that.$router.replace('/orders');
            })
            .catch(err => {
              alert('fail');
              alert(that.$router);
              that.exception(err);
              scan.close();
              that.$router.go(-1);
            });
        }
      }
    }
  };
</script>
<style lang="less" type="text/less">
  .container {
    height: 100%;
    .content {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      color: #fff;
      background: white;
    }
  }
</style>

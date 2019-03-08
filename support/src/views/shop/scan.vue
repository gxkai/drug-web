<template>
  <div class="scan">
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>
    <div id="goback" @click="goBack()">返回</div>
    <footer style="display:none;">
      <button @click="startRecognize">1.创建控件</button>
      <button @click="startScan">2.开始扫描</button>
      <button @click="cancelScan">3.结束扫描</button>
      <button @click="closeScan">4.关闭控件</button>
    </footer>
  </div>
</template>

<script type='text/ecmascript-6'>
let scan = null;

export default {
  data() {
    return {
      codeUrl: ''
    };
  },
  methods: {
    goBack() {
      this.$router.back(-1);
      this.closeScan();
    },
    // 创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode('bcid');
      that.startScan();
      scan.onmarked = onmarked;
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR';
            break;
          case plus.barcode.EAN13:
            type = 'EAN13';
            break;
          case plus.barcode.EAN8:
            type = 'EAN8';
            break;
          default:
            type = '其它' + type;
            break;
        }
        result = result.replace(/\n/g, '');

        try {
          that.$shop.put(`/api/shop/orders/${result}/complete`);
          that.$toast.success('成功');
        } catch (e) {
          that.$toast.fail('失败');
        }
        that.closeScan();
        that.$router.back();
      }
    },
    // 开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    // 关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    // 关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    }
  },
  mounted() {
    this.startRecognize();
  }
};
</script>
<style lang="less">
  .scan {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 3rem;
      text-align: center;
      color: #fff;
      /*background: #ccc;*/
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 1rem;
      height: 2rem;
      line-height: 2rem;
      z-index: 2;
    }
  }
  #goback{
    width: 100%;
    height: 10vw;
    line-height: 10vw;
    background: red;
    text-align: center;
    color: #ffffff;
    position: absolute;
    z-index: 99999999999999999;
    margin: auto;
    bottom: 0;
  }
</style>

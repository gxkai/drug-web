<template>
  <div class="pay-success">
    <img
      class="pay-success--image"
      src="../../../assets/image/success.png">
    <div
    class="pay-success--ok"
    >订单支付成功</div>
    <div
    class="pay-success--delivery"
    >我们将为您尽快发货</div>
    <div
    class="pay-success--skip"
    >
      <div
      class="pay-success--skip--home"
      @click="$router.push('/')"
      >随意逛逛</div>
      <div
      class="pay-success--skip--orders"
      @click="$router.push('/orders')"
      >查看订单</div>
    </div>
  </div>

</template>
<style scoped type="text/less" lang="less">
  .pay-success {
    display: flex;
    flex-flow: column;
    align-items: center;
    &--image {
      width:151px;
      height:151px;
      opacity:0.87;
      margin-top: 240px;
    }
    &--ok {
      font-size:36px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(19,193,254,1);
      margin-top: 50px;
    }
    &--delivery {
      font-size:30px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(153,153,153,1);
      margin-top: 10px;
    }
    &--skip {
      width: 500px;
      display: flex;
      justify-content: space-between;
      margin-top: 100px;
      &--home {
        width:177px;
        height:58px;
        border:1px solid rgba(210,210,210,1);
        border-radius:20px;
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height: 58px;
        text-align: center;
      }
      &--orders {
        width:177px;
        height:58px;
        background:rgba(19,193,254,1);
        border-radius:20px;
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 58px;
        text-align: center;
      }
    }
  }
</style>
<script>
  export default {
    name: 'alipay',
    data() {
      return {
        charset: '',
        out_trade_no: '',
        method: '',
        total_amount: '',
        sign: '',
        trade_no: '',
        auth_app_id: '',
        version: '',
        app_id: '',
        sign_type: '',
        seller_id: '',
        timestamp: '',
        orderId: '',
        show: true
      };
    },
    created() {
      // this.init();
    },
    methods: {
      init() {
        // 备用
        this.out_trade_no = this.$route.query.out_trade_no;
        this.method = this.$route.query.method;
        this.total_amount = this.$route.query.total_amount;
        this.sign = this.$route.query.sign;
        this.trade_no = this.$route.query.trade_no;
        this.auth_app_id = this.$route.query.auth_app_id;
        this.app_id = this.$route.query.app_id;
        this.sign_type = this.$route.query.sign_type;
        this.seller_id = this.$route.query.seller_id;
        this.timestamp = this.$route.query.timestamp;

        var map = {};
        map['charset'] = this.$route.query.charset;
        map['out_trade_no'] = this.$route.query.out_trade_no;
        map['method'] = this.$route.query.method;
        map['total_amount'] = this.$route.query.total_amount;
        map['sign'] = this.$route.query.sign;
        map['trade_no'] = this.$route.query.trade_no;
        map['auth_app_id'] = this.$route.query.auth_app_id;
        map['version'] = this.$route.query.version;
        map['app_id'] = this.$route.query.app_id;
        map['sign_type'] = this.$route.query.sign_type;
        map['seller_id'] = this.$route.query.seller_id;
        map['timestamp'] = this.$route.query.timestamp;
        this.orderId = this.$storage.get('orderId');
        // 拼接跳转链接
        let orderIds = this.$storage.get('orderIds');
        this.$http.get(this.URL_PATH + '/alipay/callback', {params: map}).then(res => {
          delete orderIds.map[this.$route.query.out_trade_no];
          if (Object.keys(orderIds.map).length !== 0) {
            let arr = [];
            for (const key in orderIds.map) {
              arr.push(orderIds.map[key]);
            }
            this.$router.push('/orders/pay?orderIds=' + arr);
          } else {
            this.show = true;
          }
        });
      }
    }
  };
</script>

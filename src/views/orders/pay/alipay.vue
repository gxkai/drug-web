<template>
  <div>
    <div class="content1" v-show="show">
      <img src="../../../assets/image/success.png">
      <div class="line1">
        <span>订单支付成功</span>
      </div>
      <div class="line2">
        <span>我们将尽快为您发货</span>
      </div>
      <div class="line3">
        <router-link tag="button" to="/">随意逛逛</router-link>
        <router-link tag="button" :to="{path:'/orders/view',query:{orderId:orderId}}">查看订单</router-link>
      </div>
    </div>
  </div>

</template>

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
        show: false
      };
    },
    created: function () {
      this.init();
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
<style scoped>
  .content1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 720px;
  }
  .content1 img {
    width:151px;
    height:151px;
    margin-top: 240px;
  }

  .content1 .line1 {
    font-size:36px;
    font-family:MicrosoftYaHei;
    color:rgba(19,193,254,1);
    margin-top: 60px;
  }

  .content1 .line2 {
    font-size:30px;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
    margin-top: 20px;
  }
  .content1 .line3 {
    width: 720px;
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
  }

  .content1 .line3 button:nth-child(1) {
    width:177px;
    height:58px;
    border-radius:20px;
    font-size:24px;
    font-family:MicrosoftYaHei;
    background:rgba(210,210,210,1);
    color:rgba(102,102,102,1);
    outline: none;
    border: 0;
  }

  .content1 .line3 button:nth-child(2) {
    width:177px;
    height:58px;
    background:rgba(19,193,254,1);
    border-radius:20px;
    font-size:24px;
    font-family:MicrosoftYaHei;
    color:rgba(255,255,255,1);
    border: 0;
    outline: none;
  }

</style>

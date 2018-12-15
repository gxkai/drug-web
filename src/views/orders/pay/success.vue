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
<style scoped type="text/scss" lang="scss">
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
    name: 'paySuccess',
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
    }
  };
</script>

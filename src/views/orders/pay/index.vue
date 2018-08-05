<template>
  <div class="main">
    <new-header title="订单提交成功" bgColor="rgba(246, 246, 246, 1)" color="rgba(51,51,51,1)" leftColor="rgba(51,51,51,1)" rightColor="rgba(19,193,254,1)" >
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
     <div slot="right">
       <router-link tag="span" to="/orders">我的订单</router-link>
     </div>
    </new-header>
    <div v-if="deliveryType === 'DELIVERY'">
      <new-header bgColor="rgba(255,255,255,1)" leftColor="#666666" rightColor="#666666" class="address">
        <i class="iconfont ic-dizhi" slot="left"></i>
        <div slot="center" class="center">
          <p>收货人：{{receiveAddress.consignee}} {{receiveAddress.phone}}</p>
          <p>地址：{{receiveAddress.address}}</p>
        </div>
        <i class="iconfont ic-youjiantou" slot="right"></i>
      </new-header>
      <img src="../../../assets/image/colorbackground.png">
    </div>
    <new-pay-list :list="list"></new-pay-list>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'orderPay',
    data() {
      return {
        deliveryType: this.$route.query.deliveryType,
        orderIds: this.$route.query.orderIds,
        list: []
      };
    },
    computed: {
      ...mapGetters(['receiveAddress'])
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('/orders/pay?orderIds=' + this.orderIds).then(res => {
          this.list = res.data;
          this.$storage.set('orderIds', this.orderIds);
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    components: {}
  };
</script>
<style scoped>
  .main {
    background-color: rgba(246, 246, 246, 1);
    height: 100vh;
    width: 720px;
  }
</style>


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
      <div class="order-address">
        <div>
          <i class="iconfont ic-weizhi"></i>
        </div>
        <div>
            <span>收货人：{{receiveAddress.consignee}} {{receiveAddress.phone}}</span>
            <span>地址：{{receiveAddress.address}}</span>
        </div>
        <div>
          <i class="iconfont ic-youjiantou"></i>
        </div>
      </div>
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

  .order-address{
    display: flex;
    background-color: white;
    padding: 20px 0;
  }
  .order-address>div:nth-child(1) {
    width: 10%;
    text-align: center;
  }
  .order-address>div:nth-child(1) i{
    font-size: 50px;
  }
  .order-address>div:nth-child(2) {
    width: 80%;
  }
  .order-address>div:nth-child(2) span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    display: block;
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .order-address>div:nth-child(3) {
    width: 10%;
    text-align: center;
  }

  .order-address>div:nth-child(3) i{
    font-size: 50px;
  }

</style>


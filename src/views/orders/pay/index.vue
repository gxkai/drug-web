<template>
  <div class="main">
    <new-header title="订单提交成功"  >
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
     <div slot="right">
       <router-link tag="span" to="/orders" class="text-l-25">我的订单</router-link>
     </div>
    </new-header>
    <div v-if="deliveryType === 'DELIVERY'">
      <div class="address">
        <div>
          <i class="iconfont ic-dizhi"></i>
        </div>
        <div>
          <div class="text-l-25 elps">
            收货人：{{receiveAddress.consignee}} {{receiveAddress.phone}}
          </div>
          <div class="text-l-25 elps">
            地址：{{receiveAddress.address}}
          </div>
        </div>
        <div>
          <i class="iconfont ic-youjiantou"></i>
        </div>
      </div>
      <img src="../../../assets/image/colorbackground.png" class="image-bar">
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

  .address {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    background-color: white;
  }
  .address>div:nth-child(1) {
    width: 10%;
  }
  .address>div:nth-child(2) {
    width: 80%;
  }
  .address>div:nth-child(3) {
    width: 10%;
  }
  .address .iconfont {
    font-size: 50px;
  }

  .image-bar {
    width: 100%;
  }
</style>


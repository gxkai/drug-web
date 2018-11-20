<template>
  <div class="pay">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/orders')"
      right-text="我的订单"
      ref="header"
    />
    </new-header>
    <div class="pay_address"
         v-if="deliveryType === 'DELIVERY'">
      <div class="pay_address-left">
        <i class="iconfont ic-dizhi"></i>
      </div>
      <div class="pay_address-right">
        <div>
          <span>收货人&#58;{{receiveAddress.consignee}}</span>
          <span class="ml-l-10">{{receiveAddress.phone}}</span>
        </div>
        <div>
          收货地址&#58;{{receiveAddress.address}}
        </div>
      </div>
    </div>
    <div class="pay_bar">
      <img src="../../../assets/image/colorbackground.png">
    </div>
    <div class="pay_list">
      <new-pay-order-item
      v-for="(item,key) in list"
      :key="key"
      :item="item"
      @onPay="onPay(item,key)"/>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex';
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
        this.$axios.get('/orders/pay?orderIds=' + this.orderIds).then(res => {
          this.list = res.data;
          console.log(res.data);
          this.$storage.set('orderIds', this.orderIds);
        }).catch(error => {
          this.exception(error);
        });
      },
      onPay(item, key) {
        this.$axios.get('/orders/' + item.id + '/pay')
          .then(res => {
            // this.$storage.set('orderId', item.id);
            // const div = document.createElement('div');
            // div.innerHTML = res.data;
            // document.body.appendChild(div);
            // document.forms[0].submit();
            this.list.splice(key, 1);
            if (this.list.length === 0) {
              this.$router.push('/orders/pay/success');
            }
          }).catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .pay {
    width: 720px;
    background-color: #f5f5f5;
    height: 100vh;
    overflow: scroll;
    &_bar {
      width: 100%;
      img {
        width: 100%;
      }
    }
    &_address {
      display: flex;
      align-items: center;
      padding: 20px 20px;
      background-color: white;
      i {
        font-size: 50px;
        color: #a6a6a6;
      }
      div,span {
        font-size: 28px;
      }
      &-right{
        padding-left: 10px;
      }
    }
  }
  /*.pay {*/
    /*background-color: rgba(246, 246, 246, 1);*/
    /*height: 100vh;*/
    /*width: 720px;*/
  /*}*/

  /*.address {*/
    /*width: 100%;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*padding: 20px 10px;*/
    /*background-color: white;*/
  /*}*/
  /*.address>div:nth-child(2) {*/
    /*width: 80%;*/
    /*margin-left: 10px;*/
  /*}*/
  /*.address .iconfont {*/
    /*font-size: 50px;*/
  /*}*/

  /*.image-bar {*/
    /*width: 100%;*/
  /*}*/
</style>


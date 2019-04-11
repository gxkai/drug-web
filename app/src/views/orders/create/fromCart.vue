<template>
  <div>
    <new-layout>
      <template slot="center">
        <delivery :shop.sync="shop" :address.sync="address" v-model="active"/>
        <new-white-space />
        <div v-for="(rx,index) in cartShop.rxs" :key="index">
          <shop-bar :leftText="shop.name" leftIcon="yaodian-" @click-left="loadPageShopsView(shop.id)" :rightIcon="rx.rxId !== null ? 'chufang-':''" @click-right="rx.rxId !== null?loadPageRxsView(rx.rxId, true):''"/>
          <new-drug v-for="(item, index) in rx.drugs" :key="index" :item="item"/>
        </div>
        <new-white-space />
        <div>
          <input-cell label="买家留言" v-model="accountRemark" placeholder="如需要留言，请留言"/>
          <info-cell title="商品总金额" :desc="`￥${cartShop.amount || ''}`" color="#d7000e"/>
          <info-cell title="医保扣除" :desc="`￥${cartShop.medicaidAmount || ''}`" color="#d7000e"
                     v-show="isMedicarePay"
          />
        </div>
      </template>
      <template slot="bottom">
        <new-submit-bar name="提交订单" :content="`实付款：￥${isMedicarePay === true ? cartShop.payAmount: cartShop.amount}`" @click="preOrder"/>
      </template>
    </new-layout>
    <action-sheet v-model="show" :isMedicarePay.sync="isMedicarePay" @confirm="onOrder"/>
  </div>
</template>
<script>
  import infoCell from '@/components/orders/infoCell';
  import inputCell from '@/components/orders/inputCell';
  import shopCell from '@/components/orders/shopCell';
  import shopBar from '@/components/orders/create/shopBar';
  import delivery from '@/components/orders/create/delivery';
  import actionSheet from '@/components/orders/actionSheet';
  import create from '@/mixins/orders/create';
  export default {
    name: 'createFromCart',
    mixins: [create],
    data() {
      return {
        name: '订单结算',
        cartShop: this.$route.params.cartShop,
        isRx: this.$route.params.isRx
      };
    },
    components: {
      infoCell,
      inputCell,
      shopCell,
      actionSheet,
      shopBar,
      delivery
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        console.log(this.cartShop);
        this.payAmount = this.cartShop.payAmount;
        this.shop = await this.$http.get(`/api/shops/${this.cartShop.id}`);
      },
      /**
       * 获取购物车ID数组
       * @returns {Array}
       */
      getCartIds() {
        let cartIds = [];
        this.cartShop.rxs.forEach(e => {
          e.drugs.forEach(e => {
            cartIds.push(e.cartId);
          });
        });
        return cartIds;
      },
      async onOrder() {
        let json = {};
        if (this.deliveryType === 'DELIVERY') {
          if (this.address === undefined) {
            this.$toast('地址还没维护呢');
            return;
          } else {
            json.addressId = this.address.id;
          }
        }
        json.cartIds = this.getCartIds();
        json.deliveryType = this.deliveryType;
        json.payType = this.payType;
        json.medicaid = this.isMedicarePay;
        json.type = this.isRx === true ? 'RX' : 'SIMPLE';
        json.origin = 'APP';
        json.accountRemark = this.accountRemark;
        this.orderOption(json);
      }
    }
  };
</script>
<style scoped type="text/scss" lang="scss">
  /deep/ .van-tabs {
    &__wrap {
      height: 100px !important;
    }
    &--line {
      padding-top: 100px;
    }
    .van-tab {
      color: black !important;
      &--active {
        color: $theme !important;
      }
      span {
        line-height: 100px !important;
        font-size: 25px !important;
      }
    }
  }
</style>


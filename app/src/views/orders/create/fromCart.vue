<template>
  <div>
    <new-layout>
      <template slot="center">
        <delivery :shop.sync="shop" :address.sync="address" v-model="active" />
        <new-white-space />
        <div v-for="(rx, index) in cartShop.rxs" :key="index">
          <shop-bar
            :left-text="shop.name"
            :right-icon="rx.rxId !== null ? 'chufang-' : ''"
            left-icon="yaodian-"
            @click-left="loadPageShopsView(shop.id)"
            @click-right="
              rx.rxId !== null ? loadPageRxsView(rx.rxId, true) : ''
            "
          />
          <new-drug
            v-for="(item, index) in rx.drugs"
            :key="index"
            :item="item"
          />
        </div>
        <new-white-space />
        <div>
          <input-cell
            v-model="accountRemark"
            label="买家留言"
            placeholder="如需要留言，请留言"
          />
          <info-cell
            :desc="`￥${cartShop.amount || ''}`"
            title="商品总金额"
            color="#d7000e"
          />
          <info-cell
            v-show="isMedicarePay"
            :desc="`￥${cartShop.medicaidAmount || ''}`"
            title="医保扣除"
            color="#d7000e"
          />
        </div>
      </template>
      <template slot="bottom">
        <new-submit-bar
          :content="
            `实付款：￥${
              isMedicarePay === true ? cartShop.payAmount : cartShop.amount
            }`
          "
          name="提交订单"
          @click="onOrder"
        />
      </template>
    </new-layout>
    <action-sheet
      v-model="show"
      :is-medicare-pay.sync="isMedicarePay"
      @confirm="onOrder"
    />
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
  name: 'CreateFromCart',
  components: {
    infoCell,
    inputCell,
    shopCell,
    actionSheet,
    shopBar,
    delivery
  },
  mixins: [create],
  data() {
    return {
      name: '订单结算',
      cartShop: JSON.parse(this.$route.query.cartShop),
      isRx: this.$route.query.isRx
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
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

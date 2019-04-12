<template>
  <div>
    <new-layout>
      <template slot="center">
        <delivery :shop.sync="shop" :address.sync="address" v-model="active"/>
        <new-white-space />
        <shop-bar :leftText="shop.name" leftIcon="yaodian-" @click-left="loadPageShopsView(shop.id)" :rightIcon="shopDrugOrderDTO.rxId !== null ? 'chufang-':''" @click-right="shopDrugOrderDTO.rxId !== null?loadPageRxsView(shopDrugOrderDTO.rxId, true):''"/>
        <new-drug
          v-for="(item, index) in shopDrugOrderDTO.drugs"
          :key="index"
          :item="item"
        />
        <new-white-space />
        <div>
          <input-cell label="买家留言" v-model="accountRemark" placeholder="如需要留言，请留言"/>
          <info-cell title="商品总金额" :desc="`￥${shopDrugOrderDTO.amount || ''}`" color="#d7000e"/>
          <info-cell title="医保扣除" :desc="`￥${shopDrugOrderDTO.medicaidAmount || ''}`" color="#d7000e"
          v-show="isMedicarePay"
          />
        </div>
      </template>
      <template slot="bottom">
        <new-submit-bar name="提交订单" :content="`实付款：￥${isMedicarePay === true ? shopDrugOrderDTO.payAmount: shopDrugOrderDTO.amount}`" @click="preOrder"/>
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
      shopDrugOrderDTO: this.$route.params.shopDrugOrderDTO
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
  watch: {
  },
  created() {
    this.initData();
  },
  mounted() {
  },
  methods: {
    async initData() {
      console.log(this.shopDrugOrderDTO);
      this.payAmount = this.shopDrugOrderDTO.payAmount;
      this.shop = await this.$http.get(
        `/api/shops/${this.shopDrugOrderDTO.shopId}`
      );
    },
    async onOrder() {
      let json = {};
      if (this.address !== undefined) {
        json.addressId = this.address.id;
      }
      json.items = this.shopDrugOrderDTO.drugs;
      json.deliveryType = this.deliveryType;
      json.payType = this.payType;
      json.medicaid = this.isMedicarePay;
      json.shopId = this.shop.id;
      json.type = this.shopDrugOrderDTO.rxId === null ? 'SIMPLE' : 'RX';
      json.from = 'APP';
      json.rxId = this.shopDrugOrderDTO.rxId;
      json.accountRemark = this.accountRemark;
      this.orderOption(json, true);
    }
  }
};
</script>
<style scoped type="text/scss" lang="scss">
</style>

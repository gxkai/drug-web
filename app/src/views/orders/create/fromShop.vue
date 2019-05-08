<template>
  <div>
    <new-layout>
      <template slot="center">
        <delivery :shop.sync="shop" :address.sync="address" v-model="active" />
        <new-white-space />
        <shop-bar
          :left-text="shop.name"
          :right-icon="shopDrugOrderDTO.rxId !== null ? 'chufang-' : ''"
          left-icon="yaodian-"
          @click-left="loadPageShopsView(shop.id)"
          @click-right="
            shopDrugOrderDTO.rxId !== null
              ? loadPageRxsView(shopDrugOrderDTO.rxId, true)
              : ''
          "
        />
        <new-drug
          v-for="(item, index) in shopDrugOrderDTO.drugs"
          :key="index"
          :item="item"
        />
        <new-white-space />
        <div>
          <input-cell
            v-model="accountRemark"
            label="买家留言"
            placeholder="如需要留言，请留言"
          />
          <info-cell
            :desc="`￥${shopDrugOrderDTO.amount || ''}`"
            title="商品总金额"
            color="#d7000e"
          />
          <info-cell
            v-show="isMedicarePay"
            :desc="`￥${shopDrugOrderDTO.medicaidAmount || ''}`"
            title="医保扣除"
            color="#d7000e"
          />
        </div>
      </template>
      <template slot="bottom">
        <new-submit-bar
          :content="
            `实付款：￥${
              isMedicarePay === true
                ? shopDrugOrderDTO.payAmount
                : shopDrugOrderDTO.amount
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
  name: 'CreateFromShop',
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
      shopDrugOrderDTO: JSON.parse(this.$route.query.shopDrugOrderDTO)
    };
  },
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      console.log(this.shopDrugOrderDTO);
      this.payAmount = this.shopDrugOrderDTO.payAmount;
      this.shop = await this.$http.get(
        `/api/app/shops/${this.shopDrugOrderDTO.shopId}`
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
<style scoped type="text/scss" lang="scss"></style>

<template>
  <new-layout>
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-tabs v-model="active">
        <new-white-space />
        <van-tab title="送货上门">
          <new-wing-blank class="wrapper1" py="5em" v-if="address === undefined">
            <new-button
              name="+选择收货地址"
              fontSize="2em"
              backgroundColor="red"
              color="white"
              borderRadius=".5em"
              fontWeight="400"
            />
          </new-wing-blank>
          <new-wing-blank class="wrapper2" v-else>
            <div class="line line1">
              <van-icon name="person" size="2em" />
              <span>收货人{{address.consignee||''}}</span>
            </div>
            <div class="line line2">
              <span>收货地址{{address.address||''}}</span>
            </div>
          </new-wing-blank>
        </van-tab>
        <van-tab title="到店自取">
          <new-left-title text="自取地址" textColor="black" />
          <new-wing-blank class="wrapper2">
            <div class="line line1">
              <van-icon name="shijian2" size="2em" />
              <span>营业时间：{{shop.openTime}}-{{shop.closeTime}}</span>
            </div>
            <div class="line line2">
              <van-icon name="location" size="2em" />
              <span>药店地址：{{shop.address}}</span>
            </div>
            <div class="line line3">
              <new-button
                name="查看地图"
                fontSize="1.5em"
                backgroundColor="red"
                color="white"
                borderRadius=".5em"
                fontWeight="400"
                @click.native="onLocation"
              />
            </div>
          </new-wing-blank>
        </van-tab>
      </van-tabs>
      <new-white-space />
      <new-left-title text="是否医保" textColor="black" />
      <new-wing-blank class="wrapper3">
        <div class="item item1" @click="isMedicarePay = false">
          <new-radio :radio="isMedicarePay === false" />
          <span>
            自费
          </span>
        </div>
        <div class="item item2" @click="isMedicarePay = true">
          <new-radio :radio="isMedicarePay === true" />
          <span>
            医保
          </span>
        </div>
      </new-wing-blank>
      <new-white-space />
      <new-left-title text="买家留言" textColor="black" />
      <van-cell-group>
        <van-field
          v-model="accountRemark"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          rows="3"
        />
      </van-cell-group>
      <new-white-space />
      <new-left-title text="药品详情" textColor="black" />
      <new-wing-blank class="wrapper4 van-hairline--top">
        <div class="line line1">
          <span>
            商品总金额
          </span>
          <span v-if="isMedicarePay === true"> ¥{{ shopDrugOrderDTO.payAmount || ''}} </span>
          <span v-else> ¥{{ shopDrugOrderDTO.amount||'' }} </span>
        </div>
        <div class="line line2" v-if="isMedicarePay === true">
          <span>
            医保扣除
          </span>
          <span> ¥{{ shopDrugOrderDTO.medicaidAmount }} </span>
        </div>
        <div class="line line3">
          <span>
            实付金额
          </span>
          <span> ¥{{ shopDrugOrderDTO.payAmount }} </span>
        </div>
      </new-wing-blank>
      <new-wing-blank class="wrapper5">
        <span>
          {{shopDrugOrderDTO.shopName}}
        </span>
      </new-wing-blank>
      <new-drug v-for="(item, index) in shopDrugOrderDTO.drugs" :key="index" :item="item"/>
      <new-white-space />
      <new-wing-blank class="wrapper6">
        <new-button
          name="提交订单"
          fontSize="2em"
          backgroundColor="red"
          color="white"
          borderRadius=".5em"
          fontWeight="400"
          @click.native="onOrder"
        />
      </new-wing-blank>
    </template>
  </new-layout>
</template>
<script>
import { getAccount } from '@/storage';

export default {
  name: 'createFromCart',
  data() {
    return {
      name: '订单结算',
      account: getAccount(),
      orderShopDrugDTO: this.$route.params.orderShopDrugDTO,
      shopDrugOrderDTO: this.$route.params.shopDrugOrderDTO,
      deliveryType: 'SELF',
      payType: 'KRCB',
      show: false,
      payAmount: 0,
      loading: false,
      address: undefined,
      isMedicarePay: false,
      accountRemark: '',
      active: 0,
      shop: {}
    };
  },
  components: {},
  computed: {},
  watch: {
    active(newValue) {
      if (newValue === 0) {
        this.delivery = 'DELIVERY';
      } else {
        this.delivery = 'SELF';
      }
    }
  },
  created() {
    this.initData();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.address = vm.$route.params.address;
    });
  },
  beforeRouteLeave(to, from, next) {
    to.params.address = this.address;
    next();
  },
  mounted() {},
  methods: {
    async initData() {
      this.payAmount = this.shopDrugOrderDTO.payAmount;
      this.shop = await this.$http.get(`/shops/${this.shopDrugOrderDTO.shopId}`);
      console.log(this.shopDrugOrderDTO);
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
      json.items = this.orderShopDrugDTO.drugs;
      json.deliveryType = this.deliveryType;
      json.payType = this.payType;
      json.couponRecordId = this.couponRecord.id;
      json.medicaid = this.isMedicarePay;
      json.shopId = this.orderShopDrugDTO.shopId;
      json.type = this.shopDrugOrderDTO.rxId === null ? 'SIMPLE' : 'RX';
      json.from = 'APP';
      json.rxId = this.shopDrugOrderDTO.rxId;
      json.accountRemark = this.accountRemark;
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '生成订单中...'
      });
      let order = await this.$http.post('/orders/shop', json);
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '生成支付链接中...'
      });
      let url = await this.$http.get(`/orders/${order.id}/pay`);
      if (url === '') {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: '支付中...'
        });
        await this.$http.post(
          'http://172.16.11.138:8085/app/orders/qy/callback',
          { orderNo: order.number, insuranceNo: '000001', bankNo: '000000001' }
        );
        this.$router.replace('/orders');
        return;
      }
      window.location.href = url;
    },
    onLocation() {
      this.$router.push({ name: '/iframe', params: { url: this.jumpToBaidu(this.shop.name, this.shop.address, this.shop.lat, this.shop.lng), name: '药店导航' } });
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
      color: $themeColor !important;
    }
    span {
      line-height: 100px !important;
      font-size: 25px !important;
    }
  }
}
.wrapper6 {
  display: flex;
  justify-content: center;
}
.wrapper5 {
  background-color: white;
  span {
    font-size:24px;
    font-weight:400;
  }
}
.wrapper4 {
  background-color: white;
  display: grid;
  align-content: space-evenly;
  height: 200px;
  .line {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 24px;
      font-weight: 400;
      color: $greyColor;
      &:nth-child(2) {
        color: $themeColor;
      }
    }
  }
}
.wrapper3 {
  background-color: white;
  display: flex;
  .item {
    display: flex;
    align-items: center;
    span {
      font-size: 24px;
      font-weight: 400;
      margin-left: 10px;
    }
  }
  .item2 {
    margin-left: 100px;
  }
}
.wrapper2 {
  background: white;
  display: grid;
  .line1,
  .line2 {
    span {
      font-size: 24px;
      font-weight: 400;
      color: $greyColor;
    }
  }
  .line2 {
    margin-top: 10px;
  }
  .line3 {
    justify-self: right;
    margin-top: 20px;
    span {
      font-size: 23px;
      margin-left: 10px;
    }
  }
}
.wrapper1 {
  display: flex;
  justify-content: center;
  background-color: white;
}
</style>

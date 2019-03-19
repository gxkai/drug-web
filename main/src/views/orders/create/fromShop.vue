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
<!--<style scoped type="text/scss" lang="scss">
  .active {
    color: $themeColor;
    border: 1PX solid $themeColor!important;
  }
  .text-red {
    color: $themeColor;
  }
  .pay_shop {
    &-content {
      &-delivery {
        margin-bottom: 20px;
        &-bar {
          width: 100%;
          img {
            width: 100%;
          }
        }
        &-address {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px;
          background-color: white;
          i {
            font-size: 50px;
            color: #a6a6a6;
          }
          div, span {
            font-size: 28px;
          }
          &-center {
            padding: 0 10px;
            width: 600px;
            span {
              font-size: 30px;
            }
          }
        }
        &-no_address {
          padding: 20px 20px;
          background-color: white;
          font-size: 35px;
          text-align: center;
        }
      }
      &-delivery_type {
        margin-bottom: 20px;
        &-header {
          background-color: white;
          display: flex;
          align-items: center;
          padding: 20px;
          i {
            font-size: 50px;
          }
          div {
            font-size: 30px;
          }
        }
        &-content {
          background-color: white;
          padding: 20px 0 20px 40px;
          span {
            border: 1PX solid #f5f5f5;
            font-size: 30px;
            padding: 5px 10px;
            display: inline-block;
            &:not(:first-child) {
              margin-left: 10px;
            }
          }
        }
      }
      &-pay_type {
        margin-top: 20px;
        &-content {
          background-color: white;
          padding: 20px 0 20px 40px;
          span {
            border: 1PX solid #f5f5f5;
            font-size: 30px;
            padding: 5px 10px;
            display: inline-block;
            &:not(:first-child) {
              margin-left: 10px;
            }
          }
        }
      }
      &-pay_amount {
        margin-top: 20px;
        background-color: white;
        padding: 20px 0 20px 40px;
        span {
          font-size: 28px;
        }
        div {
          margin-bottom: 10px;
          span:nth-child(2) {
            color: $themeColor;
          }
        }
      }
      &-medicaid {
        background-color: white;
        margin-bottom: 20px;
        &-header {
          font-size: 30px;
          padding: 10px 0 10px 20px;
          border: 1PX solid #f5f5f5;
        }
        &-content {
          &-card {
            padding: 20px 0 20px 70px;
            span {
              font-size: 28px;
            }
            div {
              margin-bottom: 10px;
              &:last-child {
                span:nth-child(2) {
                  color: $themeColor;
                }
              }
            }
          }
          &-no_card {
            padding: 20px 0 20px 70px;
            span {
              font-size: 50px;
            }
            a {
              font-size: 30px;
              border-bottom: 1PX solid $themeColor;
              color: $themeColor;
            }
          }
        }
      }
      &-coupon {
        background-color: white;
        &_link {
          display: flex;
          background-color: white;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          div {
            font-size: 30px;
          }
          &_right {
            display: flex;
            align-items: center;
            color: #999999;
          }
          i {
            font-size: 40px;
          }
        }
        &_popup {
          &-container {
            min-height: 400px;
            max-height: 100vh;
            overflow: auto;
            &-title {
              padding: 30px 0;
              text-align: center;
            }
            &-list {
              padding: 20px;
              &-item {
                padding: 5px 10px;
                margin: 10px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                div:nth-child(2) {
                  position: relative;
                }
                div {
                  font-size: 28px;
                }
                label {
                  font-size: 28px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  border: 1px solid #999;
                }
                input {
                  width: 30px;
                  height: 30px;
                  opacity: 0;
                }
                input:checked+label {
                  background-color: $themeColor;
                  border: 1PX solid $themeColor;
                }
                input:checked+label::after {
                  position: absolute;
                  content: "";
                  width: 7px;
                  height: 12px;
                  top: 4px;
                  left: 8px;
                  border: 1PX solid #fff;
                  border-top: none;
                  border-left: none;
                  transform: rotate(45deg);
                }
              }
              &-none {
                text-align: center;
              }
            }
          }
        }
      }
    }
    &-footer {
      background-color: white;
      padding: 20px 0;
      position: fixed;
      bottom: 0;
      z-index: 2;
      display: flex;
      justify-content: flex-end;
      width: 720px;
      div {
        span {
          &:nth-child(1) {
            font-size: 30px;
            i {
              font-style: normal;
              color: $themeColor;
              font-size: 30px;
            }
          }
          &:nth-child(2) {
            font-size: 30px;
            border: 1PX solid #f5f5f5;
            background-color: $themeColor;
            color: white;
            font-weight: 100;
            padding: 25px 20px;
          }
        }
      }
    }
  }
  .opacity-0{
    opacity: 0;
  }
</style>-->

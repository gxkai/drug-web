<template>
  <new-layout class="pay_shop">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="pay_shop-content">
        <div class="pay_shop-content-delivery"
             v-if="deliveryType === 'DELIVERY'"
             @click="linkToOrderAddress(orderShopDrugSpecDTO.shopId)">
          <div class="pay_shop-content-delivery-no_address"
               v-if="address.id === undefined">
            请选择收货地址&gt;
          </div>
          <div class="pay_shop-content-delivery-address"
               v-else
          >
            <div class="pay_shop-content-delivery-address-left">
              <i class="iconfont ic-dizhi"></i>
            </div>
            <div class="pay_shop-content-delivery-address-center">
              <div class="elps">
                <span>收货人&#58;{{address.consignee}}</span>
                <span class="ml-l-10">{{address.phone}}</span>
              </div>
              <div class="elps">
                收货地址&#58;{{`${address.address} ${address.room}`}}
              </div>
            </div>
            <div class="pay_shop-content-delivery-address-right">
              <i class="iconfont ic-youjiantou"></i>
            </div>
          </div>
          <div class="pay_shop-content-delivery-bar">
            <img src="../../../assets/image/colorbackground.png">
          </div>
        </div>
        <new-close-shop :shopInfo="shopDrugSpecOrderDTO"></new-close-shop>
        <div class="pay_shop-content-delivery_type">
          <div class="pay_shop-content-delivery_type-header">
            <div>
              <i class="iconfont ic-peisongfangshi"></i>
            </div>
            <div>配送方式</div>
          </div>
          <div class="pay_shop-content-delivery_type-content">
            <span :class="{active:deliveryType=='DELIVERY'}"
            @click.stop="onDeliveryType('DELIVERY')"
            v-if="shopDrugSpecOrderDTO.distribution === true">
            送货
            </span>
            <span :class="{active:deliveryType=='SELF'}"
                  @click.stop="onDeliveryType('SELF')">上门自提</span>
          </div>
        </div>

        <div class="pay_shop-content-delivery_type">
          <div class="pay_shop-content-delivery_type-header">
            <div>
              <i class="iconfont ic-qian"></i>
            </div>
            <div>付费方式</div>
          </div>
          <div class="pay_shop-content-delivery_type-content">
            <span :class="{active:isMedicaidPay==true}"
                  v-if="shopDrugSpecOrderDTO.rxId !== null"
                  @click.stop="isMedicaidPay = true">
            医保
            </span>
            <span :class="{active:isMedicaidPay==false}"
                  @click.stop="isMedicaidPay = false">自费</span>
          </div>
        </div>
        <div class="pay_shop-content-pay_amount">
          <div>
            <span>商品总额：</span>
            <span>&yen;{{toFixedTwo(shopDrugSpecOrderDTO.amount)}}</span>
          </div>
          <div>
            <span>医保扣除：</span>
            <span>&yen;{{toFixedTwo(shopDrugSpecOrderDTO.medicaidAmount)}}</span>
          </div>
          <div>
            <span>实际支付：</span>
            <span>&yen;{{toFixedTwo(shopDrugSpecOrderDTO.payAmount)}}</span>
          </div>
        </div>
        <div class="dividing"></div>
        <!--<div class="pay_shop-content-medicaid">-->
          <!--<div class="pay_shop-content-medicaid-header">-->
            <!--医保信息-->
          <!--</div>-->
          <!--<div class="pay_shop-content-medicaid-content">-->
            <!--<div class="pay_shop-content-medicaid-content-card"-->
                 <!--v-if="isNotBlank(account.medicaidNumber)">-->
              <!--<div>-->
                <!--<span>会员姓名&#58;</span>-->
                <!--<span>{{account.name}}</span>-->
              <!--</div>-->
              <!--<div>-->
                <!--<span>医保卡号&#58;</span>-->
                <!--<span>{{account.medicaidNumber}}</span>-->
              <!--</div>-->
              <!--<div>-->
                <!--<span>卡内余额&#58;</span>-->
                <!--<span>&yen;0</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="pay_shop-content-medicaid-content-no_card"-->
                 <!--v-else>-->
              <!--<span class="iconfont ic-qianbao"></span>-->
              <!--<a @click="linkToCardBind">去绑定医保卡</a>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="pay_shop-content-coupon">-->
        <!--<div class="pay_shop-content-coupon_link">-->
        <!--<div class="pay_shop-content-coupon_link_left">优惠券</div>-->
        <!--<div class="pay_shop-content-coupon_link_right">-->
        <!--<div v-if="isNotBlank(couponRecord)">-->
        <!--满{{couponRecord.amount}}减{{couponRecord.minus}}-->
        <!--</div>-->
        <!--<div @click="show = true">-->
        <!--<i class="iconfont ic-youjiantou"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="pay_shop-content-coupon_popup">-->
        <!--<van-popup v-model="show" position="bottom">-->
        <!--<div class="pay_shop-content-coupon_popup-container">-->
        <!--<div class="pay_shop-content-coupon_popup-container-title text-l-30">-->
        <!--使用优惠券-->
        <!--</div>-->
        <!--<div class="pay_shop-content-coupon_popup-container-list">-->
        <!--<div class="pay_shop-content-coupon_popup-container-list-item van-hairline&#45;&#45;bottom"-->
        <!--v-for="(item,key) in coupons"-->
        <!--:key="key"-->
        <!--@click="couponRecord = item;show = false;payAmount = shopDrugSpecOrderDTO.payAmount - item.minus">-->
        <!--<div class="text-l-28">-->
        <!--满{{item.amount}}减{{item.minus}}-->
        <!--</div>-->
        <!--<div>-->
        <!--<input :id="item" type="radio"  :value="item"   v-model="couponRecord">-->
        <!--<label :for="item"></label>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-if="coupons.length === 0" class="pay_shop-content-coupon_popup-container-list-none text-l-28">-->
        <!--没有可用优惠券-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</van-popup>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="dividing"></div>-->
      </div>
    </template>
    <template slot="bottom">
      <van-submit-bar
        :price="payAmount*100"
        button-text="立即支付"
        @submit="onOrder"
        :loading="loading"
      />
    </template>
  </new-layout>
</template>
<script>
  import { getReceivedAddress } from '../../../assets/js/auth';

  export default {
    name: 'createFromCart',
    data() {
      return {
        name: '订单结算',
        account: this.$store.getters.account,
        orderShopDrugSpecDTO: JSON.parse(this.$route.query.orderShopDrugSpecDTO),
        shopDrugSpecOrderDTO: {},
        deliveryType: 'DELIVERY',
        payType: 'KRCB',
        couponRecord: '',
        coupons: [],
        show: false,
        payAmount: 0,
        loading: false,
        address: {},
        isMedicaidPay: false
      };
    },
    components: {},
    computed: {
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    activated() {
      const address = getReceivedAddress();
      if (address !== undefined) {
        this.address = address;
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$route.meta.keepAlive = false;
      next();
    },
    methods: {
      async initData() {
        const data1 = await this.$http.post('orders/shop/pre-close', this.orderShopDrugSpecDTO);
        this.payAmount = data1.payAmount;
        this.shopDrugSpecOrderDTO = data1;
        const data2 = await this.$http.get('couponRecords/order');
        this.coupons = data2.filter(e => data1.payAmount >= e.amount);
      },
      async onOrder() {
        if (this.deliveryType === 'DELIVERY' && this.address.id === undefined) {
          this.$toast('地址还没维护呢');
          return;
        }
        this.loading = true;
        let json = {};
        json.addressId = this.address.id;
        json.orderShopDrugSpecDTO = this.orderShopDrugSpecDTO;
        json.deliveryType = this.deliveryType;
        json.payType = this.payType;
        json.couponRecordId = this.couponRecord.id;
        json.isMedicaidPay = this.isMedicaidPay;
        this.$http.post('/orders/shop', json).then(() => {
          this.$router.push('/orders');
        }).catch(() => {
          this.loading = false;
        });
      },
      onDeliveryType(item) {
        this.deliveryType = item;
      },
      onPayType(item) {
        this.payType = item;
      }
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .active {
    color: #ef4f4f;
  }
  .text-red {
    color: #ef4f4f;
  }
  .dividing {
    width: 100%;
    height: 10px;
    background-color: #f5f5f5;
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
          padding: 10px 0 30px 70px;
          span {
            border: 1PX solid #f5f5f5;
            font-size: 30px;
            &:not(:first-child) {
              margin-left: 10px;
            }
          }
        }
      }
      &-pay_type {
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
          padding: 10px 0 30px 50px;
          span {
            font-size: 70px;
          }
        }
      }
      &-pay_amount {
        background-color: white;
        padding: 20px 0 20px 70px;
        span {
          font-size: 28px;
        }
        div {
          margin-bottom: 10px;
          span:nth-child(2) {
            color: #ef4f4f;
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
                  color: #ef4f4f;
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
              border-bottom: 1PX solid #1AB6FD;
              color: #1AB6FD;
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
                  background-color: #13C1FE;
                  border: 1PX solid #13C1FE;
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
              color: #ef4f4f;
              font-size: 30px;
            }
          }
          &:nth-child(2) {
            font-size: 30px;
            border: 1PX solid #f5f5f5;
            background-color: #ef4f4f;
            color: white;
            font-weight: 100;
            padding: 25px 20px;
          }
        }
      }
    }
  }

  .pay_shop-content-delivery_type-content span{
   width: 146px;
    height: 55px;
    display: inline-block;
    line-height: 55px;
    text-align: center;
    border-radius:4px;
  }
  .opacity-0{
    opacity: 0;
  }
  .ic-weixin{
    color: gray;
  }
  .ic-alipay{
    color: gray;
  }

  .ic-weixin.active{
    color: #72bd63!important;
  }
  .ic-alipay.active{
    color: #009fe8!important;
  }

</style>


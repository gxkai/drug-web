<template>
  <new-layout class="pay_cart">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="pay_cart-content">
        <div class="pay_cart-content-delivery_type">
          <div class="pay_cart-content-delivery_type-content">
           <span :class="{active:deliveryType=='DELIVERY'}"
                 @click.stop="onDeliveryType('DELIVERY')" v-if="cartShop.distribution">送货上门</span>
            <span :class="{active:deliveryType=='SELF'}"
                  @click.stop="onDeliveryType('SELF')">上门自提</span>
          </div>
        </div>
        <div class="pay_cart-content-delivery"
             v-if="deliveryType === 'DELIVERY'"
             @click="linkToOrderAddress(cartShop.id)">
          <div class="pay_cart-content-delivery-address"
               v-if="address!== undefined">
            <van-icon name="dizhi" size="4em" color="#a6a6a6"></van-icon>
            <div class="pay_cart-content-delivery-address-center">
              <div class="elps">
                <span>收货人&#58;{{address.consignee}}</span>
                <span class="ml-l-10">{{address.phone}}</span>
              </div>
              <div class="elps">
                收货地址&#58;{{address.address}}
              </div>
            </div>
            <van-icon name="arrow" size="2em"></van-icon>
          </div>
          <div class="pay_cart-content-delivery-no_address"
               v-else>
            请维护地址&gt;
          </div>
          <div class="pay_cart-content-delivery-bar">
            <img src="../../../assets/image/colorbackground.png">
          </div>
        </div>
        <new-close-list :cartShop="cartShop" class="new-close-list"></new-close-list>

        <div class="pay_cart-content-pay_type">
          <!--<div class="pay_cart-content-pay_type-header">-->
            <!--<van-icon name="qian" size="4em"></van-icon>-->
            <!--<div>付费方式</div>-->
          <!--</div>-->
          <div class="pay_cart-content-pay_type-content">
           <span :class="{active:isMedicarePay==false}"
                 @click.stop="isMedicarePay = false">自费</span>
            <span :class="{active:isMedicarePay==true}"
                  @click.stop="isMedicarePay = true"
                  v-if="isRx === true && account.medicaidNumber !== undefined">医保</span>
          </div>
        </div>
        <!--<div class="pay_cart-content-pay_type">-->
        <!--<div class="pay_cart-content-pay_type-header">-->
        <!--<div>-->
        <!--<i class="iconfont ic-dingdanzhifufangshi"></i>-->
        <!--</div>-->
        <!--<div>支付方式</div>-->
        <!--</div>-->
        <!--<div class="pay_cart-content-pay_type-content">-->
        <!--<span class="iconfont ic-weixin"-->
        <!--:class="{active:payType=='WECHAT_PAY'}"-->
        <!--@click.stop="onPayType('WECHAT_PAY')"></span>-->
        <!--<span class="iconfont ic-alipay"-->
        <!--:class="{active:payType=='ALIPAY'}"-->
        <!--@click.stop="onPayType('ALIPAY')"></span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="pay_cart-content-pay_amount">
          <div>
            <span>商品总额：</span>
            <span>&yen;{{toFixedTwo(cartShop.amount)}}</span>
          </div>
          <div v-if="isMedicarePay">
            <span>医保扣除：</span>
            <span>&yen;{{toFixedTwo(cartShop.medicaidAmount)}}</span>
          </div>
          <div>
            <span>实际支付：</span>
            <span  v-if="isMedicarePay">&yen;{{toFixedTwo(cartShop.payAmount)}}</span>
            <span  v-else>&yen;{{toFixedTwo(cartShop.amount)}}</span>
          </div>
        </div>
        <!--<div class="pay_cart-content-medicaid">-->
        <!--<div class="pay_cart-content-medicaid-header">-->
        <!--医保信息-->
        <!--</div>-->
        <!--<div class="pay_cart-content-medicaid-content">-->
        <!--<div class="pay_cart-content-medicaid-content-card"-->
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
        <!--<div class="pay_cart-content-medicaid-content-no_card"-->
        <!--v-else>-->
        <!--<span class="iconfont ic-qianbao"></span>-->
        <!--<a @click="linkToCardBind">去绑定医保卡</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="pay_cart-content-coupon">-->
        <!--<div class="pay_cart-content-coupon_link">-->
        <!--<div class="pay_cart-content-coupon_link_left">优惠券</div>-->
        <!--<div class="pay_cart-content-coupon_link_right">-->
        <!--<div v-if="isNotBlank(couponRecord)">-->
        <!--满{{couponRecord.amount}}减{{couponRecord.minus}}-->
        <!--</div>-->
        <!--<div @click="show = true">-->
        <!--<i class="iconfont ic-youjiantou"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="pay_cart-content-coupon_popup">-->
        <!--<van-popup v-model="show" position="bottom">-->
        <!--<div class="pay_cart-content-coupon_popup-container">-->
        <!--<div class="pay_cart-content-coupon_popup-container-title text-l-30">-->
        <!--使用优惠券-->
        <!--</div>-->
        <!--<div class="pay_cart-content-coupon_popup-container-list">-->
        <!--<div class="pay_cart-content-coupon_popup-container-list-item"-->
        <!--v-for="(item,key) in coupons"-->
        <!--:key="key"-->
        <!--@click="couponRecord = item;show = false;payAmount = cart.payAmount - item.minus">-->
        <!--<div class="text-l-28">-->
        <!--满{{item.amount}}减{{item.minus}}-->
        <!--</div>-->
        <!--<div>-->
        <!--<input :id="item" type="radio"  :value="item"   v-model="couponRecord">-->
        <!--<label :for="item"></label>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-if="coupons.length === 0" class="pay_cart-content-coupon_popup-container-list-none text-l-28">-->
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
        style="position: static"
      />
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
        cartShop: JSON.parse(this.$route.query.cartShop),
        isRx: this.$route.query.isRx,
        deliveryType: 'SELF',
        payType: 'KRCB',
        couponRecord: '',
        coupons: [],
        show: false,
        payAmount: 0,
        loading: false,
        address: undefined,
        medicaidInfo: {},
        isMedicarePay: false
      };
    },
    components: {},
    created() {
      this.initData();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.address = vm.$route.query.address;
      });
    },
    beforeRouteLeave(to, from, next) {
      to.query.address = this.address;
      next();
    },
    mounted() {
    },
    computed: {},
    methods: {
      async initData() {
        console.log(this.cartShop);
        this.payAmount = this.cartShop.payAmount;
        const data = await this.$http.get('couponRecords/order');
        this.coupons = data.filter(e => this.cartShop.payAmount >= e.amount);
        // this.medicaidInfo = await this.$http.get('/medicaidInfo');
        // console.log(this.medicaidInfo);
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
        this.$toast.loading({ duration: 0, forbidClick: true, message: '生成订单中...' });
        let order = await this.$http.post('/orders', json);
        this.$toast.loading({ duration: 0, forbidClick: true, message: '生成支付链接中...' });
        let url = await this.$http.get(`/orders/${order.id}/pay`);
        this.$toast.clear();
        console.log(url);
        window.location.href = url;
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
<style scoped type="text/scss" lang="scss">
  .active {
    color: #ef4f4f;
    border: 1PX solid $themeColor!important;
  }

  .text-red {
    color: $themeColor;
  }

  .dividing {
    width: 100%;
    height: 10px;
    background-color: #f5f5f5;
  }

  .pay_cart {
    &-content {
      &-delivery {
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
                input:checked + label {
                  background-color: $themeColor;
                  border: 1PX solid $themeColor;
                }
                input:checked + label::after {
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
      width: 100%;
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
            padding: 20px 40px;
          }
        }
      }
    }
  }

  .ic-weixin.active {
    color: #72bd63 !important;
  }

  .ic-alipay.active {
    color: #009fe8 !important;
  }

  .pay_shop-content-pay_type-content span {
    background: grey;
  }


</style>


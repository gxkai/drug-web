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
        <new-close-list :cartShops="cart.cartShops" class="new-close-list"></new-close-list>
        <div class="pay_cart-content-delivery_type">
          <div class="pay_cart-content-delivery_type-header">
            <div>
              <i class="iconfont ic-peisongfangshi"></i>
            </div>
            <div>配送方式</div>
          </div>
          <div class="pay_cart-content-delivery_type-content">
            <span>上门自提</span>
          </div>
        </div>
        <div class="pay_cart-content-pay_amount">
          <div>
            <span>商品总额：</span>
            <span>&yen;{{toFixedTwo(cart.amount)}}</span>
          </div>
          <div>
            <span>医保扣除：</span>
            <span>&yen;{{toFixedTwo(cart.medicaidAmount)}}</span>
          </div>
          <div>
            <span>实际支付：</span>
            <span>&yen;{{toFixedTwo(cart.payAmount)}}</span>
          </div>
        </div>
      </div>
    </template>
   <template slot="bottom">
     <van-submit-bar
       :price="payAmount*100"
       button-text="提交订单"
       @submit="onOrder"
       :loading="loading"
     >
       <van-checkbox v-model="isMedicarePay">是否使用医保</van-checkbox>
     </van-submit-bar>
   </template>
  </new-layout>


</template>
<script>
  import { getAccount, getData } from '../../../assets/js/auth';

  export default {
    name: 'createFromCart',
    data() {
      return {
        name: '订单结算',
        account: getAccount(),
        cart: JSON.parse(this.$route.query.cart),
        deliveryType: this.$storage.get('deliveryType') || 'SELF',
        payType: 'KRCB',
        couponRecord: '',
        coupons: [],
        show: false,
        payAmount: 0,
        loading: false,
        isMedicarePay: false,
        data: getData()
      };
    },
    components: {},
    created() {
      this.payAmount = this.cart.payAmount;
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      /**
       * 获取购物车ID数组
       * @returns {Array}
       */
      getCartIds() {
        let cartIds = [];
        this.cart.rxs.forEach(e => {
          e.drugs.forEach(e => {
            cartIds.push(e.cartId);
          });
        });
        return cartIds;
      },
      async onOrder() {
        try {
          console.log(this.cart);
          this.loading = true;
          let json = {};
          json.cartIds = this.getCartIds();
          json.deliveryType = this.deliveryType;
          json.payType = this.payType;
          json.isMedicarePay = this.isMedicarePay;
          json.orderNumber = this.cart.orderNumber;
          json.isRx = true;
          json.payOrigin = 'RX';
          json.recMasterId = this.data.key.map(e => e.recMasterId).join('|');
          console.log(json);
          let url = await this.$http.post('/orders', json);
          window.location.href = url;
        } catch (e) {
          this.loading = false;
          this.$toast('支付失败');
        }
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
  /deep/.van-checkbox {
    padding: 20px;
    &__label {
      font-size: 25px;
    }
  }
  .pay_cart {
    background-color: #f5f5f5;
    width: 720px;
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
          padding: 10px 0 30px 50px;
          span {
            font-size: 70px;
          }
        }
      }
      &-pay_amount {
        background-color: white;
        height: 200px;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        padding: 20px 0 20px 70px;
        margin-bottom: 20px;
        span {
          font-size: 28px;
        }
        div {
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
      width: 100%;
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
            padding: 20px 40px;
          }
        }
      }
    }
  }


  .ic-weixin.active{
    color: #72bd63!important;
  }
  .ic-alipay.active{
    color: #009fe8!important;
  }
  .pay_cart-content-pay_amount{
    padding: 0px 0px 0px 20px;
  }
  .pay_shop-content-pay_type-content span{
    background: grey;
  }



</style>


<template>
  <div class="pay_cart">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="pay_cart-content">
      <div class="pay_cart-content-delivery"
           v-if="deliveryType === 'DELIVERY'"
           @click="linkToOrderAddress">
        <div class="pay_cart-content-delivery-address"
             v-if="isNotBlank(receiveAddress)">
          <div class="pay_cart-content-delivery-address-left">
            <i class="iconfont ic-dizhi"></i>
          </div>
          <div class="pay_cart-content-delivery-address-center">
            <div class="elps">
              <span>收货人&#58;{{receiveAddress.consignee}}</span>
              <span class="ml-l-10">{{receiveAddress.phone}}</span>
            </div>
            <div class="elps">
              收货地址&#58;{{receiveAddress.address}}
            </div>
          </div>
          <div class="pay_cart-content-delivery-address-right">
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </div>
        <div class="pay_cart-content-delivery-no_address"
             v-else>
          请维护地址&gt;
        </div>
        <div class="pay_cart-content-delivery-bar">
          <img src="../../../assets/image/colorbackground.png">
        </div>
      </div>
      <new-close-list :cartShops="cart.cartShops" class="new-close-list"></new-close-list>
      <div class="pay_cart-content-delivery_type">
        <div class="pay_cart-content-delivery_type-header">
          <div>
            <i class="iconfont ic-peisongfangshi"></i>
          </div>
          <div>配送方式</div>
        </div>
        <div class="pay_cart-content-delivery_type-content">
          <span :class="{active:deliveryType=='DELIVERY'}"
                @click.stop="onDeliveryType('DELIVERY')">送货上门</span>
          <span :class="{active:deliveryType=='SELF'}"
                @click.stop="onDeliveryType('SELF')">上门自提</span>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_cart-content-pay_type">
        <div class="pay_cart-content-pay_type-header">
          <div>
            <i class="iconfont ic-dingdanzhifufangshi"></i>
          </div>
          <div>支付方式</div>
        </div>
        <div class="pay_cart-content-pay_type-content">
            <span class="iconfont ic-weixin"
                  :class="{active:payType=='WECHAT_PAY'}"
                  @click.stop="onPayType('WECHAT_PAY')"></span>
          <span class="iconfont ic-alipay"
                :class="{active:payType=='ALIPAY'}"
                @click.stop="onPayType('ALIPAY')"></span>
        </div>
      </div>
      <div class="dividing"></div>
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
      <div class="dividing"></div>
      <div class="pay_cart-content-medicaid">
        <div class="pay_cart-content-medicaid-header">
          医保信息
        </div>
        <div class="pay_cart-content-medicaid-content">
          <div class="pay_cart-content-medicaid-content-card"
          v-if="isNotBlank(account.medicaidNumber)">
            <div>
              <span>会员姓名&#58;</span>
              <span>{{account.name}}</span>
            </div>
            <div>
              <span>医保卡号&#58;</span>
              <span>{{account.medicaidNumber}}</span>
            </div>
            <div>
              <span>卡内余额&#58;</span>
              <span>&yen;0</span>
            </div>
          </div>
          <div class="pay_cart-content-medicaid-content-no_card"
          v-else>
            <span class="iconfont ic-qianbao"></span>
            <a @click="linkToCardBind">去绑定医保卡</a>
          </div>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_cart-content-coupon">
        <div class="pay_cart-content-coupon_link">
          <div class="pay_cart-content-coupon_link_left">优惠券</div>
          <div class="pay_cart-content-coupon_link_right">
            <div v-if="isNotBlank(couponRecord)">
              满{{couponRecord.amount}}减{{couponRecord.minus}}
            </div>
            <div @click="show = true">
              <i class="iconfont ic-youjiantou"></i>
            </div>
          </div>
        </div>
        <div class="pay_cart-content-coupon_popup">
          <van-popup v-model="show" position="bottom">
            <div class="pay_cart-content-coupon_popup-container">
              <div class="pay_cart-content-coupon_popup-container-title text-l-30">
                使用优惠券
              </div>
              <div class="pay_cart-content-coupon_popup-container-list">
                <div class="pay_cart-content-coupon_popup-container-list-item"
                     v-for="(item,key) in coupons"
                     :key="key"
                     @click="couponRecord = item;show = false;payAmount = cart.payAmount - item.minus">
                  <div class="text-l-28">
                    满{{item.amount}}减{{item.minus}}
                  </div>
                  <div>
                    <input :id="item" type="radio"  :value="item"   v-model="couponRecord">
                    <label :for="item"></label>
                  </div>
                </div>
                <div v-if="coupons.length === 0" class="pay_cart-content-coupon_popup-container-list-none text-l-28">
                  没有可用优惠券
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
      <div class="dividing"></div>
    </div>
    <div class="pay_cart-footer">
      <div>
        <span>实付金额&#58;<i>&yen;{{payAmount}}</i></span>
        <span @click.stop="onOrder()">提交订单</span>
      </div>
    </div>
  </div>


</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';

  export default {
    name: 'createFromCart',
    data() {
      return {
        name: '订单结算',
        account: this.$store.getters.account,
        cart: JSON.parse(this.$route.query.cart),
        deliveryType: this.$storage.get('deliveryType') || 'SELF',
        payType: 'ALIPAY',
        couponRecord: '',
        coupons: [],
        show: false,
        payAmount: 0
      };
    },
    components: {},
    created() {
      this.getData();
    },
    computed: {
      ...mapGetters(['receiveAddress'])
    },
    methods: {
      getData() {
        this.payAmount = this.cart.payAmount;
        if (this.isBlank(this.receiveAddress)) {
          this.$http.get('addresses/default').then(res => {
            if (res.data) {
              this.setReceiveAddress(res.data);
            }
          }).catch(error => {
            this.exception(error);
          });
        }
        this.$http.get('couponRecords/order')
          .then(res => {
            this.coupons = res.data.filter(e => this.cart.payAmount >= e.amount);
            console.log(this.coupons);
          })
          .catch(err => {
            this.exception(err);
          });
      },
      /**
       * 获取购物车ID数组
       * @returns {Array}
       */
      getCartIds() {
        let cartIds = [];
        this.cart.cartShops.forEach(e => {
          e.rxs.forEach(e => {
            e.drugs.forEach(e => {
              cartIds.push(e.cartId);
            });
          });
        });
        return cartIds;
      },
      onOrder() {
        let json = {};
        switch (this.deliveryType) {
          case 'DELIVERY':
            if (this.isBlank(this.receiveAddress)) {
              Toast('请维护收货地址');
            } else {
              json.addressId = this.receiveAddress.id;
            }
        }
        json.cartIds = this.getCartIds();
        json.deliveryType = this.deliveryType;
        json.payType = this.payType;
        this.$http.post('/orders', json).then(res => {
          let str = '';
          res.data.forEach(e => {
            str += 'orderIds=' + e + '&';
          });
          str = str.substring(0, str.length - 1);
          this.$router.replace({
            path: '/orders/pay?' + str + '&deliveryType=' + this.deliveryType
          });
        }).catch(error => {
          this.exception(error);
        });
      },
      onDeliveryType(item) {
        this.$storage.set('deliveryType', item);
        this.deliveryType = item;
      },
      onPayType(item) {
        this.payType = item;
      },
      ...mapMutations({
        setReceiveAddress: 'SET_RECEIVE_ADDRESS'
      })
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

  .pay_cart {
    background-color: #f5f5f5;
    width: 720px;
    &-content {
      margin-bottom: 90px;
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


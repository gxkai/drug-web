<template>
  <div class="pay_cart">
    <new-header title="订单结算">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
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
          <span>商品总额&#58;</span>
          <span>&yen;{{cart.amount.toFixed(2)}}</span>
        </div>
        <div>
          <span>医保扣除&#58;</span>
          <span>&yen;{{cart.medicaidAmount.toFixed(2)}}</span>
        </div>
        <div>
          <span>实际支付&#58;</span>
          <span>&yen;{{cart.payAmount.toFixed(2)}}</span>
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
                     @click="couponRecord = item;show = false;payAmount -= item.amount">
                  <div class="text-l-28">
                    满{{item.amount}}减{{item.minus}}
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
  import { MessageBox } from 'mint-ui';

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
        if (this.deliveryType === 'DELIVERY' && JSON.stringify(this.receiveAddress) === '{}') {
          MessageBox('提示', '请维护收货地址').then(action => {
          });
        } else {
          let data = {
            'addressId': this.receiveAddress.id,
            'cartIds': this.getCartIds(),
            'deliveryType': this.deliveryType,
            'payType': this.payType
          };
          this.$layer.loading('订单生成中');
          this.$http.post('/orders', data).then(res => {
            this.$layer.close();
            let str = '';
            res.data.forEach(e => {
              str += 'orderIds=' + e + '&';
            });
            str = str.substring(0, str.length - 1);
            this.$router.replace({
              path: '/orders/pay?' + str + '&deliveryType=' + this.deliveryType
            });
          }).catch(error => {
            this.$layer.close();
            this.exception(error);
          });
        }
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
              span:nth-child(2) {
                color: #ef4f4f;
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
            height: 400px;
            overflow: auto;
            &-title {
              padding: 30px 0;
              text-align: center;
            }
            &-list {
              padding: 20px;
              &-item {
                text-align: center;
                border-bottom: 1PX solid #999999;
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

</style>
<style scoped>
  /*.main {*/
  /*background-color: rgba(246, 246, 246, 1);*/
  /*height: 100vh;*/
  /*width: 720px;*/
  /*}*/

  /*.body {*/
  /*width: 720px;*/
  /*height: calc(100vh - 100px - 130px);*/
  /*overflow: auto;*/
  /*}*/

  /*.address {*/
  /*width: 100%;*/
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*padding: 20px 0;*/
  /*}*/
  /*.address>div:nth-child(1) {*/
  /*width: 10%;*/
  /*margin-left: 10px;*/
  /*}*/
  /*.address>div:nth-child(2) {*/
  /*width: 80%;*/
  /*}*/
  /*.address>div:nth-child(2)>div:nth-child(1) {*/
  /*margin-top: 10px;*/
  /*}*/
  /*.address>div:nth-child(2)>div:nth-child(2) {*/
  /*margin-top: 10px;*/
  /*}*/
  /*.address>div:nth-child(3) {*/
  /*width: 10%;*/
  /*}*/
  /*.address .iconfont {*/
  /*font-size: 50px;*/
  /*}*/

  /*.image-bar {*/
  /*width: 100%;*/
  /*}*/

  /*.delivery, .pay {*/
  /*background-color: rgba(255, 255, 255, 1);*/
  /*margin-bottom: 10px;*/
  /*height: 160px;*/
  /*}*/

  /*.delivery .top {*/
  /*display: flex;*/
  /*align-items: center;*/
  /*}*/

  /*.delivery .top i {*/
  /*margin-left: 10px;*/
  /*margin-right: 10px;*/
  /*}*/

  /*.delivery .bottom {*/
  /*margin-left: 72px;*/
  /*}*/

  /*.delivery .bottom button {*/
  /*width: 146px;*/
  /*height: 55px;*/
  /*background: rgba(255, 255, 255, 1);*/
  /*border-radius: 4px;*/
  /*font-size: 24px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*outline: none;*/
  /*border-width: 2px;*/
  /*}*/

  /*.delivery .bottom .active {*/
  /*border-color: #F02B2B;*/
  /*color: rgba(240, 43, 43, 1);*/
  /*}*/

  /*.pay .top {*/
  /*display: flex;*/
  /*align-items: center;*/
  /*}*/

  /*.pay .top i {*/
  /*margin-left: 10px;*/
  /*margin-right: 10px;*/
  /*}*/

  /*.pay .bottom {*/
  /*margin-left: 72px;*/
  /*}*/

  /*.pay .bottom img {*/
  /*width: 80px;*/
  /*height: 80px;*/
  /*background: rgba(255, 255, 255, 1);*/
  /*border-radius: 10px;*/
  /*}*/

  /*.iconfont {*/
  /*font-size: 50px;*/
  /*}*/

  /*.amount {*/
  /*width: 720px;*/
  /*height: 160px;*/
  /*background: rgba(255, 255, 255, 1);*/
  /*box-shadow: 1px 0px 0px rgba(230, 230, 230, 0.52);*/
  /*margin-bottom: 10px;*/
  /*padding: 20px;*/
  /*}*/

  /*.amount div > span:nth-child(1) {*/
  /*font-size: 20px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(51, 51, 51, 1);*/
  /*}*/

  /*.amount div > span:nth-child(2) {*/
  /*font-size: 24px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(255, 0, 0, 1);*/
  /*}*/

  /*.amount div > span:nth-child(3) {*/
  /*font-size: 18px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(153, 153, 153, 1);*/
  /*}*/

  /*.medical {*/
  /*width: 720px;*/
  /*height: 260px;*/
  /*background: rgba(255, 255, 255, 1);*/
  /*box-shadow: 1px 0px 0px rgba(230, 230, 230, 1);*/
  /*margin-bottom: 10px;*/
  /*}*/

  /*.medical > div:nth-child(1) {*/
  /*padding: 20px;*/
  /*}*/

  /*.medical > div:nth-child(1) > span {*/
  /*font-size: 24px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(51, 51, 51, 1);*/
  /*}*/

  /*.medical-info {*/
  /*padding: 20px;*/
  /*font-size: 24px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(102, 102, 102, 1);*/
  /*}*/

  /*.medical-info div {*/
  /*margin-bottom: 5px;*/
  /*}*/

  /*!***/
  /*脚部*/
  /**!*/

  /*footer {*/
  /*display: flex;*/
  /*height: 100px;*/
  /*width: 720px;*/
  /*justify-content: flex-end;*/
  /*position: fixed;*/
  /*bottom: 0;*/
  /*background: rgba(255, 255, 255, 1);*/
  /*}*/

  /*footer .right {*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*}*/

  /*footer .right .left {*/
  /*align-self: center;*/
  /*margin-right: 20px;*/
  /*}*/

  /*footer .right .left span:nth-child(1) {*/
  /*font-size: 28px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(102, 102, 102, 1);*/
  /*}*/

  /*footer .right .left span:nth-child(2) {*/
  /*font-size: 28px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: #F02B2B;*/
  /*}*/

  /*footer .right button {*/
  /*width: 214px;*/
  /*height: 100px;*/
  /*box-sizing: border-box;*/
  /*background: rgba(240, 43, 43, 1);*/
  /*font-size: 30px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(255, 255, 255, 1);*/
  /*border: 0;*/
  /*outline: none;*/
  /*}*/

  /*.medical-bangding {*/
  /*font-size: 24px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(69, 69, 69, 1);*/
  /*margin-left: 10px;*/
  /*}*/

  /*.ic-qianbao {*/
  /*font-size: 24px;*/
  /*}*/

  /*.medical-qubangding a {*/
  /*font-size: 18px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(19, 193, 254, 1);*/
  /*text-decoration: underline;*/
  /*margin-left: 68px;*/
  /*}*/

  /*.medical-qubangding button {*/
  /*width: 132px;*/
  /*height: 36px;*/
  /*background: rgba(19, 193, 254, 1);*/
  /*box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.33);*/
  /*font-size: 22px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*color: rgba(255, 255, 255, 1);*/
  /*line-height: 10px;*/
  /*border-radius: 50px;*/
  /*outline: none;*/
  /*border: 0;*/
  /*}*/
</style>


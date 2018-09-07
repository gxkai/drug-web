<template>
  <div class="pay_shop">
    <new-header title="订单结算">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="pay_shop-content">
      <div class="pay_shop-content-delivery"
           v-if="deliveryType === 'DELIVERY'"
           @click="linkToOrderAddress">
        <div class="pay_shop-content-delivery-address"
             v-if="isNotBlank(receiveAddress)">
          <div class="pay_shop-content-delivery-address-left">
            <i class="iconfont ic-dizhi"></i>
          </div>
          <div class="pay_shop-content-delivery-address-center">
            <div class="elps">
              <span>收货人&#58;{{receiveAddress.consignee}}</span>
              <span class="ml-l-10">{{receiveAddress.phone}}</span>
            </div>
            <div class="elps">
              收货地址&#58;{{receiveAddress.address}}
            </div>
          </div>
          <div class="pay_shop-content-delivery-address-right">
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </div>
        <div class="pay_shop-content-delivery-no_address"
             v-else>
          请维护地址&gt;
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
                @click.stop="onDeliveryType('DELIVERY')">送货上门</span>
          <span :class="{active:deliveryType=='SELF'}"
                @click.stop="onDeliveryType('SELF')">上门自提</span>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_shop-content-pay_type">
        <div class="pay_shop-content-pay_type-header">
          <div>
            <i class="iconfont ic-dingdanzhifufangshi"></i>
          </div>
          <div>支付方式</div>
        </div>
        <div class="pay_shop-content-pay_type-content">
            <span class="iconfont ic-weixin"
                  :class="{active:payType=='WECHAT_PAY'}"
                  @click.stop="onPayType('WECHAT_PAY')"></span>
          <span class="iconfont ic-alipay"
                :class="{active:payType=='ALIPAY'}"
                @click.stop="onPayType('ALIPAY')"></span>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_shop-content-pay_amount">
        <div>
          <span>商品总额&#58;</span>
          <span>&yen;{{shopDrugSpecOrderDTO.amount.toFixed(2)}}</span>
        </div>
        <div>
          <span>医保扣除&#58;</span>
          <span>&yen;{{shopDrugSpecOrderDTO.medicaidAmount.toFixed(2)}}</span>
        </div>
        <div>
          <span>实际支付&#58;</span>
          <span>&yen;{{shopDrugSpecOrderDTO.payAmount.toFixed(2)}}</span>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_shop-content-medicaid">
        <div class="pay_shop-content-medicaid-header">
          医保信息
        </div>
        <div class="pay_shop-content-medicaid-content">
          <div class="pay_shop-content-medicaid-content-card"
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
          <div class="pay_shop-content-medicaid-content-no_card"
               v-else>
            <span class="iconfont ic-qianbao"></span>
            <a @click="linkToCardBind">去绑定医保卡</a>
          </div>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_shop-content-coupon">
        <div class="pay_shop-content-coupon_link">
          <div class="pay_shop-content-coupon_link_left">优惠券</div>
          <div class="pay_shop-content-coupon_link_right">
            <div v-if="isNotBlank(couponRecord)">
              满{{couponRecord.amount}}减{{couponRecord.minus}}
            </div>
            <div @click="show = true">
              <i class="iconfont ic-youjiantou"></i>
            </div>
          </div>
        </div>
        <div class="pay_shop-content-coupon_popup">
          <van-popup v-model="show" position="bottom">
            <div class="pay_shop-content-coupon_popup-container">
              <div class="pay_shop-content-coupon_popup-container-title text-l-30">
                使用优惠券
              </div>
              <div class="pay_shop-content-coupon_popup-container-list">
                <div class="pay_shop-content-coupon_popup-container-list-item"
                     v-for="(item,key) in coupons"
                     :key="key"
                     @click="couponRecord = item;show = false;payAmount -= item.amount">
                  <div class="text-l-28">
                    满{{item.amount}}减{{item.minus}}
                  </div>
                </div>
                <div v-if="coupons.length === 0" class="pay_shop-content-coupon_popup-container-list-none text-l-28">
                  没有可用优惠券
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
      <div class="dividing"></div>
    </div>
    <div class="pay_shop-footer">
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
        orderShopDrugSpecDTO: JSON.parse(this.$route.query.orderShopDrugSpecDTO),
        shopDrugSpecOrderDTO: {},
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
        if (JSON.stringify(this.receiveAddress) === '{}') {
          this.$http.get('addresses/default').then(res => {
            if (res.data) {
              this.setReceiveAddress(res.data);
            }
          }).catch(error => {
            this.exception(error);
          });
        }
        this.$http.post('orders/shop/get', this.orderShopDrugSpecDTO)
          .then(res => {
            this.shopDrugSpecOrderDTO = res.data;
            this.payAmount = res.data.payAmount;
            this.$http.get('couponRecords/order')
              .then(res2 => {
                this.coupons = res2.data.filter(e => res.data.payAmount >= e.amount);
              })
              .catch(err => {
                this.exception(err);
              });
          })
          .catch(err => {
            this.exception(err);
          });
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
        json.orderShopDrugSpecDTO = this.orderShopDrugSpecDTO;
        json.deliveryType = this.deliveryType;
        json.payType = this.payType;
        json.couponRecordId = this.couponRecord.id;
        this.$http.post('/orders/shop', json).then(res => {
          console.log(res.data);
          this.$router.replace({
            path: '/orders/pay?orderIds=' + res.data + '&deliveryType=' + this.deliveryType
          });
        }).catch(error => {
          this.exception(error);
        });
      },
      onDeliveryType(item) {
        this.deliveryType = item;
        this.$storage.set('deliveryType', item);
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

  .pay_shop {
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


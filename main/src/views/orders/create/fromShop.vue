<template>
  <new-layout class="pay_shop">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="pay_shop-content">
        <div class="pay_shop-content-delivery_type">
          <div class="pay_shop-content-delivery_type-content">
            <span :class="{active:deliveryType=='DELIVERY'}"
                  @click.stop="onDeliveryType('DELIVERY')"
                  v-if="shopDrugOrderDTO.distribution === true">
            药房配送
            </span>
            <span :class="{active:deliveryType=='SELF'}"
                  @click.stop="onDeliveryType('SELF')">上门自提</span>
          </div>
        </div>
        <div class="pay_shop-content-delivery"
             v-if="deliveryType === 'DELIVERY'"
             @click="linkToOrderAddress(orderShopDrugDTO.shopId)">
          <div class="pay_shop-content-delivery-no_address"
               v-if="address === undefined">
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
        <new-close-shop :shopInfo="shopDrugOrderDTO"></new-close-shop>

        <div class="pay_shop-content-pay_type">
          <div class="pay_shop-content-pay_type-content">
            <span :class="{active:isMedicarePay==true}"
                  v-if="shopDrugOrderDTO.rxId !== null && account.medicaidNumber !== null"
                  @click.stop="isMedicarePay = true">
            医保
            </span>
            <span :class="{active:isMedicarePay==false}"
                  @click.stop="isMedicarePay = false">自费</span>
          </div>
        </div>
        <div class="pay_shop-content-pay_amount">
          <div>
            <span>商品总额：</span>
            <span>&yen;{{toFixedTwo(shopDrugOrderDTO.amount)}}</span>
          </div>
          <div v-if="isMedicarePay">
            <span>医保扣除：</span>
            <span>&yen;{{toFixedTwo(shopDrugOrderDTO.medicaidAmount)}}</span>
          </div>
          <div>
            <span>实际支付：</span>
            <span v-if="isMedicarePay">&yen;{{toFixedTwo(shopDrugOrderDTO.payAmount)}}</span>
            <span v-else>&yen;{{toFixedTwo(shopDrugOrderDTO.amount)}}</span>
          </div>
        </div>
        <new-white-space/>
        <van-cell-group>
          <van-field
            v-model="accountRemark"
            label="备注"
            type="textarea"
            placeholder="请输入备注"
            rows="3"
          />
        </van-cell-group>
        <new-white-space/>
      </div>
    </template>
    <template slot="bottom">
      <new-submit-bar :price="payAmount" @submit="onOrder"/>
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
        couponRecord: '',
        coupons: [],
        show: false,
        payAmount: 0,
        loading: false,
        address: undefined,
        isMedicarePay: false,
        accountRemark: ''
      };
    },
    components: {},
    computed: {
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
    mounted() {
    },
    methods: {
      async initData() {
        this.payAmount = this.shopDrugOrderDTO.payAmount;
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
        this.$toast.loading({ duration: 0, forbidClick: true, message: '生成订单中...' });
        let order = await this.$http.post('/orders/shop', json);
        this.$toast.loading({ duration: 0, forbidClick: true, message: '生成支付链接中...' });
        let url = await this.$http.get(`/orders/${order.id}/pay`);
        if (url === '') {
          this.$toast.loading({ duration: 0, forbidClick: true, message: '支付中...' });
          await this.$http.post('http://172.16.11.138:8085/app/orders/qy/callback', {orderNo: order.number, insuranceNo: '000001', bankNo: '000000001'});
          this.$router.replace('/orders');
          return;
        }
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
</style>


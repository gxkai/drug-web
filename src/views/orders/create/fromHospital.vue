<template>
  <div class="pay_hospital">
    <new-header title="订单结算">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="pay_hospital-content">
      <new-close-hospital :hospitalInfo="hospitalInfo"></new-close-hospital>
      <div class="pay_hospital-content-delivery_type">
        <div class="pay_hospital-content-delivery_type-header">
          <div>
            <i class="iconfont ic-peisongfangshi"></i>
          </div>
          <div>配送方式</div>
        </div>
        <div class="pay_hospital-content-delivery_type-content">
          <span :class="{active:deliveryType=='SELF'}"
                @click.stop="onDeliveryType('SELF')">上门自提</span>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_hospital-content-pay_type">
        <div class="pay_hospital-content-pay_type-header">
          <div>
            <i class="iconfont ic-dingdanzhifufangshi"></i>
          </div>
          <div>支付方式</div>
        </div>
        <div class="pay_hospital-content-pay_type-content">
            <span class="iconfont ic-weixin"
                  :class="{active:payType=='WECHAT_PAY'}"
                  @click.stop="onPayType('WECHAT_PAY')"></span>
          <span class="iconfont ic-alipay"
                :class="{active:payType=='ALIPAY'}"
                @click.stop="onPayType('ALIPAY')"></span>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_hospital-content-pay_amount">
        <div>
          <span>商品总额：</span>
          <span>&yen;{{hospitalInfo.amount.toFixed(2)}}</span>
        </div>
        <div>
          <span>医保扣除：</span>
          <span>&yen;{{hospitalInfo.medicaidAmount.toFixed(2)}}</span>
        </div>
        <div>
          <span>实际支付：</span>
          <span>&yen;{{hospitalInfo.payAmount.toFixed(2)}}</span>
        </div>
      </div>
      <div class="dividing"></div>
      <div class="pay_hospital-content-medicaid">
        <div class="pay_hospital-content-medicaid-header">
          医保信息
        </div>
        <div class="pay_hospital-content-medicaid-content">
          <div class="pay_hospital-content-medicaid-content-card"
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
          <div class="pay_hospital-content-medicaid-content-no_card"
               v-else>
            <span class="iconfont ic-qianbao"></span>
            <a @click="linkToCardBind">去绑定医保卡</a>
          </div>
        </div>
      </div>
      <div class="dividing"></div>
    </div>
    <div class="pay_hospital-footer">
      <div>
        <span>实付金额&#58;<i>&yen;{{payAmount}}</i></span>
        <span @click.stop="onOrder()">提交订单</span>
      </div>
    </div>
  </div>


</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    name: 'createFromCart',
    data() {
      return {
        name: '订单结算',
        account: this.$store.getters.account,
        rxId: this.$route.query.rxId,
        deliveryType: 'SELF',
        payType: 'ALIPAY',
        hospitalInfo: [],
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
        if (this.isBlank(this.receiveAddress)) {
          this.$http.get('addresses/default').then(res => {
            if (res.data) {
              this.setReceiveAddress(res.data);
            }
          }).catch(error => {
            this.exception(error);
          });
        }
        this.$http.get('/orders/hospital?rxId=' + this.rxId)
          .then(res => {
            this.hospitalInfo = res.data;
            this.payAmount = res.data.payAmount;
          }).catch((error) => {
            this.exception(error);
          });
      },
      onOrder() {
        this.$router.replace({
          path: '/orders/takeDrug?rxId=' + this.rxId + '&hospitalName=' + this.hospitalInfo.hospital
        });
      },
      onDeliveryType(item) {
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

  .pay_hospital {
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

  .ic-weixin{
    color: green;
  }

  .ic-weixin.active{
    color: #72bd63!important;
  }
  .ic-alipay.active{
    color: #009fe8!important;
  }
  .pay_shop-content-pay_amount{
    padding: 0px 0px 0px 20px;
  }
  .ic-weixin{
    color: green;
  }

  .pay_shop-content-pay_type-content span{
    background: grey;
  }
</style>

<template>
  <new-layout
    class="order_view"
    center-color="white"
  >
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      slot="top"
    />
    <div slot="center">
      <div class="order_view-state"
           :style="stateStyle">
        <div class="order_view-state_name" v-text="transformOrderStateSec(order.state, order.refundState, this)">
        </div>
        <new-count-down :endTime="order.lastModifiedDate" durationMin='15'
                        class="order_view-state_time"
                        v-show="order.state === 'TO_CHECK' || order.state === 'TO_PAY'"/>
      </div>
      <div class="order_view-address"
           v-if="order.deliveryType === 'DELIVERY'">
        <div class="order_view-address-left">
          <i class="iconfont ic-address"></i>
        </div>
        <div class="order_view-address-right">
          <div class="order_view-address-right_consignee">
            收货人：{{order.consignee}} {{order.phone}}
          </div>
          <div class="order_view-address-right_address">
            收货地址：{{order.address}}
          </div>
        </div>
      </div>
      <new-order-view-item :order.sync="order"></new-order-view-item>
      <div class="order_view-amount">
        <div>
          <span>商品总价</span>
          <span>&yen;{{order.totalAmount||'0.0'}}</span>
        </div>
        <div>
          <span>医保扣除</span>
          <span>&yen;{{order.medicaidAmount||'0.0'}}</span>
        </div>
        <div>
          <span>优惠券扣除</span>
          <span>&yen;{{order.couponAmount||'0.0'}}</span>
        </div>
        <div>
          <span>需付款</span>
          <span class="text-red">&yen;{{order.payAmount||'0.0'}}</span>
        </div>
      </div>
      <div class="order_view-deal">
        <div class="order_view-deal-number">
          订单编号：{{order.number}}
        </div>
        <div class="order_view-deal-pay_number">
          支付流水号：{{order.payNumber||'无'}}
        </div>
        <div class="order_view-deal-created_date">
          创建时间：{{timeConvert(order.createdDate)}}
        </div>
      </div>
      <div class="order_view-buttons">
        <div class="order_view-button"
             @click="onCancel()"
             v-if="order.state == 'TO_PAY'">
          取消订单
        </div>
        <div class="order_view-button"
             @click="onPay()"
             v-if="order.state == 'TO_PAY'"
             :style="activeButton">
          我要付款
        </div>
        <div class="order_view-button"
             @click="onConfirm()"
             v-if="order.state == 'TO_RECEIVED'"
             :style="activeButton">
          确认收货
        </div>
        <div class="order_view-button"
             @click="onDelivery()"
             v-if="order.deliveryType == 'DELIVERY' && (order.state == 'TO_RECEIVED' ||order.state ==  'TO_APPRAISE' ||order.state ==  'COMPLETED' ||order.state ==  'REFUNDING')">
          查看配送
        </div>
        <div class="order_view-button"
             @click="onAppraise()"
             v-if="order.state == 'TO_APPRAISE'">
          我要评价
        </div>
        <div @click="linkToTakeDrug(order.id)"
             v-if="order.state == 'TO_RECEIVED' && order.type === 'HOSPITAL'">取药地址
        </div>
      </div>
      <!--<van-popup-->
        <!--v-model="popupVisible"-->
        <!--position="top"-->
      <!--&gt;-->
        <!--<img v-lazy="getQrCodeURL(order.id)" class="order_view-qr_code">-->
      <!--</van-popup>-->
    </div>
  </new-layout>
</template>

<style scoped type="text/less" lang="less">
  .order_view {
    width: 720px;
    &-state {
      position: relative;
      width: 100%;
      height: 200px;
      &_name {
        position: absolute;
        left: 150px;
        top: 50px;
        font-size: 30px;
        color: white;
        font-weight: 200;
      }
      &_time {
        position: absolute;
        left: 150px;
        top: 90px;
        font-size: 25px;
        color: white;
      }
    }
    &-address {
      display: flex;
      align-items: center;
      &-left {
        padding: 20px;
        .iconfont {
          color: black;
          font-size: 50px;
        }
      }
      &-right {
        width: 550px;
        & > div {
          padding: 2px 0;
          font-size: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-deal {
      padding: 20px;
      background-color: #f5f5f5;
      & > div {
        padding: 5px;
        font-size: 25px;
      }
    }
    &-amount {
      width: 100%;
      background-color: #f5f5f5;
      margin: 20px 0;
      & > div {
        display: flex;
        justify-content: space-between;
        padding: 5px 20px;
        font-size: 25px;
        & > span {
          font-size: 25px;
        }
      }
    }
    &-buttons {
      background-color: white;
      padding: 20px;
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    &-button {
      border: 1PX solid #BFBFBF;
      border-radius: 20PX;
      padding: 5px 20px;
      color: #555555;
      font-size: 25px;
      margin: 5px;
    }
    &-qr_code {
      width: 500px;
      height: 500px;
      margin: 0 110px;
    }
  }

</style>

<script>
  export default {
    data() {
      return {
        title: '订单详情',
        orderId: this.$route.query.orderId,
        popupVisible: false,
        order: {},
        activeButton: {
          color: '#00ADB3',
          borderColor: '#00ADB3'
        },
        stateStyle: '',
        deliverStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/toDeliver.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        },
        receiveStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/toReceive.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        },
        appraiseStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/toAppraise.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        },
        payStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/toPay.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        },
        refundingStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/refunding.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        },
        completeStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/complete.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        },
        checkStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/toCheck.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        },
        closeStyle: {
          backgroundImage: 'url(' + require('@/assets/image/orderView/close.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        }
      };
    },
    components: {},
    computed: {},
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      initData() {
        this.$axios.get('/orders/' + this.orderId)
          .then(res => {
            this.order = res.data;
            console.log(res.data);
            this.stateStyle = this.getStateStyle();
          })
          .catch(err => {
            this.exception(err);
          });
      },
      getStateStyle() {
        if (this.order.refundState === 'REFUNDING') {
          return this.refundingStyle;
        }
        switch (this.order.state) {
          case 'CLOSED':
            return this.closeStyle;
          case 'TO_CHECK':
            return this.checkStyle;
          case 'TO_PAY':
            return this.payStyle;
          case 'TO_APPRAISE':
            return this.appraiseStyle;
          case 'TO_RECEIVED':
            return this.receiveStyle;
          case 'TO_DELIVERY':
            return this.deliverStyle;
          case 'COMPLETED':
            return this.completeStyle;
        }
      },
      onCancel() {
        this.$axios.put('/orders/' + this.order.id + '/close').then(res => {
          this.order.state = 'CLOSED';
        }).catch(error => {
          this.exception(error);
        });
      },
      onPay() {
        this.$router.push({ path: '/orders/pay', query: { orderIds: this.order.id } });
      },
      onRefund() {
        this.$router.push({ path: '/orderRefunds/create', query: { orderId: this.order.id } });
      },
      onDelivery() {
        this.$router.push({ path: '/orders/delivery', query: { orderId: this.order.id } });
      },
      onAppraise() {
        this.$router.push({ path: '/drugAppraises/create', query: { orderId: this.order.id } });
      },
      onConfirm() {
        this.$axios.put('/orders/' + this.order.id + '/complete').then(res => {
          this.order.state = 'TO_APPRAISE';
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>



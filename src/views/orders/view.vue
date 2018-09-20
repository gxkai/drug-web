<template>
  <div class="order_view">
    <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <!--<div class="order_view-state">-->
      <!--<div class="order_view-state-left">-->
        <!--<div class="order_view-state-left_name"-->
             <!--v-text="transformOrderStateSec(order.state, order.refundState, this)"></div>-->
        <!--<new-count-down :endTime="timeConvert(order.createdDate)"-->
                        <!--class="order_view-state-left_time"></new-count-down>-->
      <!--</div>-->
    <!--</div>-->
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
      <span>&yen;{{order.totalAmount}}</span>
      </div>
      <div>
      <span>医保扣除</span>
      <span>&yen;{{order.medicaidAmount}}</span>
      </div>
      <div>
        <span>优惠券扣除</span>
        <span>&yen;{{order.couponAmount}}</span>
      </div>
      <div>
      <span>需付款</span>
      <span class="text-red">&yen;{{order.payAmount}}</span>
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
  </div>
</template>

<style scoped type="text/less" lang="less">
  .order_view {
    width: 720px;
    &-state {
      position: relative;
      background-color: #f5f5f5;
      height: 160px;
      &-left {
        position: absolute;
        left: 100px;
        top: 50px;
        &_name {
          font-size: 30px;
          color: #13C1FE;
          font-weight: 200;
        }
        &_time {
          font-size: 25px;
          color: #FF0000;
        }
      }
    }
    &-address {
      display: flex;
      align-items: center;
      &-left {
        padding: 20px;
        .iconfont {
          color: black;
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
      &>div {
        padding: 5px;
        font-size: 25px;
      }
    }
    &-amount {
      width: 100%;
      background-color: #f5f5f5;
      margin-bottom: 20px;
      &>div {
        display: flex;
        justify-content: space-between;
        padding: 5px 20px;
        font-size: 25px;
      }
    }
  }

</style>

<script>
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        title: '订单详情',
        orderId: this.$route.query.orderId,
        order: {},
        showRx: true,
        showNor: true
      };
    },
    components: {},
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      initData() {
        this.$http.get('/orders/' + this.orderId)
          .then(res => {
            this.order = res.data;
            console.log(res.data);
          })
          .catch(err => {
            this.exception(err);
          });
      },
      onCancel() {
        this.$http.put('/orders/' + this.order.id + '/close').then(res => {
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
      onRemind() {
        Toast('提醒发货成功!');
      },
      onConfirm() {
        this.$http.put('/orders/' + this.order.id + '/complete').then(res => {
          this.order.state = 'TO_APPRAISE';
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .qr_code {
    display: flex;
    justify-content: center;
    img {
      width: 400px;
      height: 400px;
    }
  }
</style>

<!--<style scoped>-->
<!--.order-state {-->
<!--width: 720px;-->
<!--height: 162px;-->
<!--background: rgba(19, 193, 254, 1);-->
<!--display: flex;-->
<!--}-->

<!--.order-state > div:nth-child(1) {-->
<!--width: calc(720px - 159px);-->
<!--height: 162px;-->
<!--}-->

<!--.order-state > div:nth-child(1) > div:nth-child(1) {-->
<!--margin-top: 48px;-->
<!--}-->

<!--.order-state > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) {-->
<!--font-size: 28px;-->
<!--color: rgba(245, 245, 245, 1);-->
<!--margin-left: 80px;-->
<!--}-->

<!--.order-state > div:nth-child(1) > div:nth-child(2) > span:nth-child(1) {-->
<!--font-size: 24px;-->
<!--color: rgba(245, 245, 245, 1);-->
<!--margin-left: 80px;-->
<!--}-->

<!--.order-state > div:nth-child(2) {-->
<!--width: 159px;-->
<!--height: 162px;-->
<!--}-->

<!--.order-state > div:nth-child(2) i {-->
<!--font-size: 100px;-->
<!--color: white;-->
<!--margin-top: 31px;-->
<!--}-->

<!--.order-address {-->
<!--width: 720px;-->
<!--height: 120px;-->
<!--background: white;-->
<!--display: flex;-->
<!--align-items: center;-->
<!--padding: 10px;-->
<!--}-->

<!--.order-address > div:nth-child(2) {-->
<!--margin-left: 20px;-->
<!--}-->

<!--.ic-weizhi {-->
<!--font-size: 40px;-->
<!--}-->

<!--/*.order-address > div:nth-child(2) {*/-->
<!--/*width: calc(720px - 60px);*/-->
<!--/*height: 120px;*/-->
<!--/*}*/-->

<!--/*.order-address > div:nth-child(2) > div:nth-child(1) {*/-->
<!--/*margin-top: 20px;*/-->
<!--/*}*/-->

<!--/*.order-address > div:nth-child(2) > div:nth-child(1) > span:nth-child(1) {*/-->
<!--/*font-size: 20px;*/-->
<!--/*font-family: HiraginoSansGB-W3;*/-->
<!--/*color: rgba(69, 69, 69, 1);*/-->
<!--/*}*/-->

<!--/*.order-address > div:nth-child(2) > div:nth-child(2) > span:nth-child(1) {*/-->
<!--/*font-size: 20px;*/-->
<!--/*font-family: HiraginoSansGB-W3;*/-->
<!--/*color: rgba(51, 51, 51, 1);*/-->
<!--/*}*/-->

<!--.order-price div {-->
<!--display: flex;-->
<!--justify-content: space-between;-->
<!--padding: 10px 14px;-->
<!--}-->

<!--.order-price > div:nth-child(1) > span {-->
<!--font-size: 25px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(153, 153, 153, 1);-->
<!--}-->

<!--.order-price > div:nth-child(2) > span {-->
<!--font-size: 25px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(153, 153, 153, 1);-->
<!--}-->

<!--.order-price > div:nth-child(3) > span {-->
<!--font-size: 25px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(51, 51, 51, 1);-->
<!--}-->

<!--.order-price > div:nth-child(4) > span:nth-child(1) {-->
<!--font-size: 25px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(51, 51, 51, 1);-->
<!--}-->

<!--.order-price > div:nth-child(4) > span:nth-child(2) {-->
<!--font-size: 25px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(255, 0, 0, 1);-->
<!--}-->

<!--.order-price > div:nth-child(5) > span:nth-child(1) {-->
<!--font-size: 25px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(51, 51, 51, 1);-->
<!--}-->

<!--.order-price > div:nth-child(5) > span:nth-child(2) {-->
<!--font-size: 25px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(255, 0, 0, 1);-->
<!--}-->

<!--.order-number {-->
<!--width: 720px;-->
<!--background: rgba(245, 245, 245, 1);-->
<!--font-size: 20px;-->
<!--font-family: HiraginoSansGB-W3;-->
<!--color: rgba(102, 102, 102, 1);-->
<!--margin-top: 10px;-->
<!--padding: 10px;-->
<!--}-->

<!--.order-number div {-->
<!--padding: 10px;-->
<!--font-size: 25px;-->
<!--}-->

<!--.order-buttons {-->
<!--display: flex;-->
<!--justify-content: flex-end;-->
<!--margin-top: 30px;-->
<!--padding-right: 20px;-->
<!--}-->

<!--.item-bottom-buttons button {-->
<!--appearance: none !important;-->
<!--width: 118px;-->
<!--height: 40px;-->
<!--background: white;-->
<!--border-radius: 20px;-->
<!--font-size: 20px;-->
<!--color: rgba(102, 102, 102, 1);-->
<!--outline: none;-->
<!--display: inline-block;-->
<!-- -webkit-appearance: none !important;-->
<!--border: none;-->
<!--border: 1PX solid #757575;-->
<!--}-->

<!--.item-bottom-button-active {-->
<!--color: rgb(19, 193, 254) !important;-->
<!--border: 1PX solid rgb(19, 193, 254) !important;-->
<!--}-->

<!--.ic-weizhi {-->
<!--font-size: 50px;-->
<!--}-->

<!--.div-icon i{line-height: 40px;line-height:162px;}-->
<!--.text-red{color: red;}-->
<!--.ic-address{font-size: 48px;}-->
<!--</style>-->



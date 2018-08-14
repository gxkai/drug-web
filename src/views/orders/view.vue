<template>
  <div id="OrderDetails">
    <new-header title="订单详情" bgColor="white" leftColor="#333333" color="#333333">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right">
        </i>
      </div>
    </new-header>
    <div class="order-state" v-if="order.state === 'TO_RECEIVED'">
      <div>
        <div>
          <span>等待买家付款</span>
        </div>
        <div>
          <span>
            <new-count-down :endTime="timeConvert(order.createdDate)"></new-count-down>
          </span>
        </div>
      </div>
      <div>
        <i class="iconfont ic-icon-test"></i>
      </div>
    </div>
    <div class="order-state" v-else-if="order.state === 'TO_APPRAISE'">
      <div>
        <div>
          <span>等待买家评价</span>
        </div>
      </div>
      <div>
        <i class="iconfont ic-daipingjia01"></i>
      </div>
    </div>
    <div class="order-state" v-else-if="order.state === 'TO_RECEIVED'">
      <div>
        <div>
          <span>等待买家收货</span>
        </div>
      </div>
      <div>
        <i class="iconfont ic-qianbao"></i>
      </div>
    </div>
    <div class="order-state" v-else-if="order.state === 'TO_DELIVERY'">
      <div>
        <div>
          <span>等待卖家配送</span>
        </div>
      </div>
      <div>
        <i class="iconfont ic-gerenzhongxindingdandaishouhuo"></i>
      </div>
    </div>
    <div class="order-state" v-else-if="order.state === 'COMPLETED'">
      <div>
        <div>
          <span>订单完成</span>
        </div>
      </div>
      <div>
        <i class="iconfont ic-kucun"></i>
      </div>
    </div>
    <div class="order-address" v-if="order.address">
      <div>
        <i class="iconfont ic-weizhi"></i>
      </div>
      <div>
        <div>
          <span>收货人：{{order.consignee}} {{order.phone}}</span>
        </div>
        <div>
          <span>收货地址：{{order.address}}</span>
        </div>
      </div>
    </div>
    <div class="order-item">
      <new-refund :order="order"></new-refund>
    </div>
    <div class="order-price">
      <div>
        <span>商品总价</span>
        <span>¥{{order.totalAmount}}</span>
      </div>
      <div>
        <span>医保扣除</span>
        <span>¥{{order.medicaidAmount||0}}</span>
      </div>
      <div>
        <span>需付款</span>
        <span>¥{{order.payAmount||0}}</span>
      </div>
    </div>
    <div class="order-number">
      <div>
        <span>订单编号：{{order.number}}</span>
      </div>
      <div>
        <span>支付宝交易号：{{order.payNumber||'无'}}</span>
      </div>
      <div>
        <span>创建时间：{{timeConvert(order.createdDate)}}</span>
      </div>
    </div>
    <div class="order-buttons">
      <div class="item-bottom-buttons">
        <button @click="onCancel()" v-if="order.state == 'TO_PAY'">取消订单</button>
        <button class="item-bottom-button-active" @click="onRefund()" v-if="order.state == 'TO_CHECK' || 'TO_DELIVERY' || 'TO_RECEIVED' || 'TO_APPRAISE' || 'COMPLETED'">申请退款</button>
        <button class="item-bottom-button-active" @click="onConfirm()" v-if="order.state == 'TO_RECEIVED'">确认收货</button>
        <button @click="onDelivery()"  v-if="order.deliveryType == 'DELIVERY' && (order.state == 'TO_RECEIVED' || 'TO_APPRAISE' || 'COMPLETED' || 'REFUNDING')">查看物流</button>
        <button @click="onAppraise()" v-if="order.state == 'TO_APPRAISE'">评价</button>
        <button @click="onDetail()">订单详情</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

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
    components: {
    },
    methods: {
      initData() {
        this.$http.get('/orders/' + this.orderId)
          .then(res => {
            this.order = res.data;
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
        this.$router.push({path: '/orders/pay', query: {orderIds: this.order.id}});
      },
      onRefund() {
        this.$router.push({path: '/orderRefunds/create', query: {orderId: this.order.id}});
      },
      onDelivery() {
        this.$router.push({path: '/orders/delivery', query: {orderId: this.order.id}});
      },
      onAppraise() {
        this.$router.push({path: '/drugAppraises/create', query: {orderId: this.order.id}});
      },
      onRemind() {
        MessageBox.alert('提醒发货成功！', '提示');
      },
      onConfirm() {
        this.$http.put('/orders/' + this.order.id + '/complete').then(res => {
          this.order.state = 'TO_APPRAISE';
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    created() {
      this.initData();
    }
  };
</script>

<style scoped>
  .order-state {
    width: 720px;
    height: 162px;
    background: rgba(19, 193, 254, 1);
    display: flex;
  }

  .order-state>div:nth-child(1) {
    width: calc(720px - 159px);
    height: 162px;
  }

  .order-state>div:nth-child(1)>div:nth-child(1) {
    margin-top: 48px;
  }

  .order-state>div:nth-child(1)>div:nth-child(1)>span:nth-child(1) {
    font-size:28px;
    font-family:HiraginoSansGB-W3;
    color:rgba(245,245,245,1);
    margin-left: 80px;
  }
  .order-state>div:nth-child(1)>div:nth-child(2)>span:nth-child(1) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(245,245,245,1);
    margin-left: 80px;
  }
  .order-state>div:nth-child(2) {
    width: 159px;
    height: 162px;
  }
  .order-state>div:nth-child(2) i {
    font-size: 100px;
    color: white;
    margin-top: 31px;
  }

  .order-address {
    width: 720px;
    height: 120px;
    background: white;
    display: flex;
  }

  .order-address>div:nth-child(1) {
    width: 60px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ic-weizhi {
    font-size: 40px;
  }

  .order-address>div:nth-child(2) {
    width: calc(720px - 60px);
    height: 120px;
  }

  .order-address>div:nth-child(2)>div:nth-child(1) {
    margin-top: 20px;
  }

  .order-address>div:nth-child(2)>div:nth-child(1)>span:nth-child(1) {
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(69,69,69,1);
  }
  .order-address>div:nth-child(2)>div:nth-child(2)>span:nth-child(1) {
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }


  .order-price div {
    display: flex;
    justify-content: space-between;
    padding: 0px 14px;
  }
  .order-price>div:nth-child(1)> span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
  }
  .order-price>div:nth-child(2)> span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
  }
  .order-price>div:nth-child(3)> span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .order-price>div:nth-child(4)> span:nth-child(1){
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .order-price>div:nth-child(4)> span:nth-child(2){
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,0,0,1);
  }
  .order-price>div:nth-child(5)> span:nth-child(1){
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .order-price>div:nth-child(5)> span:nth-child(2){
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,0,0,1);
  }

  .order-number {
    width:720px;
    height:180px;
    background:rgba(245,245,245,1);
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    padding: 29px 0px 32px 14px;
  }
  .order-number div{
    padding: 5px 0px;
  }

  .order-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    padding-right: 20px;
  }
  .item-bottom-buttons button {
    appearance:none!important;
    width: 118px;
    height: 40px;
    background: white;
    border-radius: 20px;
    font-size: 20px;
    color: rgba(102, 102, 102, 1);
    outline: none;
    display: inline-block;
    -webkit-appearance: none!important;
    border: none;
    border:1px solid #757575;
  }

  .item-bottom-button-active {
    color: rgb(19, 193, 254) !important;
    border:1px solid rgb(19, 193, 254)!important;
  }
</style>



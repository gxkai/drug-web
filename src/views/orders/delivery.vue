<template>
  <div class="container">
    <new-header title="配送详情">
      <div slot="left">
        <i @click="$router.push('/orders')" class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>

    <div class="delivery-schedule">
      <div>
        <div><img src="../../assets/image/delivery/ordersure.png"/></div>
        <div class="delivery-schedule-message text-#13C1FE">订单已确认</div>
      </div>

      <div>
        <div v-if="order.state== 'TO_RECEIVED' || order.state== 'TO_DELIVERY'||order.state== 'TO_APPRAISE' || order.state== 'COMPLETED'">
          <img src="../../assets/image/delivery/distribution.png"/>
          <div class="delivery-schedule-message text-#999999">配送中</div>
        </div>
        <div v-else>
          <img src="../../assets/image/delivery/distributioning.png"/>
          <div class="delivery-schedule-message text-#13C1FE">配送中</div>
        </div>
      </div>

      <div>
        <div v-if="order.state== 'TO_APPRAISE' || order.state== 'COMPLETED'">
          <img src="../../assets/image/delivery/received.png"/>
          <div class="delivery-schedule-message text-#999999">已收货</div>
        </div>
        <div v-else>
          <img src="../../assets/image/delivery/receiveing.png"/>
          <div class="delivery-schedule-message text-#13C1FE">已收货</div>
        </div>

      </div>
      <p></p>
    </div>

    <div class="delivery-drugstore of-hidden">
      <div class="delivery-drugstore-name">
       <span class="d-inline-block fl">
          <i class="iconfont ic-yaodian text-333333"></i>
          {{order.shopName}}
       </span>
       <span class="d-inline-block fr"><i class="iconfont ic-dianhua text-13C1FE fz-50"></i></span>
      </div>
    </div>

    <div class="delivery-footer">
      <ul>
        <li>
          <img src="../../assets/image/delivery/pay.png"/>
          <span>已支付</span>
          <span class="fz24">¥{{order.totalAmount||0.00}}</span>
        </li>
        <li>
          <img src="../../assets/image/delivery/address.png"/>
          <span>送货地址</span>
          <span>{{order.address||'无'}}</span>
        </li>
        <li>
          <img src="../../assets/image/delivery/number.png"/>
          <span>订单编号</span>
          <span>{{order.number||'无'}}</span>
        </li>
        <li>
          <img src="../../assets/image/delivery/telNumber.png"/>
          <span>送货人号码</span>
          <span class="text-13C1FE">{{order.courierPhone||'无'}}</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {Cell} from 'mint-ui';

  Vue.component(Cell.name, Cell);

  export default {
    name: 'delivery',
    data() {
      return {
        title: '配送详情',
        orderId: this.$route.query.orderId,
        order: {}
      };
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        this.$http.get('/orders/' + this.orderId)
          .then(res => {
            console.log(res);
            this.order = res.data;
            console.log(this.order);
          });
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

  .fz-50{
    font-size: 50px;
  }

  .container {
    width: 720px;
    height: 100vh;
  }

  .delivery-schedule {
    width: 680px;
    height: 155px;
    background: rgba(238, 238, 238, 1);
    margin: auto;
    margin-top: 12px;
    margin-bottom: 29px;
    padding: 15px 15px 15px 15px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: relative;

  }

  .delivery-schedule img {
    width: 90px;
    height: 90px;
  }

  .delivery-schedule-message {
    font-size: 24px;
  }

  .delivery-schedule p {
    width: 452px;
    height: 1px;
    border: 1px dashed #a6a6a6;
    position: absolute;
    display: block;
    margin-left: 100px;
    margin-top: 50px;
  }

  .delivery-drugstore {
    width: 680px;
    margin: auto;
/*    display: flex;
    justify-content: space-between;
    align-items: center;*/
    margin-bottom: 47px;
  }

  .delivery-drugstore-name {
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
    display: block;
  }

  .delivery-drug {
    width: 680px;
    margin: auto;
    margin-bottom: 39px;
    display: flex;
    align-items: center;
  }

  .delivery-drug-dot img {
    width: 14px;
    height: 14px;
    border-radius: 7px;
  }

  .delivery-drug-img img {
    width: 141px;
    height: 99px;
    margin-left: 22px;
    margin-right: 46px;
  }

  .delivery-drug-content span {
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
    display: flex;
    text-align: center;
  }

  .delivery-footer {
    width: 680px;
    margin: auto;
  }

  .delivery-footer img {
    width: 31px;
    height: 29px;
    display: block;
    margin-right: 5px;
  }

  .delivery-footer li {
    display: flex;
    margin-bottom: 45px;
  }

  .delivery-footer li :nth-child(2) {
    font-size: 24px;
    color: rgba(51, 51, 51, 1);

  }

  .delivery-footer li :nth-child(3) {
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    position: absolute;
    right: 20px;
  }
  .fz24{font-size: 24px;}
  .ic-yaodian{font-size: 40px;}
</style>

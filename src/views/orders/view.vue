<template>

  <div>
    <new-layout
      class="order_view"
    >
      <template slot="top">
        <van-nav-bar
          :title="$route.meta.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center">
        <div class="order_view-state">
          <div class="order_view-state_name" v-text="transformOrderState(order.state, order.refundState, this)+ '>'"
               @click="popup = !popup ">
          </div>
          <new-count-down :endTime="order.lastModifiedDate" durationMin='15'
                          class="order_view-state_time"
                          v-show="order.state === 'TO_CHECK' || order.state === 'TO_PAY'"/>
        </div>
        <div class="order_view-address"
             v-if="order.deliveryType === 'DELIVERY'">
          <div class="order_view-address-left">
            <van-icon name="location" size="3em"/>
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
        <new-white-space/>
        <new-order-view-item :order.sync="order"></new-order-view-item>

        <div class="order_view-money">
          <ul>
            <li>实付金额：<span class="order-view-money_red">¥{{order.payAmount||0}}</span></li>
            <li>商品金额：<span class="order-view-money_red">¥{{order.totalAmount||0}}</span></li>
            <li>医保扣除：<span class="order-view-money_red">¥{{order.medicaidAmount||0}}</span></li>
          </ul>
        </div>


        <div class="order_view-address" v-if="order.deliveryType === 'DELIVERY'">
          <ul>
            <li>配送信息</li>
            <li>收货地址：<span class="order_view-address-detail">{{order.consignee}}</span></li>
            <li>收货电话：<span class="order_view-address-detail">{{order.phone}}</span></li>
            <li>配送方式：<span class="order_view-address-detail">商家配送</span></li>
         </ul>
        </div>


        <div class="order_view-address">
          <ul>
            <li>订单信息</li>
            <li>订单编号：<span class="order_view-address-detail">{{order.number}}</span></li>
            <li>支付编号：<span class="order_view-address-detail"></span></li>
            <li>医保结算编号：<span class="order_view-address-detail"></span></li>
            <li>下单时间：<span class="order_view-address-detail">{{timeConvert(order.createdDate)}}</span></li>
            <li>备注信息: <span class="order_view-address-detail">{{order.remark}}</span></li>
          </ul>
        </div>
        <div class="order_view-buttons">
          <div class="order_view-button"
               @click="onCancel()"
               v-if="order.state == 'TO_PAY'">
            取消订单
          </div>
          <div class="order_view-button activeButton"
               @click="onPay()"
               v-if="order.state == 'TO_PAY'"
               >
            我要付款
          </div>
          <div class="order_view-button activeButton"
               @click="onConfirm()"
               v-if="order.state == 'TO_RECEIVED'"
               >
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
      </template>
    </new-layout>

    <van-popup
      v-model="popup"
      position="center">
      <van-steps :active="actives" direction="vertical" active-color="#FF0000">
        <van-step v-for="(time, index) in timeLine" :key="index">
          <!--<span class="step__title" :class="{step__title_order:index===0}">{{time.message}}</span>-->
          <!--<span class="fr step__title step__title_fr">{{timeConvert(time.createdDate)}}</span>-->
          <div class="step">
            <div>{{time.message}}</div>
            <div>{{timeConvert(time.createdDate)}}</div>
          </div>
        </van-step>
      </van-steps>


   </van-popup>
    <div class="closed"  v-model="popup">
      <van-icon name="guanbi2" size="3em" @click="popup=!popup" class="guanbi2"/>
    </div>
 </div>

</template>

<style scoped type="text/scss" lang="scss">
  .step {
    display: flex;
    justify-content: space-between;
    *{
      font-size: 25px;
    }
  }
  .activeButton {
    color: $themeColor!important;
    border-color: $themeColor!important;
  }
  [class*=van-hairline]::after{
    border:none!important;
  }
  .closed{
    text-align: center;
  }
  .guanbi2{
    position: absolute;
    color: white;
    z-index: 99999;
    top:1100px;
    text-align: center;
    margin: auto;
  }
  .van-step__circle-container  .van-icon{
    font-size: 35px!important;
  }
  .van-step--vertical.van-step--process .van-icon-checked{
    font-size: 26px!important;
    margin-right: 4px;
  }
  .van-steps {
    width: 616px;
    height: 704px;
    font-size: 24px;
    padding: 58px;
  }

  .van-hairline {
    height: 103px;
  }

  .fr {
    float: right
  }

  .order_close {
    text-align: center;
    padding-bottom: 20px;
  }

  .order_view {

    &-state {
      position: relative;
      width: 100%;
      height:120px;
      background: $themeColor;
      font-weight: bold;
      font-size: 35px;
      &_name {
        position: absolute;
        left: 53px;
        top: 35px;
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
      padding: 20px 0;
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
    &-money{
      background: white;
      padding-top: 20px;
      border-top: 10px solid #f3f3f3;
      ul{
        li{
          font-size: 24px;
          text-indent: 22px;
          height: 35px;
          line-height: 35px;
          span{
            font-size: 24px;
            color: $themeColor;
          }
        }
      }
    }
    &-money_red{
      color:$themeColor;
    }
    &-address{
      background: white;
      text-indent: 20px;
      ul{
        width: 720px;
        border-top:10px solid #f3f3f3;
        li{
          font-size: 24px;
          height: 35px;
          line-height: 35px;
          color: #666666;
         }
        li:first-child{
          height: 55px;
          line-height: 55px;
          font-weight: bold;
          color: #333333;
        }
      }
      &-detail{
        float: right;
        font-size: 24px;
        margin-right: 14px;
        color: #666666;
      }
    }
  }


  .van-step__title{
    font-size:50px!important;
  }
  .van-steps .van-icon{
    font-size: 35px!important;
  }

</style>

<script>
  export default {
    data() {
      return {
        actives: 0,
        popup: false,
        title: '订单详情',
        orderId: this.$route.params.orderId,
        popupVisible: false,
        order: {},
        activeButton: {
          color: '#00ADB3',
          borderColor: '#00ADB3'
        },
        timeLine: {},
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
      async initData() {
        this.order = await this.$http.get(`/orders/${this.orderId}`);
        console.log(this.order);
        this.timeLine = await this.$http.get(`/orders/${this.orderId}/logs`);
        console.log(this.timeLine);
        this.stateStyle = this.getStateStyle();
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
      async onCancel() {
        await this.$http.put(`/orders/${this.order.id}/close`);
        this.order.state = 'CLOSED';
      },
      async onPay() {
        if (this._.isEmpty(this.order.payUrl)) {
          this.order.payUrl = await this.$http.get(`/orders/${this.order.id}/pay`);
        }
        window.location.href = this.order.payUrl;
      },
      onRefund() {
        this.$router.push({ name: '/orderRefunds/create', params: { orderId: this.order.id } });
      },
      onDelivery() {
        this.$router.push({ name: '/orders/delivery', params: { orderId: this.order.id } });
      },
      onAppraise() {
        this.$router.push({ name: '/drugAppraises/create', params: { orderId: this.order.id } });
      },
      async onConfirm() {
        await this.$http.put(`/orders/${this.order.id}/complete`);
        this.order.state = 'TO_APPRAISE';
      }
    }
  };
</script>



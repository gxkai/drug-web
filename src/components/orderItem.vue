<template>
  <div class="order_item">
    <div class="order_item-title">
      <div class="order_item-title-left"
           @click="onShop()">
        <div>
        <i class="iconfont ic-yaodian"></i>
        </div>
        <div class="order_item-title-left_name" v-text="order.shopName"></div>
      </div>
      <div class="order_item-title-right"
           v-text="transformOrderStateSec(order.state, order.refundState, this)">
      </div>
    </div>
    <div class="order_item-content">
      <div class="order_item-content-title"
      v-if="isRx(order.rxId)">
        <div class="order_item-content-title-left">
          <div>
          <i class="iconfont ic-chufangdanluru"></i>
          </div>
          <div class="order_item-content-title-left_name">处方单</div>
        </div>
        <div class="order_item-content-title-right"
             @click="onRx()">查看处方&gt;</div>
      </div>
      <div class="order_item-content-info"
           v-for="item in order.list">
        <div class="order_item-content-info-left">
          <div class="rx_mark" v-if="!item.otc">处</div>
          <img :src="getImgURL(item.fileId,'LARGE_LOGO')">
        </div>
        <div class="order_item-content-info-right">
          <div>
            <div class="order_item-content-info-right_name"
                 v-text="item.name"></div>
            <div class="order_item-content-info-right_spec"
                 v-text="item.spec"></div>
          </div>
          <div>
            <div class="order_item-content-info-right_price">
                 &yen;{{item.price}}</div>
            <div class="order_item-content-info-right_quantity">
              x{{item.quantity}}</div>
          </div>
        </div>
      </div>
      <div class="order_item-content-sum">
        共计{{quantity}}件商品 合计{{toFixedTwo(order.amount)}}
      </div>
      <div class="order_item-content-buttons">
        <div class="order_item-content-button"
             @click="onCancel()"
             v-if="order.state == 'TO_PAY'">
          取消订单
        </div>
        <div class="order_item-content-button"
             @click="onPay()"
             v-if="order.state == 'TO_PAY'"
             :style="activeButton">
          我要付款
        </div>
        <div class="order_item-content-button"
             @click="onRefund()"
             v-if="(order.state == 'TO_CHECK' || order.state == 'TO_DELIVERY' || order.state == 'TO_RECEIVED' || order.state =='TO_APPRAISE' ||order.state == 'COMPLETED')
                    && refundVerification(order.createdDate)"
             :style="activeButton">
          申请退款
        </div>
        <div class="order_item-content-button order_item-content-button-receiveType"
        v-if="order.state == 'TO_RECEIVED'"
        :style="activeButton"
        @click="showData = !showData">
          收货方式
          <div class="order_item-content-button-receiveType-list"
          v-show="showData">
            <div class="order_item-content-button-receiveType-list-item"
                 @click="linkToQRCode">
              扫码确认
            </div>
            <div class="order_item-content-button-receiveType-list-item"
                 @click="popupVisible = true"
                 v-if="order.deliveryType == 'SELF'">
              收货二维码
            </div>
            <div class="order_item-content-button-receiveType-list-item"
                  v-if="order.deliveryType == 'DELIVERY'"
                 @click="onConfirm()">
              手动确认
            </div>
          </div>
        </div>
        <div class="order_item-content-button"
          @click="onDelivery()"
        v-if="order.deliveryType == 'DELIVERY' && (order.state == 'TO_RECEIVED' ||order.state ==  'TO_APPRAISE' ||order.state ==  'COMPLETED' ||order.state ==  'REFUNDING')">
        查看配送
        </div>
        <div class="order_item-content-button"
             @click="onAppraise()"
             v-if="order.state == 'TO_APPRAISE'">
          我要评价
        </div>
        <div class="order_item-content-button"
             @click="onDetail()">
          订单详情
        </div>
        <div @click="linkToTakeDrug(order.id)"
             v-if="order.state == 'TO_RECEIVED' && order.type === 'HOSPITAL'">取药地址</div>

      </div>
    </div>
    <mt-popup
    v-model="popupVisible"
    position="center"
    popup-transition="popup-fade">
    <img :src="getQrCodeURL(order.id)" class="order_item-qr_code">
    </mt-popup>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .order_item {
    background-color: white;
    margin-top: 20px;
    .iconfont {
      font-size: 50px;
    }
    &-title {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      &-left {
        display: flex;
        align-items: center;
        &_name {
          font-size: 30px;
        }
      }
      &-right {
        font-size: 30px;
        color: red;
      }
    }
    &-content {
      background-color: #f5f5f5;
      &-title {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        &-left {
          display: flex;
          align-items: center;
          &_name {
            font-size: 30px;
            color: #13C1FE;
          }
        }
        &-right {
          font-size: 30px;
          color: #13C1FE;
        }
      }
      &-info {
        display: flex;
        &-left {
          position: relative;
          padding: 20px;
          img {
            width: 200px;
            height: 200px;
          }
        }
        &-right {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &>div {
            width: 450px;
            &:nth-child(2) {
              display: flex;
              justify-content: space-between;
            }
          }
          &_name {
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
          &_spec {
            font-size: 25px;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
          &_price {
            color: #FF0000;
            font-size: 30px;
          }
          &_quantity {
            color: #999999;
            font-size: 30px;
          }
        }
      }
      &-sum {
        background-color: white;
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: flex-end;
        font-size: 30px;
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
        &-receiveType {
          padding-right: 30px;
          position: relative;
          &:after {
            position: absolute;
            top: 50%;
            right: 5px;
            transform: translateY(-50%);
            content: '';
            width: 0;
            border-top: 10px solid #00ADB3;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            height: 0;
          }
          &-list {
            position: absolute;
            top: 50px;
            right: 0;
            z-index: 9999;
            background: white;
            &-item {
              border: 1PX solid #00ADB3;
              border-radius: 20PX;
              width:150px;
              height: 50px;
              text-align: center;
              line-height: 50px;
              margin: 5px;
              font-size: 25px;
            }
          }
        }
      }
    }
    &-qr_code {
      width: 500px;
      height: 500px;
    }
  }
</style>

<script>
  import { Toast } from 'mint-ui';

  export default {
    name: 'order',
    props: ['order'],
    data() {
      return {
        popupVisible: false,
        activeButton: {
          color: '#00ADB3',
          borderColor: '#00ADB3'
        },
        showData: false
      };
    },
    created() {
      console.log(this.order);
    },
    computed: {
      quantity() {
        let quantity = 0;
        this.order.list.forEach(e => {
          quantity += e.quantity;
        });
        return quantity;
      }
    },
    methods: {
      emitOrder() {
        this.$emit('update:order', this.order);
      },
      onCancel() {
        this.$http.put('/orders/' + this.order.id + '/close').then(res => {
          this.order.state = 'CLOSED';
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      },
      onDrug(item) {
        this.$router.push({ path: '/shopDrugSpecs', query: { shopDrugSpecId: item.shopDrugSpecId } });
      },
      onRx() {
        this.$router.push({ path: '/rxs/view', query: { rxId: this.order.rxId } });
      },
      onShop() {
        switch (this.order.type) {
          case 'HOSPITAL':
            this.$router.push({ path: '/hospital/view', query: { shopId: this.order.shopId } });
            break;
          default:
            this.$router.push({ path: '/shops/view', query: { shopId: this.order.shopId } });
        }
      },
      onDetail() {
        this.$router.push({ path: '/orders/view', query: { orderId: this.order.id } });
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
          if (this.order.type === 'HOSPITAL') {
            this.order.state = 'COMPLETED';
          } else {
            this.order.state = 'TO_APPRAISE';
          }
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>

<!--<style scoped>-->

  <!--/*滑块样式*/-->
  <!--.slide-content {-->
    <!--width: 720px;-->
    <!--height: 215px;-->
    <!--background: rgba(246, 246, 246, 1);-->
    <!--display: flex;-->
    <!--margin-bottom: 20px;-->
    <!--padding-left: 40px;-->
    <!--padding-bottom: 20px;-->
  <!--}-->

  <!--.slide-content .image {-->
    <!--width: 200px;-->
    <!--background: rgba(255, 255, 255, 1);-->
    <!--box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);-->
    <!--align-self: center;-->
    <!--position: relative;-->
  <!--}-->

  <!--.slide-content .image img {-->
    <!--width: 100%;-->
  <!--}-->

  <!--.chu {-->
    <!--position: absolute;-->
    <!--width: 42px;-->
    <!--height: 24px;-->
    <!--background: rgba(43, 178, 146, 1);-->
    <!--font-size: 18px;-->
    <!--font-family: HiraginoSansGB-W3;-->
    <!--color: rgba(255, 255, 255, 1);-->
    <!--text-align: center;-->
    <!--line-height: 20px;-->
    <!--border-radius: 21px/12px;-->
  <!--}-->

  <!--.feichu {-->
    <!--position: absolute;-->
    <!--width: 60px;-->
    <!--height: 30px;-->
    <!--background: rgba(191, 191, 191, 1);-->
    <!--font-size: 16px;-->
    <!--font-family: HiraginoSansGB-W3;-->
    <!--color: rgba(102, 102, 102, 1);-->
    <!--text-align: center;-->
    <!--line-height: 30px;-->
    <!--border-radius: 30px/15px;-->
  <!--}-->

  <!--.slide-content .text {-->
    <!--padding-left: 20px;-->
  <!--}-->

  <!--.slide-content .text .top {-->
    <!--height: 105px;-->
    <!--width: 460px;-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--justify-content: center;-->
  <!--}-->

  <!--.slide-content .text .top .name {-->
    <!--font-size: 30px;-->
    <!--font-family: HiraginoSansGB-W3;-->
    <!--color: rgba(51, 51, 51, 1);-->
  <!--}-->

  <!--.slide-content .text .top .spec {-->
    <!--font-size: 30px;-->
    <!--font-family: HiraginoSansGB-W3;-->
    <!--color: rgba(153, 153, 153, 1);-->
  <!--}-->

  <!--.slide-content .text .bottom {-->
    <!--height: 110px;-->
    <!--width: 460px;-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--justify-content: space-between;-->
  <!--}-->

  <!--.slide-content .text .bottom .price {-->
    <!--font-size: 30px;-->
    <!--font-family: HiraginoSansGB-W3;-->
    <!--color: rgba(255, 0, 0, 1);-->
    <!--align-self: center;-->
  <!--}-->

  <!--.slide-content .text .bottom .quantity {-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--justify-content: space-around;-->
    <!--padding-right: 10px;-->
  <!--}-->

  <!--.slide-content .text .bottom .quantity div:nth-child(1) {-->
    <!--align-self: flex-end;-->
    <!--font-size: 30px;-->
    <!--font-family: HiraginoSansGB-W3;-->
    <!--color: rgba(153, 153, 153, 1);-->
  <!--}-->

  <!--.item-bottom {-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--align-items: flex-end;-->
    <!--width: 720px;-->
    <!--background: rgba(255, 255, 255, 1);-->
    <!--justify-content: space-around;-->
  <!--}-->

  <!--.item-bottom-price {-->
    <!--display: flex;-->
    <!--justify-content: flex-end;-->
    <!--margin-bottom: 10px;-->
  <!--}-->

  <!--.item-bottom-price > span:nth-child(1) {-->
    <!--font-size: 30px;-->
    <!--font-family: HiraginoSansGB-W3;-->
    <!--color: rgba(51, 51, 51, 1);-->
    <!--margin-right: 20px;-->
  <!--}-->

  <!--.item-bottom-buttons {-->
    <!--width: 720px;-->
    <!--display: flex;-->
    <!--justify-content: flex-end;-->
    <!--flex-wrap: wrap;-->
  <!--}-->

  <!--.item-bottom-buttons >div {-->
    <!--background: white;-->
    <!--border-radius: 20px;-->
    <!--font-size: 25px;-->
    <!--color: rgba(102, 102, 102, 1);-->
    <!--border: 1px solid #757575;-->
    <!--margin: 10px;-->
    <!--padding: 5px 15px;-->
  <!--}-->


  <!--.item-bottom-button-active {-->
    <!--color: rgb(19, 193, 254) !important;-->
    <!--border: 1px solid rgb(19, 193, 254) !important;-->
  <!--}-->

  <!--.item1 {-->
    <!--width: 720px;-->
  <!--}-->

  <!--.ic-yaodian {-->
    <!--font-size: 36px;-->
  <!--}-->

  <!--.item1 {-->
    <!--border-bottom: 6px solid #F6F6F6;-->
  <!--}-->
<!--</style>-->

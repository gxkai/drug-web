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
             v-if="order.state == 'TO_CHECK' || order.state == 'TO_DELIVERY' || order.state == 'TO_RECEIVED' || order.state =='TO_APPRAISE' ||order.state == 'COMPLETED'"
             :style="activeButton">
          申请退款
        </div>
        <div class="order_item-content-button"
             @click="onConfirm()"
             v-if="order.state == 'TO_RECEIVED'"
             :style="activeButton">
          确认收货
        </div>
        <div class="order_item-content-button"
             @click="popupVisible = true"
             v-if="order.deliveryType == 'SELF' && (order.state == 'TO_RECEIVED')">
          收货二维码
        </div>
        <div class="order_item-content-button"
             v-if="order.deliveryType == 'DELIVERY' && (order.state == 'TO_RECEIVED')"
             @click="linkToQRCode">
          收货扫码
        </div>
        <div @click="onDelivery()"
        v-if="order.deliveryType == 'DELIVERY' && (order.state == 'TO_RECEIVED' ||order.state ==  'TO_APPRAISE' ||order.state ==  'COMPLETED' ||order.state ==  'REFUNDING')">
        查看配送
        </div>
        <div class="order_item-content-button"
             @click="onAppraise()"
             v-if="order.state == 'TO_APPRAISE'">
          我要评价
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
        }
      };
    },
    created() {
      console.log(this.order);
    },
    computed: {
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
        this.$router.push({ path: '/shops/view', query: { shopId: this.order.shopId } });
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

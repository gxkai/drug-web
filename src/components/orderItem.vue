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
      <!--<div class="order_item-content-title"-->
      <!--v-if="order.rxId ">-->
        <!--<div class="order_item-content-title-left">-->
          <!--<div>-->
          <!--<i class="iconfont ic-chufangdanluru"></i>-->
          <!--</div>-->
          <!--<div class="order_item-content-title-left_name">处方单</div>-->
        <!--</div>-->
        <!--<div class="order_item-content-title-right"-->
             <!--@click="onRx()">查看处方&gt;</div>-->
      <!--</div>-->
      <div class="order_item-content-info"
           v-for="item in order.list" @click="onDetail()">
        <div class="order_item-content-info-left">
          <div class="rx_mark" v-if="!item.otc">处</div>
          <img v-lazy="getImgURL(item.fileId,'LARGE_LOGO')">
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
        <!--<div class="order_item-content-button"-->
        <!--v-if="order.state == 'TO_RECEIVED'"-->
        <!--:style="activeButton"-->
        <!--@click="onConfirm()"-->
        <!--&gt;-->
          <!--确认收货-->
        <!--</div>-->
        <div class=""
             v-if="order.state == 'TO_RECEIVED'"
             :style="activeButton">

            <div class="order_item-content-button-receiveType-list-item"
                 @click="$emit('onQrcode', order)">
              扫码收货
            </div>
            <div class="order_item-content-button-receiveType-list-item"
                 @click="onConfirm()">
              确认收货
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
      <!--  <div class="order_item-content-button"
             @click="onDetail()">
          订单详情
        </div>-->
        <div @click="linkToTakeDrug(order.id)"
             v-if="order.state == 'TO_RECEIVED' && order.type === 'HOSPITAL'">取药地址</div>

      </div>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .order_item {
    margin-top: 20px;
    .iconfont {
      font-size: 50px;
    }
    &-title {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      background-color: white;
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
      &-title {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        background-color: white;
        &-left {
          display: flex;
          align-items: center;
          &_name {
            font-size: 30px;
            color: #F60000;
          }
        }
        &-right {
          font-size: 30px;
          color: #F60000;
        }
      }
      &-info {
        display: flex;
        background-color: white;
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
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>

<script>
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
        this.$axios.put('/orders/' + this.order.id + '/close').then(res => {
          this.order.state = 'CLOSED';
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      },
      onDrug(item) {
        this.$router.push({ path: '/shopDrugSpecs', query: { shopDrugId: item.shopDrugId } });
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
        // this.$router.push({ path: '/orders/pay', query: { orderIds: this.order.id } });
        this.$toast('待开发');
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

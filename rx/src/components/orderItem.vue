<template>
  <div class="order_item">
    <div class="order_item-title">
      <div class="order_item-title-left">
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
      <div class="order_item-content-title">
        <div class="order_item-content-title-left">
          <div>
          <i class="iconfont ic-chufangdanluru"></i>
          </div>
          <div class="order_item-content-title-left_name">处方单</div>
        </div>
      </div>
      <div class="order_item-content-info"
           v-for="item in order.list">
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
             @click="onConfirm()"
             v-if="order.state == 'TO_PAY'"
             :style="activeButton">
          确认收货
        </div>
        <div class="order_item-content-button"
        v-if="order.state == 'TO_RECEIVED'"
        :style="activeButton"
        @click="onConfirm()"
        >
          确认收货
        </div>
        <div class="order_item-content-button"
             @click="onDetail()">
          订单详情
        </div>
      </div>
    </div>
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
      onDetail() {
        this.$router.push({ path: '/orders/view', query: { orderId: this.order.id } });
      },
      onPay() {
      },
      async onConfirm() {
        await this.$http.put('/orders/' + this.order.id + '/complete');
        this.order.state = 'COMPLETED';
        this.emitOrder();
      }
    }
  };
</script>

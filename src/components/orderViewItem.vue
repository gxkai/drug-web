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
           <!--v-if="isRx(order.rxId)">-->
        <!--<div class="order_item-content-title-left">-->
          <!--<div>-->
            <!--<i class="iconfont ic-chufangdanluru"></i>-->
          <!--</div>-->
          <!--<div class="order_item-content-title-left_name">处方单</div>-->
        <!--</div>-->
        <!--<div class="order_item-content-title-right"-->
             <!--@click="onRx()">查看处方&gt;-->
        <!--</div>-->
      <!--</div>-->
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
              &yen;{{item.price}}
            </div>
            <div class="order_item-content-info-right_quantity">
              x{{item.quantity}}
            </div>
          </div>
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
          & > div {
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
    computed: {},
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
        this.$toast('提醒发货成功!');
      },
      onConfirm() {
        this.$axios.put('/orders/' + this.order.id + '/complete').then(res => {
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

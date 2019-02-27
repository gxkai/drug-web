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
      <!--<div class="order_item-content-header">-->
        <!--<span class="order_item-content-header-left"><i class="iconfont ic-chufangdanluru"></i>处方单</span>-->
        <!--<span class="order_item-content-header-right">查看处方></span>-->
      <!--</div>-->
      <div class="order_item-content-info"
           v-for="item in order.list">

        <div class="order_item-content-info-left">
          <div class="rx_mark" v-if="!item.otc" >处</div>
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
            <div class=" order_item-content-info-right_quantity">
             共{{item.quantity}}件
            </div>
            <div class="order_item-content-info-right_price">
              &yen;{{item.price}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .rx_mark{
    width:35px;
    height: 21px;
    border-radius: 17.5px/10.5px;
    text-align: center;
    line-height: 21px;
    padding: 0px;
    margin-left: 48px;
  }
  .order_item {
    background-color: white;
    .iconfont {
      font-size: 50px;
    }
    &-content-header{
      width: 720px;
      font-size: 24px;
      height: 70px;
      margin-top: 7px;
      &-left{
        float: left;
        font-size: 24px;
        line-height: 50px;
        color: $themeColor;
        .iconfont{
          vertical-align: middle!important;
          color: #000000;
          margin-left: 24px;
        }
      }
      &-right{
        float: right;
        font-size: 20px;
        color: $themeColor;
        margin-right: 16px;
        line-height: 50px;
      }
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
        color: $themeColor;
      }
    }
    &-content {
      background-color: #ffffff;
      border-top: 1px solid #f5f5f5;
      &-title {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        &-left {
          display: flex;
          align-items: center;
          &_name {
            font-size: 30px;
            color: $themeColor;
          }
        }
        &-right {
          font-size: 30px;
          color: $themeColor;
        }
      }
      &-info {
        display: flex;
        &-left {
          position: relative;
          padding: 5px;
          img {
            width: 200px;
            height: 200px;
            margin-left: 48px;
          }
        }
        &-right {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          & > div {
            width: 450px;
            margin-bottom: 50px;
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
            color: $themeColor;
            font-size: 30px;
          }
          &_quantity {
            color: #999999;
            font-size: 25px;
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
        this.$router.push({ name: '/shopDrugs', params: { shopDrugId: item.shopDrugId } });
      },
      onRx() {
        this.$router.push({ name: '/rxs/view', params: { rxId: this.order.rxId } });
      },
      onShop() {
        switch (this.order.type) {
          case 'HOSPITAL':
            this.$router.push({ name: '/hospital/view', params: { shopId: this.order.shopId } });
            break;
          default:
            this.$router.push({ name: '/shops/view', params: { shopId: this.order.shopId } });
        }
      },
      onDetail() {
        this.$router.push({ name: '/orders/view', params: { orderId: this.order.id } });
      },
      async onPay() {
        window.location.href = this.order.payUrl === null ? await this.$http.get(`/orders/${this.order.id}/pay`) : this.order.payUrl;
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

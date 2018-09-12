<template>
  <div class="pay_order_item">
    <div class="pay_order_item-title">
      <div class="pay_order_item-title_left">
        <div>
          <i class="iconfont ic-yaodian"></i>
        </div>
        <div>
          {{item.shopName}}
        </div>
      </div>
      <div class="pay_order_item-title_right"
      v-if="isRx(item.rxId)"
      @click="linkToRxView(item.rxId)">
        <div>查看处方</div>
        <div>
          <i class="iconfont ic-youjiantou"></i>
        </div>
      </div>
    </div>
    <div class="pay_order_item-content">
      <div class="pay_order_item-content_item">
        <div>订单编号&#58;</div>
        <div>{{item.number}}</div>
      </div>
      <div class="pay_order_item-content_item">
        <div>商品数量&#58;</div>
        <div>{{item.quantity}}</div>
      </div>
      <div class="pay_order_item-content_item">
        <div>实际支付&#58;</div>
        <div>&yen;{{item.payAmount||'0.00'}}</div>
      </div>
    </div>
    <div class="pay_order_item-footer">
      <div class="pay_order_item-footer_pay"
           @click.stop="$emit('onPay')">
        付款
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newPayList',
    props: ['item'],
    methods: {
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .pay_order_item {
    background-color: white;
    &-title {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1PX solid #E5E5E5;
      div {
        font-size: 30px;
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
      i{
        font-size: 50px;
      }
      &>div {
        display: flex;
        align-items: center;
      }
      &_right {
        color: #ef4f4f;
      }
    }
    &-content {
      &_item {
        padding: 20px 80px;
        display: flex;
        align-items: center;
        &>div {
          font-size: 28px;
          &:nth-child(1) {
            width: 160px;
          }
        }
        &:not(:last-child) {
          &>div:nth-child(2) {
            color: #1AB6FD;
          }
        }
        &:last-child {
          &>div:nth-child(2) {
            color: red;
          }
        }
      }
    }
    &-footer {
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px 10px 0 ;
      &_pay {
        border: 1PX solid #cccccc;
        background-color: #1AB6FD;
        padding: 5px 30px;
        color: white;
        font-size: 25px;
        font-weight: 100;
      }
    }
  }
</style>

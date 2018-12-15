<template>
  <div class="order_tab">
    <div :class="{active:state == '/orders'}" @click.stop="$emit('update:state','')">
      <p class="text-l-30">全部</p>
      <div class="order_tab-bar" v-show="state === ''"></div>
    </div>
    <div :class="{active:state == '/orders/toPay'}" @click.stop="$emit('update:state','TO_PAY')">
      <p class="text-l-30">待付款</p>
      <div class="order_tab-bar" v-show="state === 'TO_PAY'"></div>
    </div>
    <div :class="{active:state == '/orders/toDeliver'}" @click.stop="$emit('update:state','TO_DELIVERY')">
      <p class="text-l-30">待发货</p>
      <div class="order_tab-bar" v-show="state === 'TO_DELIVERY'"></div>
    </div>
    <div :class="{active:state == '/orders/toReceive'}" @click.stop="$emit('update:state','TO_RECEIVED')">
      <p class="text-l-30">待收货</p>
      <div class="order_tab-bar" v-show="state === 'TO_RECEIVED'"></div>
    </div>
    <div :class="{active:state == '/orders/toAppraise'}" @click.stop="$emit('update:state','TO_APPRAISE')">
      <p class="text-l-30">待评价</p>
      <div class="order_tab-bar" v-show="state === 'TO_APPRAISE'"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderTab',
    props: ['state']
  };
</script>

<style scoped type="text/scss" lang="scss">
  .order_tab {
    display: flex;
    justify-content: space-around;
    height: 100px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 88px;
    background-color: white;
    &>div {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
     }
    &-bar {
      width: 66px;
      height: 6px;
      background: rgba(19, 193, 254, 1);
    }
  }
</style>

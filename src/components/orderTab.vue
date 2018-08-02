<template>
  <div class="main">
    <div :class="{active:urlRouter == '/orders'}" @click.stop="$router.push('/orders')">
      <p>全部</p>
      <div class="bar" v-show="urlRouter === '/orders'"></div>
    </div>
    <div :class="{active:urlRouter == '/orders/toPay'}" @click.stop="$router.push('/orders/toPay')">
      <p>待付款</p>
      <div class="bar" v-show="urlRouter === '/orders/toPay'"></div>
    </div>
    <div :class="{active:urlRouter == '/orders/toDeliver'}" @click.stop="$router.push('/orders/toDeliver')">
      <p>待发货</p>
      <div class="bar" v-show="urlRouter === '/orders/toDeliver'"></div>
    </div>
    <div :class="{active:urlRouter == '/orders/toReceive'}" @click.stop="$router.push('/orders/toReceive')">
      <p>待收货</p>
      <div class="bar" v-show="urlRouter === '/orders/toReceive'"></div>
    </div>
    <div :class="{active:urlRouter == '/orders/toAppraise'}" @click.stop="$router.push('/orders/toAppraise')">
      <p>待评价</p>
      <div class="bar" v-show="urlRouter === '/orders/toAppraise'"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderTab',
    props: ['urlRouter']
  };
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: space-around;
    height: 100px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 88px;
  }
  .main> div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bar {
    width: 66px;
    height: 6px;
    background: rgba(19, 193, 254, 1);
  }
</style>

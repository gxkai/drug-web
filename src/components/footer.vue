<template>
  <footer>
    <router-link tag="div" to="/" :class="{active:urlRouter == '/'}">
      <i class="icon-font ic-icon"></i>
      <p>首页</p>
    </router-link>
    <router-link tag="div" to="/rxs" :class="{active:urlRouter == '/rxs'}">
      <i class="icon-font ic-chufang"></i>
      <p>处方</p>
    </router-link>
    <router-link tag="div" to="/drugTypes" :class="{active:urlRouter == '/drugTypes'}">
      <i class="icon-font ic-fenlei"></i>
      <p>分类</p>
    </router-link>
    <router-link tag="div" to="/carts" :class="{active:urlRouter == '/carts'}">
      <i class="icon-font ic-gouwuche2"></i>
      <p>购物车</p>
    </router-link>
    <router-link tag="div" to="/accounts" :class="{active:urlRouter == '/accounts'}">
      <i class="icon-font ic-wo"></i>
      <p>我</p>
    </router-link>
  </footer>
</template>

<script>
  export default {
    props: ['urlRouter'],
    name: 'newFooter'
  };
</script>

<style scoped>
  footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 720px;
    height: 100px;
    background: white;
  }

  footer div {
    text-align: center;
  }

  footer div p {
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
  }

  footer div i {
    font-size: 35px;
  }

  .active {
    color: rgba(19, 193, 254, 1);
  }
</style>

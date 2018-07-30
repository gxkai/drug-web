<template>
  <footer>
    <router-link tag="div" to="/" :class="{active:urlRouter == '/'}">
      <i class="iconfont ic-zixun"></i>
      <p>咨询</p>
    </router-link>
    <router-link tag="div" to="/rxs" :class="{active:urlRouter == '/rxs'}">
      <i class="iconfont ic-drugstore"></i>
      <p>药店</p>
    </router-link>
    <router-link tag="div" to="/drugTypes" :class="{active:urlRouter == '/drugTypes'}">
      <i class="iconfont ic-shoucang"></i>
      <p>收藏</p>
    </router-link>
    <router-link tag="div" to="/drugTypes" :class="{active:urlRouter == '/drugTypes'}">
      <i class="iconfont ic-gouwuche2"></i>
      <p>购物车</p>
    </router-link>
    <router-link tag="div" to="/carts" :class="{active:urlRouter == '/carts'}" class="joincar">
      <i class="iconfont ic-gouwuche2"></i>
      <p>加入购物车</p>
    </router-link>
    <router-link tag="div" to="/accounts" :class="{active:urlRouter == '/accounts'}" class="immediately-buy">
      <i class="iconfont ic-wo"></i>
      <p>立即购买</p>
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
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: -2px;
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
  .joincar{
    width:154px;
    height:97px;
    background:rgba(240,43,43,1);
    color: white;
  }
  .immediately-buy{
    width:154px;
    height:97px;
    background:rgba(240,145,43,1);
    color: white;
  }
  footer div:first-child{
    width:12%;
    float: left;
  }
  footer div:nth-child(2){
    width:12%;
    float: left;
  }
  footer div:nth-child(3){
    width:12%;
    float: left;
  }
  footer div:nth-child(4){
    width:12%;
    float: left;
  }
  footer div:nth-child(5){
    width:26%;
    float: left;
  }
  footer div:nth-child(6){
    width:26%;
    float: left;
  }
</style>

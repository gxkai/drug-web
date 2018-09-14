<template>
  <div>
    <footer>
      <router-link tag="div" to="/chats">
        <i class="iconfont ic-zixun"></i>
        <p>咨询</p>
      </router-link>
      <router-link tag="div" to="/shops">
        <i class="iconfont ic-drugstore"></i>
        <p>药店</p>
      </router-link>
      <router-link tag="div" to="/collects">
        <i class="iconfont ic-shoucang"></i>
        <p>收藏</p>
      </router-link>
      <router-link tag="div" to="/carts">
        <i class="iconfont ic-gouwuche2"></i>
        <p>购物车</p>
      </router-link>
      <div class="joincar"
           v-if="type === 'HOSPITAL'"
            style="background-color: gray">
        <p>加入购物车</p>
      </div>
      <div class="joincar"
           @click="$emit('createCart')"
            v-else>
        <p>加入购物车</p>
      </div>
      <div  class="immediately-buy" @click="$emit('onBuy')">
        <p>立即购买</p>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'rxShopCart',
    data() {
      return {
      };
    },
    created() {
    },
    props: ['type'],
    methods: {
    }
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
  footer div:nth-child(1),footer div:nth-child(2),footer div:nth-child(3),footer div:nth-child(4) {
    margin-top: 10px;
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
    line-height: 97px;
  }
  .immediately-buy{
    width:154px;
    height:97px;
    color: white;
    line-height: 97px;
    background-color: #1AB6FD;
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

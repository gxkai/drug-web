<template>
  <div>
    <footer>
      <router-link tag="div" to="/" :class="{active:urlRouter === '/'}">
        <i class="iconfont ic-zixun"></i>
        <p>咨询</p>
      </router-link>
      <router-link tag="div" to="/shops" :class="{active:urlRouter === '/shops'}">
        <i class="iconfont ic-drugstore"></i>
        <p>药店</p>
      </router-link>
      <router-link tag="div" to="/collects" :class="{active:urlRouter === '/collects'}">
        <i class="iconfont ic-shoucang"></i>
        <p>收藏</p>
      </router-link>
      <router-link tag="div" to="/carts" :class="{active:urlRouter === '/carts'}">
        <i class="iconfont ic-gouwuche2"></i>
        <p>购物车</p>
      </router-link>
      <div class="joincar" @click="$emit('createCart')">
        <p>加入购物车</p>
      </div>
      <!-- TODO 立即购买 -->
      <router-link tag="div" to="/accounts" :class="{active:urlRouter === '/accounts'}" class="immediately-buy">
        <p>立即购买</p>
      </router-link>
    </footer>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  export default {
    name: 'rxCart',
    data() {
      return {
        number: 1
      };
    },
    created() {
    },
    props: {
      drugInfo: {
        type: Array,
        required: true
      },
      urlRouter: {
        type: String
      }
    },
    methods: {
      onConfirm() {
        this.$http.post('/carts', {
          shopId: this.drugInfo.shopId,
          drugSpecId: this.drugInfo.drugSpecId,
          shopDrugSpecId: this.drugInfo.id,
          quantity: this.number
        }).then(res => {
          MessageBox('提示', '加入成功').then(action => {
            this.close();
          });
        });
      }
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
    background:rgba(240,145,43,1);
    color: white;
    line-height: 97px;
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

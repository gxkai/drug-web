<template>
<div class="shop-box is-flex flex-center">
  <img class="is-280x250" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
  <div class="shop-content flex-sb flex-column position-relative">
    <span><b>{{shopName}}</b></span>
    <new-star disabled size="small" :score.sync="score"></new-star>
    <span>{{phone}}</span>
    <span>{{address}}</span>
    <span class="text-red"> &yen; {{price}}</span>
    <img class="position-absolute" :class="[{active: cart}]" src="123123">
  </div>

</div>
</template>

<script>
  export default {
    name: 'shops',
    props: {
      newScore: {
        type: Number,
        default: 5
      },
      shopName: {
        default: '测试大药房'
      },
      phone: {
        default: '1377630466'
      },
      address: {
        default: '测试地址'
      },
      price: {
        default: '66666'
      },
      cart: {
        default: false
      }
    },
    data() {
      return {
        score: '3',
        newCart: ''
      };
    },
    created: function () {
      console.log(this.newScore);
      console.log(this.cart);
    }
  };
</script>

<style scoped>
  .shop-box{
    width:719px;
    height:283px;
    background:rgba(255,255,255,1);
  }
  .is-280x250{
    width:292px;
    height:250px;
  }
  .flex-center{
    justify-content: center;
    align-items: center;
  }
  .flex-column{
    display: flex;
    flex-direction: column;
  }
  .flex-sb{
    justify-content: space-between;
  }
  .shop-content{
    width: 400px;
    height:250px;
  }
  .shop-content div{
    padding-left: 20px;
    box-sizing: border-box;
  }
  .shop-content span{
    padding-left: 20px;
    box-sizing: border-box;
  }

</style>

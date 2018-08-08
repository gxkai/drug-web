<template>

   <div class="coupon-bg text-white">
     <div><img src="../assets/image/coupon/coupon-bg.png" class="coupon-bg1"/></div>
     <div class="text-333333 coupon-voucher">
        <span>50元优惠券</span>
        <span><span class="text-red">120</span>金币</span>
     </div>
     <div class="coupon-immediatetly fr">
        立即兑换
     </div>
 </div>

</template>

<script>
  export default {
    name: 'coupon',
    value: '',
    data() {
      return {
      };
    },
    watch: {
    },
    methods: {
    },
    created() {
    }
  };
</script>

<style>
  .coupon-immediatetly{
    width:100px;
    height:30px;
    border-radius:15px;
    border: 1px solid #333333;
    color: #333333;
    text-align: center;
    line-height: 30px;
  }
  .coupon-bg{
    width: 183px;
    height: 101px;
  }
  .coupon-bg1{
    width: 183px;
    height: 101px;
  }
  .coupon-price{
    width: 140px;
    height: 48px;
    top: 10px;
  }
  .coupon-money{
    font-size: 40px;
    width:36px;
  }
  .coupon-receive{
    font-size:11px;
    font-size:10px;
  }
  .coupon-receive1{
    font-size: 16px;
    font-size: 10px;
  }
  .coupon-fullprice{

    font-size:10px;
    width: 160px;
    text-align: center;
  }
  .coupon-div{
    height: 48px;
    width: 183px;
  }
  .coupon-voucher{
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }

</style>

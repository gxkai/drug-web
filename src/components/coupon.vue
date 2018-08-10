<template>
   <div>

     <!--
      "list": [
    {
      "expiryDate": "2018-08-10T07:32:24.267Z",
      "fileId": "string",
      "id": "string",
      "name": "string",
      "point": 0,
      "state": "UNUSED",
      "type": "TICKET"
    }
    -->
     <div class="coupon-bg text-white exchange-gift text-center" v-for="(coupon,index) in couponList">
       <div class="coupon-img"><img src="../assets/image/coupon/coupon-bg.png" v-lazy="getImgURL(coupon.fileId,'SMALL_LOGO')" class="coupon-bg1"/></div>
       <div class="text-333333 coupon-voucher">
         <span>{{coupon.point}}元优惠券</span>
         <span><span class="text-red">{{coupon.point}}</span>金币</span>
       </div>
       <div class="text-center width-percent-100">
           <div class="coupon-immediatetly" @click="redeem(index)">
             立即兑换
           </div>
       </div>
     </div>
  </div>
</template>

<script>
  export default {
    name: 'coupon',
    value: '',
    props: {
      couponList: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
      };
    },
    watch: {
    },
    methods: {
      redeem() {
        this.$http.post('/couponRecords/id=1')
          .then(res => {

          })
          .catch(error => {

          });
      }
    },
    created() {
    }
  };
</script>

<style>
  .coupon-img{
    margin-top: 30px;
  }
  .coupon-immediatetly{
    width:100px;
    height:30px;
    border-radius:15px;
    border: 1px solid #333333;
    color: #333333;
    text-align: center;
    line-height: 30px;
    left: 50%;
    margin-left: -50px;
    position: relative;
  }
  .coupon-bg{
    width: 183px;
    height: 101px;
  }
  .coupon-bg1{
    width: 233px;
    height: 161px;
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

  .exchange-gift{
    width: 360px;
    height: 299px;
    float: left;
    display: inline-block;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
  .exchange-gift:nth-child(2n){
    border-right: none;
  }

</style>

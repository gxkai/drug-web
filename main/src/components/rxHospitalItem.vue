<template>
  <div class="rx_shop_item">
    <div class="rx_shop_item-left">
      <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
    </div>
    <div  class="rx_shop_item-right">
       <div>
          <span class="elps rx_shop_name">{{item.name}}</span>
          <img src="../assets/image/rxs/hospital.png" class="rx_shop_hospital"/>
       </div>
       <div  class="elps rx_shop_tel">电话：{{item.phone}}</div>
       <div  class="elps rx_shop_tel">价格：¥{{item.amount}}</div>
       <div  class="elps rx_shop_tel">距当前位置：{{item.distance | meter}}
          <span class="rx_shop_address"> <van-icon name="dizhi" size=".5rem" color="#a6a6a6"></van-icon></span>
       </div>
    </div>
   <!-- <div class="rx_shop_item-left">
      <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
      <div class="rx_shop_item-left-icon">
        医院
      </div>
    </div>
    <div class="rx_shop_item-right">
      <div class="elps">
        <div>{{item.name}}</div>
      </div>
      <div class="elps">
        电话：{{item.phone}}
      </div>
      <div class="elps">
        地址：{{item.address}}
      </div>
    </div>
    <div class="rx_shop_item-cart_icon">
      <i class="iconfont ic-gouwuche1"></i>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'rxShopItem',
    props: ['item'],
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {},
    filters: {
      meter(meter) {
        if (meter < 1) {
          let meters = meter * 1000;
          return meters + '米';
        } else {
          let kilometers = meter;
          return kilometers + '公里';
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">

.rx_shop_item{
  width: 720px;
  height: 289px;
  background: #ffffff;
  position: relative;
  border-top: 10px solid #f3f3f3;
  border-bottom: 10px solid #f3f3f3;
  .rx_shop_item-left{
    display: inline-block;
    float: left;
    margin-top: 24px;
    img{
      width: 228px;
      height: 228px;
      margin-left: 13px;
    }
  }
  .rx_shop_item-right{
    width: 440px;
    display: inline-block;
    float: left;
    margin-left: 32px;
    margin-top: 24px;
    img{
      float: right;
      position: absolute;
      right: 0px;
      top: 0px;
    }
    .rx_shop_name{
      font-size:28px;
      font-weight:bold;
      color:rgba(102,102,102,1);

    }
    .rx_shop_hospital{
      width: 86px;
    }
    .rx_shop_tel{
      font-size:20px;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-top: 30px;
    }
    .rx_shop_address{
     float: right;
}
}
}
</style>

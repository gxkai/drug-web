<template>
<div class="shop-box is-flex flex-center">
  <img class="is-280x250" v-lazy="getImgURL(fileId, 'SMALL_LOGO')">
  <div class="shop-content flex-sb flex-column position-relative ml-div">
    <div class="adiv name-div">
      <i v-show="showIcon" class="iconfont ic-yinanbingli text-1AB6FD"></i>
      <span class="text-title"><b>{{shopName}}</b></span>
    </div>
    <div v-show="showStar" class="adiv">
      <new-star disabled size="small" :score.sync="score"></new-star>
    </div>
    <div class="adiv">
      <i v-show="showIcon" class="iconfont ic-dianhua text-1AB6FD"></i>
      <span class="text-black">{{phone}}</span>
    </div>
    <div class="adiv">
      <i v-show="showIcon" class="iconfont ic-address text-1AB6FD"></i>
      <span class="text-black elps width-address">{{address}}</span>
    </div>
    <div>
      <span class="span1">
        <i v-show="showIcon" class="iconfont ic-qianbao text-1AB6FD"></i>
        <span class="text-price"> &yen; {{price}}</span>
      </span>
      <span class="span2"><i class="iconfont ic-gouwuche1  icon-size text-left" v-show="cart"></i></span>
    </div>

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
        type: String,
        require: true
      },
      phone: {
        type: String,
        default: '无'
      },
      address: {
        type: String,
        default: '无'
      },
      price: {
        type: Number,
        require: true
      },
      newCart: {
        type: Boolean,
        default: false
      },
      fileId: {
        type: String,
        default: ''
      },
      showStar: {
        type: Boolean,
        default: true
      },
      showIcon: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        score: '3',
        cart: false
      };
    },
    created: function () {
      this.score = this.newScore;
      this.cart = this.newCart;
    }
  };
</script>

<style scoped>
  .text-right{
    text-align: right;
    float: right;
  }
  .shop-box{
    width:719px;
    height:283px;
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
    background: white;
  }
  .shop-content > div{

  }

  .position-rb{
    right:10px;
    bottom:-10px;
  }

  .icon-size{
    font-size: 50px;
    color:rgba(240,43,43,1);
  }
  .text-black{
    color: #333333;
    width:239px;
   font-size:22px;
 }
  .text-title{
    width:163px;
    height:26px;
    font-size:28px;
    color:rgba(69,69,69,1);
    line-height:0px;
  }
  .text-price{
    width:77px;
    height:18px;
    font-size:22px;
    color:rgba(255,0,0,1);
    line-height:88px;
  }
  .adiv{

 }

  .width-address{
    width: 300px;
    display: inline-block;
  }
  .ic-gouwuche1{
    margin-left: 180px;
  }
  .span1{
    width: 153px;
    display: inline-block;
    float: left;
  }
  .span2{
    display: inline-block;
    float: right;
  }
  .ml-div{
    margin-left:3px;
  }
  .iconfont{
    font-size: 32px!important;
  }
  .ic-gouwuche1{
    font-size: 40px!important;
  }
</style>

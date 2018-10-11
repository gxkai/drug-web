<template>
<div class="shop-box is-flex flex-center">
  <img class="is-280x250" v-lazy="getImgURL(fileId, 'LARGE_LOGO')">
  <div class="shop-content flex-sb flex-column position-relative ml-div ml-l-20">
    <div class="adiv name-div mt-l-10">
      <span class="text-l-30">
          {{shopName}}
      </span>
    </div>
    <div v-show="showStar" class="adiv mt-l-5">
      <new-star disabled size="middler"  :score.sync="score"></new-star>
    </div>
    <div class="adiv mt-l-5">
      <span class="text-black text-l-20">
        电话：{{phone||'未设置'}}
      </span>
    </div>
    <div class="adiv mt-l-5">
      <span class="text-black  width-address text-l-20">
        地址：{{address||'未设置'}}
      </span>
    </div>
    <div>
      <span class="span1">
        <span class="text-price text-l-20">
          &yen; {{toFixedTwo(price)}}
        </span>
      </span>
    </div>
    <div class="cart"><i class="iconfont ic-gouwuche1  icon-size" v-show="cart"></i></div>
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
  .text-price{
    color:rgba(255,0,0,1);
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
  .ml-div{
    margin-left:3px;
  }
  .iconfont{
    font-size: 30px!important;
  }
  .ic-gouwuche1{
    font-size: 80px!important;
  }
  .cart {
    position: absolute;
    bottom: 0;
    right: 10px;
  }
</style>

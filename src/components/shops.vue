<template>
<div class="shop-box is-flex flex-center">
  <img class="is-280x250" v-lazy="getImgURL(fileId, 'SMALL_LOGO')">
  <div class="shop-content flex-sb flex-column position-relative">
    <div>
      <i v-show="showIcon" class="iconfont ic-yinanbingli text-1AB6FD"></i>
      <span class="text-title"><b>{{shopName}}</b></span>
    </div>
    <div v-show="showStar">
      <new-star disabled size="small" :score.sync="score"></new-star>
    </div>
    <div>
      <i v-show="showIcon" class="iconfont ic-dianhua text-1AB6FD"></i>
      <span class="text-black">{{phone}}</span>
    </div>
    <div>
      <i v-show="showIcon" class="iconfont ic-address text-1AB6FD"></i>
      <span class="text-black">{{address}}</span>
    </div>
    <div>
      <i v-show="showIcon" class="iconfont ic-qianbao text-1AB6FD"></i>
      <span class="text-price"> &yen; {{price}}</span>
    </div>
    <div><i class="iconfont ic-gouwuche1 position-absolute position-rb icon-size" v-show="cart"></i></div>
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
      newCart: {
        default: false
      },
      fileId: {},
      showStar: {
        default: true
      },
      showIcon: {
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
    padding-left: 20px;
    box-sizing: border-box;
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
    height:21px;
    font-size:22px;
    line-height:36px;
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
</style>

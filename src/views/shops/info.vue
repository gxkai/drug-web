<template>
  <div class="container">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />

    <div class="shop-header">
      <div>
        <img :src="getImgURL(resultData.logo, 'SMALL_LOGO') "/>
        <span class="shop-name elps">{{resultData.name}}</span>
        <i class="icon iconfont ic-anquanrenzheng ic-size text-white"></i>
      </div>
    </div>

    <div class="shop-main">
      <div class="shop-list-address bg-white shop-store">
        <span class="text-l-25 d-inline-block elps"><span class="text-l-25">门店地址&nbsp;</span>{{resultData.area}}{{resultData.address}}</span>
      </div>

      <div class="shop-list-scores bg-white">
        <div class="shop-list-score-sum">
          <span class="text-l-25">服务总评&nbsp;</span>
          <span class="shop-score text-l-25">{{toFixedOne(resultData.score)}}</span>
          <span class="text-l-25">（共{{resultData.count}}人参加评分）</span>
        </div>
        <div>
          <table width="100%">
            <tr align="center">
              <td align="center">配送速度：<span class="shop-score">{{toFixedOne(resultData.describeScore)}}</span></td>
              <td align="center">服务态度：<span class="shop-score">{{toFixedOne(resultData.deliveryScore)}}</span></td>
              <td align="center">描述相符：<span class="shop-score">{{toFixedOne(resultData.serviceScore)}}</span></td>
              <td align="center">商品包装：<span class="shop-score">{{toFixedOne(resultData.packageScore)}}</span></td>
            </tr>
          </table>
        </div>
      </div>

      <div class="shop-list-aptitude bg-white">
        <div class="shop-list-aptitude-title">商家资质</div>
        <div class="shop-list-aptitude-imgs bg-white">
          <img :src="getImgURL(item, 'LARGE_PIC')" v-for="(item, index) in resultData.fileIds" :key="index"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'shopInfo',
    data() {
      return {
        resultData: {
        },
        imgLists: [],
        bgColor: 'white',
        color: '#333333'
      };
    },
    created: function () {
      this.$http.get('/shops/' + this.$route.query.id).then(res => {
        console.log(res.data);
        this.resultData = res.data;
      });
    }
  };
</script>
<style scoped>
  .shop-list-aptitude-title {
    padding: 20px 0px 0px 20px;
    font-size: 30px;
  }

  .shop-list-aptitude-imgs {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    align-items: center;
  }

  .shop-list-aptitude-imgs img {
    width: 600px;
    height: 600px;
    padding: 20px 5px 10px 5px;
 }

  .container {
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }

  .shop-header {
    width: 720px;
    margin-top: 2px;
    height: 167px;
    background: rgba(19, 193, 254, 1);

  }

  .shop-header > div {
    height: 167px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .shop-header img {
    width: 100px;
    border-radius: 50%;
    border: 1px solid #FFFEFE;
    background: rgb(255, 254, 254);
    display: inline-block;
    margin-left: 59px;
    float: left;
  }

  .shop-name {
    font-size: 36px;
    color: rgba(255, 254, 254, 1);
    width: 400px;
    display: inline-block;
    margin-left: 10px;
  }

  .shop-list-address {
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    display: block;
    margin-top: 18px;
    margin-bottom: 36px;
    padding-left: 21px;
  }

  .shop-list-scores {
    width: 720px;
    padding-bottom: 30px;
  }

  .shop-list-score-sum {
    height: 52px;
    display: flex;
    margin-left: 20px;
    line-height: 52px;
    color: rgba(0, 0, 0, 1);
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
  }

  .shop-list-score {
    display: flex;
    margin-left: 20px;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 1);
  }

  .shop-list-score span {
    font-size: 25px;
  }

  .shop-score {
    color: rgba(255, 0, 0, 1);
    font-size: 18px;
  }

  .shop-list-aptitude {
    margin-top: 34px;
  }

  .icon {
    width: auto;
    height: auto;
  }

  .ic-anquanrenzheng {
    display: inline-block;
    margin-left: 108px;
    font-size: 55px;
    margin-right: 32px;
  }

  .shopname-address {
    font-size: 18px;
    display: inline-block;
  }

  .shop-store {
    width: 720px;
    height: 73px;
    background: rgba(255, 255, 255, 1);
    line-height: 73px;
  }

  table {
    margin-top: 30px;
   }
  table td{
    font-size: 18px;
  }
</style>

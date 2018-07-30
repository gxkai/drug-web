<template>
  <div class="container">
    <new-header title="商家介绍">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>

    <div class="shop-header">
      <img :src="getImgURL(resultData.logo, 'LOGO') "/>
      <span class="shop-name">{{resultData.name}}</span>
      <i class="icon iconfont ic-anquanrenzheng ic-size" style="color:white;font-size:50px;"></i>
    </div>

    <div class="shop-main">
      <div class="shop-list-address">
        <span style="color: #a2a2a2;font-size: 18px">门店地址：</span>
        <span>{{resultData.area}}{{resultData.address}}</span>
      </div>

      <div class="shop-list-scores">
        <div class="shop-list-score-sum">
          <span>服务总评: </span>
          <span class="shop-score">{{resultData.score}}</span>
          <span>（共{{resultData.count}}人参加评分）</span>
        </div>

        <div class="shop-list-score">
          <span>配送速度: </span>
          <span class="shop-score">{{resultData.describeScore}}</span>
          <span>领先<span style="color: #00ADB3">85%</span>的商家</span>
        </div>

        <div class="shop-list-score">
          <span>服务态度: </span>
          <span class="shop-score">{{resultData.deliveryScore}}</span>
          <span>领先<span style="color: #00ADB3">85%</span>的商家</span>
        </div>

        <div class="shop-list-score">
          <span>描述相符: </span>
          <span class="shop-score">{{resultData.serviceScore}}</span>
          <span>领先<span style="color: #00ADB3">85%</span>的商家</span>
        </div>

        <div class="shop-list-score">
          <span>商品包装: </span>
          <span class="shop-score">{{resultData.packageScore}}</span>
          <span>领先<span style="color: #00ADB3">85%</span>的商家</span>
        </div>
      </div>

      <div class="shop-list-return">
        <div>
          <span class="shop-list-return-title">退单率:</span>
          <span class="shop-list-return-value">0.0%</span>
        </div>
        <div>
          <span class="shop-list-return-title">平均发货时长：</span>
          <span class="shop-list-return-value">8.3小时</span>
        </div>
      </div>

      <div class="shop-list-aptitude">
        <span>商家资质</span>
        <div class="shop-list-aptitude-imgs" v-for="(fileId, index) in resultData.fileIds" :key="index">
          <img :src="getImgURL(fileId, 'PIC')"/>
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
        resultData: [],
        imgLists: []
      };
    },
    created: function () {
      this.$http.get('/shops/' + this.$route.query.id).then(res => {
        console.log(res.data);
        this.resultData = res.data;
        this.getImage(this.resultData, this);
      });
    }
  }
  ;
</script>
<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

  .container {
    width: 720px;
    height: 100vh;
    background: rgba(255, 255, 255, 1);
  }

  .shop-header {
    margin-top: 2px;
    width: 720px;
    height: 167px;
    background: rgba(19, 193, 254, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .shop-header img {
    height: 71px;
    width: 77px;
    border-radius: 50%;
    border: 1px solid #FFFEFE;
    background: rgb(255, 254, 254);
    display: block;
    margin-left: 59px;
  }

  .shop-name {
    font-size: 36px;
    color: rgba(255, 254, 254, 1);
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
    height: 209px;
  }

  .shop-list-score-sum {
    width: 415px;
    height: 20px;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
    margin-bottom: 27px;
    font-size: 24px;
    color: rgba(0, 0, 0, 1);
  }

  .shop-list-score {
    width: 360px;
    height: 20px;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
    margin-bottom: 16px;
    font-size: 18px;
    color: rgba(0, 0, 0, 1);
  }

  .shop-score {
    font-size: 20px;
    color: rgba(255, 0, 0, 1);
  }

  .shop-list-return {
    width: 700px;
    height: 87px;
    margin-left: 20px;
  }

  .shop-list-return-title {
    font-size: 18px;
    color: rgba(102, 102, 102, 1);
  }

  .shop-list-return-value {
    font-size: 24px;
    color: #FF0000;
  }

  .shop-list-aptitude {
    width: 720px;
    height: 100vh;
    display: block;
    margin-top: 34px;
  }

  .shop-list-aptitude span {
    font-size: 24px;
    color: rgba(0, 0, 0, 1);
    display: block;
    margin-left: 20px;
  }

  .shop-list-aptitude-imgs {
    width: 360px;
    height: 243px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

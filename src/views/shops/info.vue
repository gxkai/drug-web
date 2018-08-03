<template>
  <div class="container">
    <new-header title="商家介绍">
      <i class="iconfont ic-arrow-right" @click="$router.go(-1)" slot="left"></i>
    </new-header>

    <div class="shop-header">
      <div>
        <img :src="getImgURL(resultData.logo, 'LOGO') "/>
        <span class="shop-name">{{resultData.name}}</span>
        <i class="icon iconfont ic-anquanrenzheng ic-size" style="color:white;font-size:50px;"></i>
      </div>
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
        </div>

        <div class="shop-list-score">
          <span>服务态度: </span>
          <span class="shop-score">{{resultData.deliveryScore}}</span>
        </div>

        <div class="shop-list-score">
          <span>描述相符: </span>
          <span class="shop-score">{{resultData.serviceScore}}</span>
        </div>

        <div class="shop-list-score">
          <span>商品包装: </span>
          <span class="shop-score">{{resultData.packageScore}}</span>
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
    width: 400px;
    height: 209px;
  }

  .shop-list-score-sum {
    height: 20px;
    display: flex;
    margin-left: 20px;
    margin-bottom: 27px;
    font-size: 24px;
    color: rgba(0, 0, 0, 1);
  }

  .shop-list-score {
    height: 20px;
    display: flex;
    margin-left: 20px;
    margin-bottom: 16px;
    font-size: 18px;
    color: rgba(0, 0, 0, 1);
  }

  .shop-score {
    font-size: 20px;
    color: rgba(255, 0, 0, 1);
    margin-left: 30px;
  }

  .shop-list-aptitude {
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
    width: 720px;
  }

  .shop-list-aptitude img {
    width: 305px;
    height: 243px;
    margin: 20px 20px 20px 20px;
    float: left;
    justify-content: center;
    align-items: center;
  }


</style>

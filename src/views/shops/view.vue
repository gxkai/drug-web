<template>
  <div class="shop_view">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="shop_view-info">
      <img :src="getImgURL(shopInfo.logo, 'SMALL_LOGO')">
      <div class="shop_view-info-name">{{shopInfo.name}}</div>
      <div class="shop_view-info-collect"
           v-text="colloct ? '已收藏':'未收藏'"
           :style="{backgroundColor: colloct ? 'red' : '#BFBFBF'}"
           @click="collect"></div>
    </div>
    <div class="shop_view-score">
      <div class="shop_view-score-info">
        <div>{{shopInfo.describeScore}}分</div>
        <div>客户服务</div>
      </div>
      <div class="shop_view-score-cut_line"></div>
      <div class="shop_view-score-info">
        <div>{{toFixedOne(shopInfo.deliveryScore)}}分</div>
        <div>发货速度</div>
      </div>
      <div class="shop_view-score-cut_line"></div>
      <div class="shop_view-score-info">
        <div>{{toFixedOne(shopInfo.serviceScore)}}分</div>
        <div>物流速度</div>
      </div>
      <div class="shop_view-score-cut_line"></div>
      <div class="shop_view-score-info">
        <div>{{toFixedOne(shopInfo.packageScore)}}分</div>
        <div>商品包装</div>
      </div>
    </div>

    <div class="shop_view-drug_type">
      <div v-for="item in drugTypes"
      @click="linkToShopDrugs(shopId, item.id)">
        {{item.type}}
      </div>
    </div>

    <div class="shop_view-recommend_title">
      <div></div>
      <div>商家推荐</div>
      <div></div>
    </div>

    <div class="shop_view-recommend_list">
      <div class="shop_view-recommend_list-item"
           v-for="recommend in recommendList"
      @click="linkToShopDrugSpec(recommend.id)">
        <div class="shop_view-recommend_list-item_logo">
          <div class="rx_mark" v-if="!recommend.otc">处</div>
          <img :src="getImgURL(recommend.fileId, 'LARGE_LOGO')"/>
        </div>
        <div class="shop_view-recommend_list-item_name">{{recommend.name}}</div>
        <div class="shop_view-recommend_list-item_price">&yen;{{toFixedTwo(recommend.price)}}</div>
      </div>
    </div>

    <div class="shop_view-footer">
        <div @click="linkToShopInfo(shopId)">
          商家介绍
        </div>
        <div @click="linkToShopDrugs(shopId)">
          全部商品
        </div>
        <div @click="linkToChatView(shopId)">
          在线咨询
        </div>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .shop_view {
    background-color: #f5f5f5;
    overflow: auto;
    height: 100vh;
    width: 720px;
    &-info {
      background-color: rgb(19, 193, 254);
      padding: 40px 80px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 77px;
        height: 77px;
        border-radius: 50%;
      }
      &-name {
        font-size: 40px;
        color: white;
        font-weight: 200;
      }
      &-collect {
        padding: 5px 20px;
        color: white;
        font-size: 25px;
        font-weight: 200;
      }
    }

    &-score {
      display: flex;
      background-color: white;
      width: 100%;
      padding: 20px 0px;
      margin-bottom: 20px;
      justify-content: space-around;
      align-items: center;
      &-info {
        & > div {
          text-align: center;
          font-size: 25px;
          &:nth-child(2) {
            color: #999999;
          }
        }
      }
      &-cut_line {
        height: 50px;
        width: 1PX;
        background-color: #CCCCCC;
      }
    }

    &-drug_type {
      display: flex;
      flex-wrap: wrap;
      background-color: white;
      margin-bottom: 20px;
      & > div {
        width: 240px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 25px;
        &:not(:nth-child(3n)) {
          border-right: 1PX solid #cccccc;
        }
        &:nth-child(-n + 3) {
          border-bottom: 1PX solid #cccccc;
        }
      }
    }
    &-recommend_title {
      display: flex;
      justify-content: center;
      background-color: white;
      align-items: center;
      margin-bottom: 20px;
      & > div {
        &:nth-child(even) {
          padding: 20px;
        }
        &:nth-child(odd) {
          width: 50px;
          height: 2PX;
          background-color: #cccccc;
        }
      }
    }
    &-recommend_list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 100px;
      flex-wrap: wrap;
      &-item {
        width: 350px;
        margin-bottom: 20px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        &_logo {
          position: relative;
          padding: 20px;
          img {
            width: 300px;
            height: 300px;
          }
        }
        &_name {
          text-align: center;
          width: 100%;
          font-size: 25px;
          color: #666666;
          padding: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          line-clamp: 2;
        }
        &_price {
          font-size: 25px;
          color: #FF0000;
          padding: 10px;
        }
      }
    }
    &-footer {
      background-color: white;
      display: flex;
      position: fixed;
      bottom: 0;
      &>div {
        width: 240px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 30px;
        color: #666666;
        border-top: 1PX solid #cccccc;
        border-bottom: 1PX solid #cccccc;
        &:nth-child(-n + 2) {
          border-right: 1PX solid #cccccc;
        }
      }
    }
  }

</style>
<script>
  import { Toast } from 'mint-ui';

  export default {
    name: 'shop',
    data() {
      return {
        recommendList: [],
        shopInfo: [],
        shopId: this.$route.query.shopId,
        colloct: false,
        collectz: '',
        drugTypes: []
      };
    },
    created: function () {
      this.$http.get('/shops/' + this.shopId + '/drugs/recommend').then(res => {
        this.recommendList = res.data;
        console.log(res.data);
      }).catch(error => {
        this.exception(error);
      });
      this.$http.get('/shops/' + this.shopId).then(res => {
        this.shopInfo = res.data;
      }).catch(error => {
        this.exception(error);
      });
      this.$http.get('/collects/shop/one?' + '&shopId=' + this.shopId)
        .then(res => {
          if (res.data) {
            this.colloct = true;
          } else {
            this.colloct = false;
          }
        }).catch(error => {
          this.exception(error);
        });
      // 药品大类
      this.$http.get('/drugTypes')
        .then((res) => {
          this.drugTypes = res.data;
        }).catch(error => {
          this.exception(error);
        });
    },
    mounted() {
      // this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight - this.$refs.footer.clientHeight) + 'px';
      // this.$refs.body.style.overflow = 'auto';
    },
    methods: {
      collect() {
        this.colloct = !this.colloct;
        let data = {
          'shopId': this.shopId,
          'isCollect': this.colloct
        };
        this.$http.post('/collects/shop', data).then(res => {
          if (this.colloct) {
            Toast({
              message: '收藏成功',
              position: 'middle',
              duration: 1000
            });
            this.collectz = '已收藏';
          } else {
            Toast({
              message: '取消收藏成功',
              position: 'middle',
              duration: 1000
            });
            this.collectz = '未收藏';
          }
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>
<!--<style scoped>-->
<!--.is-flex {-->
<!--display: flex !important;-->
<!--}-->

<!--.flex-wrap {-->
<!--flex-wrap: wrap;-->
<!--}-->

<!--.type-list {-->
<!--display: block;-->
<!--width: 240px;-->
<!--height: 80px;-->
<!--line-height: 80px;-->
<!--text-align: center;-->
<!--font-size: 26px;-->
<!--}-->

<!--.container {-->
<!--width: 720px;-->
<!--height: 100vh;-->
<!--}-->

<!--.shop-header {-->
<!--margin-top: 2px;-->
<!--width: 720px;-->
<!--height: 167px;-->
<!--background: rgba(19, 193, 254, 1);-->
<!--display: flex;-->
<!--align-items: center;-->
<!--justify-content: space-between;-->
<!--}-->

<!--.shop-header img {-->
<!--width: 100px;-->
<!--border-radius: 50%;-->
<!--border: 1px solid #FFFEFE;-->
<!--background: rgb(255, 254, 254);-->
<!--display: block;-->
<!--margin-left: 59px;-->
<!--}-->

<!--.shop-name {-->
<!--font-size: 36px;-->
<!--color: rgba(255, 254, 254, 1);-->
<!--}-->

<!--.shop-collect {-->
<!--background: #ef4f4f;-->
<!--margin-right: 35px;-->
<!--font-size: 22px;-->
<!--color: rgba(255, 254, 254, 1);-->
<!--border: 1PX solid #cccccc;-->
<!--padding: 5px 10px;-->
<!--}-->

<!--.shop-not-collect {-->
<!--background: rgba(191, 191, 191, 1);-->
<!--margin-right: 35px;-->
<!--font-size: 22px;-->
<!--color: rgba(255, 254, 254, 1);-->
<!--border: 1PX solid #cccccc;-->
<!--padding: 5px 10px;-->
<!--}-->
<!--.shop-score {-->
<!--width: 650px;-->
<!--height: 100px;-->
<!--background: rgba(255, 255, 255, 1);-->
<!--display: flex;-->
<!--justify-content: space-between;-->
<!--align-items: center;-->
<!--margin: auto;-->
<!--margin-top: 14px;-->
<!--}-->

<!--.shop-score li {-->
<!--display: inline-block;-->
<!--}-->

<!--.shop-score span {-->
<!--display: block;-->
<!--width: 100px;-->
<!--font-size: 24px;-->
<!--color: rgba(153, 153, 153, 1);-->
<!--text-align: center;-->
<!--}-->

<!--.shop-score-boundary {-->
<!--width: 1PX;-->
<!--height: 45px;-->
<!--background-color: #999999;-->
<!--}-->

<!--.shop-recommend {-->
<!--width: 720px;-->
<!--background: rgba(255, 255, 255, 1);-->
<!--font-size: 26px;-->
<!--color: rgba(51, 51, 51, 1);-->
<!--display: flex;-->
<!--justify-content: center;-->
<!--padding: 30px 0;-->
<!--}-->

<!--.shop-goods-list {-->
<!--width: 360px;-->
<!--height: 409px;-->
<!--background: rgba(255, 255, 255, 1);-->
<!--float: left;-->
<!--border: 1PX solid #f5f5f5;-->
<!--}-->

<!--.shop-goods img {-->
<!--width: 224px;-->
<!--height: 224px;-->
<!--margin: 72px 50px 26px 50px;-->
<!--}-->

<!--.shop-goods span {-->
<!--width: 218px;-->
<!--display: block;-->
<!--text-align: center;-->
<!--font-size: 25px;-->
<!--color: black;-->
<!--}-->

<!--.shop-footer {-->
<!--width: 720px;-->
<!--height: 89px;-->
<!--background: rgba(255, 255, 255, 1);-->
<!--position: fixed;-->
<!--bottom: 0;-->
<!--left: 0;-->
<!--}-->

<!--.shop-footer a {-->
<!--width: 230px;-->
<!--height: 90px;-->
<!--display: inline-block;-->
<!--line-height: 90px;-->
<!--text-align: center;-->
<!--color: rgba(102, 102, 102, 1);-->
<!--font-size: 30px;-->
<!--}-->

<!--</style>-->

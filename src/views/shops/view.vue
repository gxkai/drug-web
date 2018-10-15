<template>
  <div class="shop_view">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="shop_view-content">
      <div class="shop_view-info">
        <img v-lazy="getImgURL(shopInfo.logo, 'SMALL_LOGO')">
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
             v-for="recommend in list"
             @click="linkToShopDrugSpec(recommend.id)">
          <div class="shop_view-recommend_list-item_logo">
            <div class="rx_mark" v-if="!recommend.otc">处</div>
            <img v-lazy="getImgURL(recommend.fileId, 'LARGE_LOGO')"/>
          </div>
          <div class="shop_view-recommend_list-item_name">{{recommend.name}}</div>
          <div class="shop_view-recommend_list-item_price">&yen;{{toFixedTwo(recommend.price)}}</div>
        </div>
      </div>
    </div>

    <div class="shop_view-footer">
        <div @click="linkToShopInfo(shopId)">
          商家介绍
        </div>
        <div @click="linkToShopDrugs(shopId)">
          全部商品
        </div>
        <!--<div @click="linkToChatView(shopId)">-->
          <!--在线咨询-->
        <!--</div>-->
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .shop_view {
    background-color: #f5f5f5;
    height: 100vh;
    width: 720px;
    display: flex;
    flex-flow: column;
    &-content {
      flex: 1;
      overflow: auto;
    }
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
          font-size: 25px;
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
      &>div {
        flex: 0 0 50%;
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
  export default {
    name: 'shop',
    data() {
      return {
        list: [],
        shopInfo: [],
        shopId: this.$route.query.shopId,
        colloct: false,
        collectz: '',
        drugTypes: []
      };
    },
    created() {
      this.$http.get('/shops/' + this.shopId + '/drugs/recommend').then(res => {
        this.list = res.data;
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
            this.$toast('收藏成功');
            this.collectz = '已收藏';
          } else {
            this.$toast('取消收藏成功');
            this.collectz = '未收藏';
          }
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>

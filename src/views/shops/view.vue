<template>
  <new-layout class="shop_view">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="shop_view-content"
      >
        <div class="shop_view-info">
          <img v-lazy="getImgURL(shopInfo.logo, 'SMALL_LOGO')">
          <div class="shop_view-info-name">{{shopInfo.name}}</div>


          <div @click="onCollect" class="hasCollect" v-if="collected">
            <van-icon name="shoucang1" color="#ffffff"></van-icon>
            已收藏
          </div>
          <div @click="onCollect" class="noCollect" v-else>
            <van-icon name="shoucang1" color="#ffffff"></van-icon>
            未收藏
          </div>
        </div>
        <div class="shop_view-score">
          <div class="shop_view-score-info">
            <!--<div>{{shopInfo.describeScore}}分</div>-->
            <div>--</div>
            <div>客户服务</div>
          </div>
          <div class="shop_view-score-cut_line"></div>
          <div class="shop_view-score-info">
            <!--<div>{{toFixedOne(shopInfo.deliveryScore)}}分</div>-->
            <div>--</div>
            <div>发货速度</div>
          </div>
          <div class="shop_view-score-cut_line"></div>
          <div class="shop_view-score-info">
            <!--<div>{{toFixedOne(shopInfo.serviceScore)}}分</div>-->
            <div>--</div>
            <div>物流速度</div>
          </div>
          <div class="shop_view-score-cut_line"></div>
          <div class="shop_view-score-info">
            <!--<div>{{toFixedOne(shopInfo.packageScore)}}分</div>-->
            <div>--</div>
            <div>商品包装</div>
          </div>
        </div>

        <div class="shop_view-drug_type">
          <div v-for="item in drugTypes"
               @click="linkToShopDrugs(shopId, item.id)">
            {{item.type}}
          </div>
        </div>
        <new-white-space/>
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
    </template>
    <template slot="bottom">
      <div class="shop_view-footer"
      >
        <div @click="linkToShopInfo(shopId)">
          商家介绍
        </div>
        <div @click="linkToShopDrugs(shopId)">
          全部商品
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .shop_view {
    .noCollect{
        width: 130px;
      height: 50px;
      border-radius: 10px;
      color: white;
      background: #999999;
      line-height: 50px;
      text-align: center;
      font-size: 24px;
    }
    .hasCollect{
      width: 130px;
      height: 50px;
      border-radius: 10px;
      color: white;
      background: #FF9800;
      line-height: 50px;
      text-align: center;
      font-size: 24px;
    }
    &-info {
      background-color: $themeColor;
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
        width:150px;
        height: 30px;
        line-height: 30px;
        color: white;
        font-size: 25px;
        font-weight: 200;
        text-align: center;
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
      display: grid;
      grid-template-columns: 240px 240px 240px;
      grid-column-gap: 2PX;
      grid-row-gap: 2PX;
      &>div {
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 25px;
        background-color: white;
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
          color: $themeColor;
          padding: 10px;
        }
      }
    }
    &-footer {
      display: grid;
      grid-template-columns: 360px 360px;
      grid-template-rows: 100px;
      grid-column-gap: 2PX;
      background-color: #f5f5f5;
      &>div {
        line-height: 100px;
        background-color: white;
        text-align: center;
        font-size: 30px;
        color: #666666;
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
        shopId: this.$route.params.shopId,
        collected: false,
        drugTypes: []
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.list = await this.$http.get(`/shops/${this.shopId}/drugs/recommend`);
        this.shopInfo = await this.$http.get(`/shops/${this.shopId}`);
        this.collected = await this.$http.get(`/collects/shop/one?shopId=${this.shopId}`);
        this.drugTypes = await this.$http.get('/drugTypes', {shopId: this.shopId});
      },
      async onCollect() {
        this.collected = !this.collected;
        let data = {
          'shopId': this.shopId,
          'collected': this.collected
        };
        await this.$http.post('/collects/shop', data);
        if (this.collected) {
          this.$toast('收藏成功');
        } else {
          this.$toast('取消收藏成功');
        }
      }
    }
  };
</script>

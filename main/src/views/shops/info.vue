<template>
  <new-layout class="shop-info">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="shop-info__content">
        <div class="shop-info__part-1">
          <img v-lazy="getImgURL(shopInfo.logo, 'LARGE_LOGO')">
          <span>{{shopInfo.name}}</span>
          <van-icon name="anquan" color="#FFFFFF" size=".8rem"></van-icon>
        </div>
        <div class="shop-info__part-2" @click="onLocation">
          <span class="shop-info__part-2__span-name">门店地址:</span>
          <span class="shop-info__part-2__span-address">{{shopInfo.address}}</span>
          <van-icon name="location" size=".5rem" class="shop-info__part-2__location" color="blue" v-bounce-column/>
        </div>
        <div class="shop-info__part-3" style="display: none;">
          <div class="shop-info__part-3__header van-hairline--bottom">
            <span class="shop-info__part-3__header__span-name">服务总评</span>
            <span class="shop-info__part-3__header__span-score">{{toFixedOne(shopInfo.score)}}</span>
            <span class="shop-info__part-3__header__span-count">（共{{shopInfo.count}}人参加评分）</span>
          </div>
          <div class="shop-info__part-3__content">
            <div class="shop-info__part-3__content__item">
              <span class="shop-info__part-3__content__item__span-name">配送速度</span>
              <span class="shop-info__part-3__content__item__span-score">{{toFixedOne(shopInfo.deliveryScore)}}</span>
            </div>
            <div class="shop-info__part-3__content__item">
              <span class="shop-info__part-3__content__item__span-name">服务态度</span>
              <span class="shop-info__part-3__content__item__span-score">{{toFixedOne(shopInfo.serviceScore)}}</span>
            </div>
            <div class="shop-info__part-3__content__item">
              <span class="shop-info__part-3__content__item__span-name">描述相符</span>
              <span class="shop-info__part-3__content__item__span-score">{{toFixedOne(shopInfo.describeScore)}}</span>
            </div>
            <div class="shop-info__part-3__content__item">
              <span class="shop-info__part-3__content__item__span-name">商品包装</span>
              <span class="shop-info__part-3__content__item__span-score">{{toFixedOne(shopInfo.packageScore)}}</span>
            </div>
          </div>
        </div>
        <div class="shop-info__part-4">
          <div class="shop-info__part-4__header">
            <span>商家资质</span>
          </div>
          <van-row class="shop-info__part-4__content">
            <van-col span='12' v-for="(item, index) in shopInfo.fileIds" :key="index"
                     class="shop-info__part-4__content__item">
              <img v-lazy="getImgURL(item, 'LARGE_PIC')">
            </van-col>
          </van-row>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .shop-info {
    &__content {
    }
    &__part-4 {
      background-color: white;
      padding: 20px;
      &__header {
        span {
          font-size:24px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
          color:rgba(0,0,0,1);
        }
      }
      &__content {
        margin-top: 20px;
        &__item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          img {
            width: 300px;
            height: 250px;
          }
        }
      }
    }
    &__part-3 {
      background-color: white;
      margin-bottom: 20px;
      &__header {
        padding: 20px;
        &__span {
          &-name {
            font-size:24px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(0,0,0,1);
          }
          &-score {
            font-size:20px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:$themeColor;
            margin-left: 40px;
          }
          &-count {
            font-size:24px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(51,51,51,1);
            margin-left: 40px;
          }
        }
      }
      &__content {
        padding: 20px;
        &__item {
          &:not(:first-child) {
            margin-top: 10px;
          }
          &__span {
            &-name {
              font-size:18px;
              font-family:HiraginoSansGB-W3;
              font-weight:normal;
              color:rgba(0,0,0,1);
            }
            &-score {
              font-size:20px;
              font-family:HiraginoSansGB-W3;
              font-weight:normal;
              color:$themeColor;
              margin-left: 40px;
            }
          }
        }
      }
    }
    &__part-2 {
      background-color: white;
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      &__location {
        margin-left: 10px;
      }
      &__span {
        &-name {
          font-size:26px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
          color:rgba(102,102,102,1);
        }
        &-address {
          font-size:24px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
          margin-left: 10px;
        }
      }
    }
    &__part-1 {
      width: 720px;
      height: 134px;
      background: $themeColor;
      display: flex;
      padding: 20px 30px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      span {
        font-size: 36px;
        font-family: HiraginoSansGB-W3;
        font-weight: 400;
        color: rgba(255, 254, 254, 1);
        display: inline-block;
        width: 400px;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        line-clamp: 2;
      }
    }
  }
</style>
<script>
  export default {
    name: 'shopInfo',
    data() {
      return {
        shopInfo: {},
        shopId: this.$route.params.id
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.shopInfo = await this.$http.get(`/shops/${this.shopId}`);
      },
      onLocation() {
        this.$router.push({ name: '/iframe', params: { url: this.jumpToBaidu(this.shopInfo.name, this.shopInfo.address, this.shopInfo.lat, this.shopInfo.lng), name: '药店导航' } });
      }
    }
  };
</script>

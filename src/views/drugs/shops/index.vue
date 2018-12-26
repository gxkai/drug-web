<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom">
      <div class="drugs-shops-popup">
        <div class="drugs-shops-popup-header">

          <div class="drugs-shops-popup-header-left">
            <img v-lazy="getImgURL(drugSpec,'LARGE_LOGO')"/>
          </div>
          <div class="drugs-shops-popup-header-center">
            <div class="elpsTwo">{{drugInfo.name}} {{drugSpec.name}} -{{drugInfo.originName}}</div>
            <div style="color: #F60000">{{drugInfo.sfda}}</div>
          </div>
          <div class="drugs-shops-popup-header-right" @click="show = false">
            <i class="iconfont ic-guanbi2"></i>
          </div>
        </div>
        <div class="drugs-shops-popup-content">
          <div class="drugs-shops-popup-content-title">
            选择规格
          </div>
          <div class="drugs-shops-popup-content-list">
            <div class="drugs-shops-popup-content-list-item"
                 v-for="item in drugSpecs"
                 :class="{'drugs-shops-popup-content-list-active':drugSpec === item}"
                 @click="show = false; drugSpec = item">
              <div>{{item.name}}</div>
              <div>
                <input :id="item" type="radio" :value="item" v-model="drugSpec">
                <label :for="item"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <new-layout class="drugs-shops">
      <template slot="top">
        <van-nav-bar
          :title="drugInfo.name"
          left-arrow
          @click-left="$router.go(-1)"
        />

      </template>
      <template slot="center">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(pic,index) in drugSpecs" :key="index">

            <img v-lazy="getImgURL(pic, 'MIDDLE_PIC')"/>
          </van-swipe-item>




       <!-- <van-swipe-item v-for="(fileId,index) in shopDrugSpec.fileIds" :key="index">
            <img v-lazy="getImgURL(fileId,'LARGE_PIC')"/>
          </van-swipe-item>-->





        </van-swipe>
        <div class="drugs-shops__part-1">
          <div class="drugs-shops__part-1__front">
            <div class="drugs-shops__part-1__front-name">{{drugInfo.name}}</div>
            <div class="drugs-shops__part-1__front-introduce">{{drugInfo.introduce}}</div>
            <div class="drugs-shops__part-1__front-sfda">国药准字 {{drugSpec}}：{{drugInfo.sfda}}</div>
            <div class="drugs-shops__part-1__front-originName">厂商：{{drugInfo.originName}}</div>
          </div>
          <div class="drugs-shops__part-1__behind">

          </div>
        </div>
        <div class="drugs-shops__part-2 van-hairline--bottom">
          <van-cell is-link :arrow-direction="show=== true ? 'down' : 'right'" @click="show = true">
            <template slot="title">
          <span class="drugs-shops__part-2__left-number">
            {{total}}个
          </span>
              <span class="drugs-shops__part-2__left-name">
            商家报价
          </span>
            </template>
          </van-cell>
        </div>
        <div class="drugs-shops__part-3">
          <div class="drugs-shops__part-3__item"
               @click="orderById">
            <div class="drugs-shops__part-3__item__name">
              综合
            </div>
            <div class="drugs-shops__part-3__item__arrow">
              <div class="drugs-shops__part-3__item__arrow-up"
                   :style="{borderBottomColor: sort === 'SYNTHESIZE'?'#F60000':'gray'}"></div>
              <div class="drugs-shops__part-3__item__arrow-down"
                   :style="{borderTopColor: sort === 'SYNTHESIZE'?'#F60000':'gray'}"></div>
            </div>
          </div>
          <div class="drugs-shops__part-3__item"
               @click="orderByDistance">
            <div class="drugs-shops__part-3__item__name">
              距离
            </div>
            <div class="drugs-shops__part-3__item__arrow">
              <div class="drugs-shops__part-3__item__arrow-up"
                   :style="{borderBottomColor: sort === 'DISTANCE'?'#F60000':'gray'}"></div>
              <div class="drugs-shops__part-3__item__arrow-down"
                   :style="{borderTopColor: sort === 'DISTANCE'?'#F60000':'gray'}"></div>
            </div>
          </div>
          <div class="drugs-shops__part-3__item"
               @click="orderByPrice">
            <div class="drugs-shops__part-3__item__name">
              价格
            </div>
            <div class="drugs-shops__part-3__item__arrow">
              <div class="drugs-shops__part-3__item__arrow-up"
                   :style="{borderBottomColor: sort === 'PRICE_ASC'?'#F60000':'gray'}"></div>
              <div class="drugs-shops__part-3__item__arrow-down"
                   :style="{borderTopColor: sort === 'PRICE_DESC'?'#F60000':'gray'}"></div>
            </div>
          </div>
        </div>
        <div class="drugs-shops__part-4">
          <div class="drugs-shops__part-4__item"
               v-for="(shop,index) in shops" :key="index"
               @click="linkToShopDrugSpec(shop.shopDrugId)">
            <div class="drugs-shops__part-4__item__name">
              {{shop.name}}
            </div>
            <div class="drugs-shops__part-4__item__price">
              &yen;{{shop.price}}
            </div>
            <div class="drugs-shops__part-4__item__icon">
              <van-icon name="gouwuche3" color="#F60000" size="4em"></van-icon>
            </div>
            <div class="drugs-shops__part-4__item__info">
              <van-icon name="ditu" color="#F60000" size="2em"></van-icon>
              <span>{{shop.address}}</span>
              <!--<van-icon name="aixin" color="#F60000" size="2em"></van-icon>-->
              <!--<span>{{shop.score}}</span>-->
              <!--<van-icon name="kucun" color="#F60000" size="2em"></van-icon>-->
              <!--<span>{{shop.stock}}</span>-->
            </div>
          </div>
        </div>
      </template>
    </new-layout>
  </div>
</template>
<style type="text/scss" lang="scss">
  .drugs-shops {
    .van-swipe {
      width: 100%;
      height: 400px;
      &-item {
        img {
          width: 100%;
          height: 400px;
        }
      }
    }
    &__part-4 {
      &__item {
        position: relative;
        padding: 20px;
        margin-bottom: 20px;
        background-color: white;
        &:first-child {
          margin-top: 20px;
        }
        &__name {
          font-size: 26px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
        &__price {
          position: absolute;
          right: 20px;
          top: 20px;
          font-size: 24px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(255, 0, 0, 1);
        }
        &__icon {
          position: absolute;
          right: 20px;
          bottom: 0;
        }
        &__info {
          padding-top: 20px;
          span {
            font-size: 20px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
    &__part-3 {
      display: flex;
      height: 70px;
      justify-content: space-around;
      align-items: center;
      background-color: white;
      &__item {
        display: flex;
        align-items: center;
        &__name {
          font-size: 25px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
        &__arrow {
          display: flex;
          flex-direction: column;
          &-up, &-down {
            border: 7px solid white;
            width: 0;
            height: 0;
          }
          &-down {
            margin-top: 2px;
          }
        }
      }
    }
    &__part-1 {
      position: relative;
      &__front {
        background-color: white;
        position: absolute;
        width: 660px;
        height: 250px;
        left: 30px;
        border: 1PX solid #F60000;
        border-bottom: none;
        z-index: 1;
        padding: 20px;
        &-name {
          font-size: 24px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &-introduce {
          width: 100%;
          margin: 20px 0;
          font-size: 18px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        &-sfda, &-originName {
          font-size: 20px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(153, 153, 153, 1);
        }
      }
      &__behind {
        background-color: white;
        position: absolute;
        width: 680px;
        height: 220px;
        left: 20px;
        top: 40px;
        border: 1PX solid #F60000;
        border-bottom: none;
        z-index: 0;
      }
    }
    &__part-2 {
      margin-top: 270px;
      &__left {
        span {
          font-size: 24px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(19, 193, 254, 1);
        }
        &-number {
          color: #FF0000 !important;
        }
      }
    }
    &-popup {
      width: 720px;
      min-height: 600px;
      &-header {
        width: 100%;
        padding: 50px 0;
        position: relative;
        &-left {
          position: absolute;
          bottom: 0;
          left: 20px;
          z-index: 1;
          img {
            width: 160px;
            height: 160px;
          }
        }
        &-center {
          margin: 0 20px 0 200px;
          width: 450px;
          div {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            &:nth-child(1) {
              font-size: 28px;
            }
            &:nth-child(2) {
              font-size: 25px;
              font-weight: 300;
            }
          }
        }
        &-right {
          position: absolute;
          right: 20px;
          top: 10px;
          i {
            font-size: 40px;
            color: #F60000;
          }
        }
      }
      &-content {
        &-title {
          padding: 20px;
          font-size: 25px;
        }
        &-list {
          padding: 0 20px;
          &-active {
            border: 1PX solid #F60000;
          }
          &-item {
            padding: 5px 10px;
            margin: 5px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div:nth-child(2) {
              position: relative;
            }
            div {
              font-size: 28px;
            }
            label {
              font-size: 28px;
              position: absolute;
              left: 0;
              top: 0;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 1px solid #999;
            }
            input {
              width: 30px;
              height: 30px;
              opacity: 0;
            }
            input:checked + label {
              background-color: #F60000;
              border: 1PX solid #F60000;
            }
            input:checked + label::after {
              position: absolute;
              content: "";
              width: 7px;
              height: 12px;
              top: 4px;
              left: 8px;
              border: 1PX solid #fff;
              border-top: none;
              border-left: none;
              transform: rotate(45deg);
            }
          }
        }
      }
    }
  }
</style>
<script>
  import { getCurrentAddress } from '@/storage';

  export default {
    data() {
      return {
        shops: [],
        drugInfo: [],
        drugSpecs: [],
        drugSpec: {},
        drugId: this.$route.query.drugId,
        show: false,
        total: 0,
        sort: 'SYNTHESIZE',
        val: -1,
        currentAddress: getCurrentAddress()
      };
    },
    watch: {
      drugSpec(value) {
        this.getShops();
      }
    },
    computed: {
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        const data = await this.$http.get('/drugs/' + this.drugId);
        this.drugInfo = data;
        this.drugSpecs = data.drugSpecs[0]['pics'];
        this.drugSpecs.forEach(e => {
          this.drugSpec = e;
        });
        this.getShops();
      },
      async getShops() {
        const data = await this.$http.get(`/drugs/${this.drugId}/drugSpecs/${this.drugSpec.id}/shops?sort=${this.sort}&lat=${this.currentAddress.lat}&lng=${this.currentAddress.lng}`);
        this.total = data.total;
        this.shops = data.list;
      },

      orderById() {
        this.sort = 'SYNTHESIZE';
        this.getShops();
      },
      orderByDistance() {
        this.sort = 'DISTANCE';
        this.getShops();
      },
      orderByPrice() {
        if (this.sort === 'PRICE_DESC') {
          this.sort = 'PRICE_ASC';
        } else {
          this.sort = 'PRICE_DESC';
        }
        this.getShops();
      }
    }
  };
</script>


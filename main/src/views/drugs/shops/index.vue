<template>
  <div>
    <new-layout>
      <template slot="top">
        <van-nav-bar
          :title="drugInfo.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center">
        <div>
          <new-wing-blank class="info1__item">
            <div class="info1__item1">
              <img v-lazy="getImgURL(drugSpec.logo,'LARGE_LOGO')"/>
            </div>
            <div class="info1__item2">
              <div>
                <span class="info1__name">
                  {{drugInfo.name}}
                </span>
              </div>
              <new-white-space size="0.5em"/>
              <div @click="onSpec">
                <span class="info1__spec">
                  规格:{{drugSpec.spec||'暂无'}} <van-icon :name="show?'arrow-down':'arrow'" v-if="drugSpecs.length > 1"/>
                </span>
              </div>
              <new-white-space size="0.5em"/>
              <div>
                <span class="info1__form">
                  剂型/型号:{{drugSpec.form||'暂无'}}
                </span>
              </div>
            </div>
          </new-wing-blank>
          <new-wing-blank class="info2__item">
            <div class="info2__item1">
              <div>
                <span>
                  批准文号：
                </span>
              </div>
              <div>
                <span>
                  生产企业：
                </span>
              </div>
              <div>
                <span>
                  适应症：
                </span>
              </div>
            </div>
            <div class="info2__item2">
              <div>
                <span>
                  国药准字{{drugInfo.sfda||'暂无'}}
                </span>
              </div>
              <div>
                <span>
                  {{drugSpec.origin ||'暂无'}}
                </span>
              </div>
              <div>
                <span>
                  {{drugInfo.introduce|| '暂无'}}
                </span>
              </div>
            </div>
          </new-wing-blank>
        </div>
        <van-tabs v-model="active">
          <van-tab title="商家报价">
            <div class="info3">
              <div v-for="(shop,index) in shops" :key="index" @click="linkToShopDrugSpec(shop.shopDrugId)">
                <new-white-space/>
                <div class="info3__item">
                  <div class="info3__item1">
                    <span>{{shop.name}}</span>
                    <span> &yen;{{shop.price}}</span>
                  </div>
                  <div class="info3__item2">
                    <van-icon name="ditu" color="#F60000" size="3em"></van-icon>
                    <span class="info3__item2__address van-ellipsis">地址：{{shop.address}}</span>
                    <span class="info3__item2__distance">{{shop.distance | meter}}</span>
                  </div>
                  <div class="info3__item3">
                    <van-tag type="danger" plain>可自提</van-tag>
                    <van-tag :type="shop.distribution==true && shop.shopDistance < shop.distance ? 'danger':'' " plain>可配送</van-tag>
                  </div>
                  <div class="info3__item4">
                    <van-icon name="gouwuche3" :color="drugInfo.otc&&shop.stock>0?'#F60000':'grey'" size="4em" @click.stop="goCar(shop)"></van-icon>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="商品信息">
            <new-wing-blank class="info4__item">
              <div class="info4__item1">
                <div>
                  <span>
                    通用名:
                  </span>
                </div>
                <div>
                  <span>
                    商品品牌：
                  </span>
                </div>
                <div>
                  <span>
                    批准文号：
                  </span>
                </div>
                <div>
                  <span>
                    包装规格：
                  </span>
                </div>
                <div>
                  <span>
                    剂型/型号：
                  </span>
                </div>
                <div>
                  <span>
                    英文名称：
                  </span>
                </div>
                <div>
                  <span>
                    汉语拼音：
                  </span>
                </div>
                <div>
                  <span>有效期：</span>
                </div>
                <div>
                  <span>生产企业：</span>
                </div>
              </div>
              <div class="info4__item2">
                <div>
                  <span>
                    {{drugInfo.name||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    {{drugInfo.brand||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    国药准字{{drugInfo.sfda||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    {{drugSpec.spec||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    {{drugSpec.form||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    {{drugInfo.enName||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    {{drugInfo.pinyinName||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    {{drugInfo.validity||'暂无'}}
                  </span>
                </div>
                <div>
                  <span>
                    {{drugSpec.origin||'暂无'}}
                  </span>
                </div>
              </div>
            </new-wing-blank>
            <new-wing-blank class="info5__item">
              <div v-for="pic in drugSpec.pics">
                <img v-lazy="getImgURL(pic,'LARGE_PIC')"
                />
              </div>
            </new-wing-blank>
          </van-tab>
          <van-tab title="注意事项">
            <div>
            </div>
          </van-tab>
        </van-tabs>
        <van-popup
          v-model="show"
          position="bottom">
          <div class="popup1">
            <new-wing-blank class="popup1__info1">
              <div class="popup1__info1__item1">
                <img v-lazy="getImgURL(drugSpec.logo,'LARGE_LOGO')"/>
              </div>
              <div class="popup1__info1__item2">
                <div>
                  <span class="popup1__info1__name">
                    {{drugInfo.name}}
                  </span>
                </div>
                <div>
                  <span class="popup1__info1__sfda">
                    {{drugInfo.sfda}}
                  </span>
                </div>
              </div>
              <div class="popup1__info1__item3">
                <van-icon name="guanbi2" size="3em" color="red" @click.native="show = false"/>
              </div>
            </new-wing-blank>
            <new-wing-blank py="0">
              <span class="popup1__title">
                选择规格
              </span>
            </new-wing-blank>
            <new-wing-blank class="popup1__info2">
              <div
                v-for="item in drugSpecs"
                @click="drugSpec = item; show=false"
                class="popup1__info2__item"
                :class="[drugSpec===item? 'popup1__info2__item--active':'']"
              >
                <label :for="item.id" class="popup1__info2__spec van-ellipsis">
                  {{item.spec}}
                </label>
                <new-radio  :radio="drugSpec === item"/>
              </div>
            </new-wing-blank>
          </div>
        </van-popup>
        <van-popup position="bottom" v-model="show1">
          <div class="popup-wrapper">
            <new-wing-blank class="content1">
              <div class="item1">
                <img v-lazy="getImgURL(drugSpec.logo,'LARGE_LOGO')"/>
              </div>
              <div class="item2">
                <div class="name text van-ellipsis">
                  {{drugInfo.name}}
                </div>
                <div class="price text van-ellipsis">
                  &yen;{{shopDrugInfo.price}}
                </div>
              </div>
              <div class="item3">
                <van-icon name="close" size="3em" color="#F60000" @click="show1 = false"/>
              </div>
            </new-wing-blank>
            <new-white-space size="2em"/>
            <new-wing-blank class="content2">
              <div class="name">
                购买数量
              </div>
              <new-stepper v-model="number" :min="1"/>
            </new-wing-blank>
            <new-white-space size="5em"/>
            <new-wing-blank class="content3">
              <div class="button" @click="onConfirm">
                <span class="text">确定</span>
              </div>
            </new-wing-blank>
            <new-white-space size="2em"/>
          </div>
        </van-popup>
      </template>
    </new-layout>
  </div>
</template>

<script>
  import { getCurrentAddress } from '@/storage';

  export default {
    data() {
      return {
        activeRed: 1,
        shops: [],
        drugInfo: [],
        drugSpecs: [],
        drugSpec: {},
        drugId: this.$route.params.drugId,
        show: false,
        total: 0,
        sort: 'SYNTHESIZE',
        val: -1,
        currentAddress: getCurrentAddress(),
        name: 'drugAppraise',
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        show1: false,
        drugPrice: '',
        number: 1,
        active: 0,
        shopDrugInfo: {}
      };
    },
    watch: {
      drugSpec(value) {
        this.getShops();
      }
    },
    filters: {
      meter(meter) {
        if (meter < 1) {
          let meters = meter * 1000;
          return meters + '米';
        } else {
          let kilometers = meter;
          return kilometers + '公里';
        }
      }
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      goCar(shopDrugInfo) {
        if (this.drugInfo.otc && shopDrugInfo.stock > 0) {
          this.show1 = true;
          this.shopDrugInfo = shopDrugInfo;
        } else if (this.drugInfo.otc === false) {
          this.$toast('处方药无法加入购物车');
        } else if (shopDrugInfo.stock === 0) {
          this.$toast('库存不足，无法加入购物车');
        }
      },
      // onRefresh() {
      //   this.finished = false;
      //   this.list = [];
      //   this.pageNum = 0;
      //   this.onLoad();
      // },
      // async onLoad() {
      //   this.pageNum++;
      //   const params = {
      //     'pageNum': this.pageNum,
      //     'pageSize': this.pageSize,
      //     'shopDrugId': this.shopDrugSpec.id
      //   };
      //   const data = await this.$http.get('/drugAppraises', params);
      //   this.isLoading = false;
      //   this.loading = false;
      //   this.list = this.list.concat(data.list);
      //   console.log(this.list);
      //   if (data.list.length === 0) {
      //     this.finished = true;
      //   }
      // },
      async initData() {
        this.$loading();
        const data = await this.$http.get('/drugs/' + this.drugId);
        this.drugInfo = data;
        this.drugSpecs = data.drugSpecs;
        this.drugSpec = this.drugSpecs[0];
        this.getShops();
      },
      async getShops() {
        const data = await this.$http.get(`/drugs/${this.drugId}/shops?sort=${this.sort}&lat=${this.currentAddress.lat}&lng=${this.currentAddress.lng}`);
        this.total = data.total;
        this.shops = data.list;
      },

      orderById() {
        this.activeRed = 1;
        this.sort = 'SYNTHESIZE';
        this.getShops();
      },
      orderByDistance() {
        this.activeRed = 2;
        if (this.sort === 'DISTANCE') {
          this.sort = 'SYNTHESIZE';
        } else {
          this.sort = 'DISTANCE';
        }
        this.getShops();
      },
      orderByPrice() {
        this.activeRed = 3;
        if (this.sort === 'PRICE_DESC') {
          this.sort = 'PRICE_ASC';
        } else {
          this.sort = 'PRICE_DESC';
        }
        this.getShops();
      },
      async onConfirm() {
        const data = [{
          shopId: this.shopDrugInfo.shopId,
          drugId: this.shopDrugInfo.drugId,
          shopDrugId: this.shopDrugInfo.shopDrugId,
          quantity: this.number
        }];
        this.$toast.loading({ duration: 0, forbidClick: true });
        await this.$http.post('/carts', data);
        this.$toast('加入购物车成功');
        this.show1 = false;
      },
      onSpec() {
        if (this.drugSpecs.length > 1) {
          this.show = true;
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  /deep/ .van-tabs {
    &__wrap {
      height: 100px !important;
    }
    &--line {
      padding-top: 100px;
    }
    .van-tab {
      color: black !important;
      &--active {
        color: $themeColor !important;
      }
      span {
        line-height: 100px !important;
        font-size: 25px !important;
      }
    }
  }
  /deep/ .van-tag {
    font-size: 20px!important;
    padding: 5px 10px;
    margin-left: 10px;
  }

  /deep/ .van-radio .van-icon-checked {
    color: $themeColor!important;
  }

  .popup-wrapper {
    width: 720px;
    .content1 {
      display: grid;
      grid-template-columns: 150px auto 50px;
      .item1 {
        img {
          width: 150px;
          height: 150px;
        }
      }
      .item2 {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: hidden;
        .text {
          font-size: 25px;
        }
        .price {
          color: $themeColor;
        }
      }
    }
    .content2 {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 30px;
      }
    }
    .content3 {
      .button {
        background-color: $themeColor;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        .text {
          color: white;
          font-size: 25px;
        }
      }
    }
  }

  /*选择规格*/
  .popup1 {
    min-height: 500px;
    &__title {
      font-size: 25px;
    }
    &__info1 {
      display: grid;
      grid-template-columns: 180px auto 50px;
      &__item1 {
        img {
          width: 150px;
          height: 150px;
        }
      }
      &__name {
        font-size: 25px;
      }
      &__sfda {
        font-size: 25px;
        color: $themeColor;
      }
    }
    &__info2 {
      display: grid;
      grid-row-gap: 10px;
      &__spec {
        width: 500px;
        font-size: 25px;
      }
      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        padding: 0 10px;
        &--active {
          border: 1PX solid $themeColor;
        }
      }
    }
  }
  /*主页面*/

  .info1 {
    &__item {
      display: grid;
      grid-template-columns: 200px auto;
    }
    &__item1 {
      grid-column: 1/2;
      display: flex;
      align-items: center;
      justify-content: start;
      img {
        width: 150px;
        height: 150px;
      }
    }
    &__item2 {
      grid-column: 2/3;
    }
    &__name, &__spec, &__form {
      font-size: 25px;
      color: #999999;
    }
  }

  .info2 {
    &__item {
      display: grid;
      grid-template-columns: 130px auto;
    }
    &__item1 {
      grid-column: 1/2;
      &>div {
        margin-top: 10px;
        span {
          font-size: 25px;
          color: #999999;
        }
      }
    }
    &__item2 {
      grid-column: 2/3;
      &>div {
        margin-top: 10px;
        span {
          font-size: 25px;
          color: #999999;
        }
      }
    }
  }

  .info3 {
    &__item {
      padding: 10px 20px;
      display: grid;
      grid-template-columns: 600px auto;
      background-color: white;
    }
    &__item1 {
      grid-column: 1/3;
      display: flex;
      justify-content: space-between;
      &>span:nth-child(2) {
        color: $themeColor;
      }
      * {
        font-size: 25px;
      }
    }
    &__item2 {
      padding: 10px 0;
      grid-column: 1/2;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      &__address {
        font-size: 25px;
        width: 400px;
      }
      &__distance {
        font-size: 25px;
      }
    }
    &__item3 {
      grid-column: 1/2;
      padding: 10px;
    }
    &__item4 {
      grid-column: 2/3;
      grid-row: 2/4
    }
  }

  .info4 {
    &__item {
      display: grid;
      grid-template-columns: 150px auto;
    }
    &__item1 {
      grid-column: 1/2;
      &>div {
        margin-top: 10px;
        span {
          font-size: 25px;
          color: #999999;
        }
      }
    }
    &__item2 {
      grid-column: 2/3;
      &>div {
        margin-top: 10px;
        span {
          font-size: 25px;
          color: #999999;
        }
      }
    }
  }

  .info5 {
    &__item {
      display: grid;
      grid-template-columns: 100%;
      grid-row-gap: 20px;
      &>div {
        display: flex;
        justify-content: center;
        img {
          width: 600px;
          height: 600px;
        }
      }
    }
  }


  /*加入购物车样式*/
  .shopDrug {
    &__popup {
      &__part-1 {
        display: flex;
        align-items: flex-end;
        padding: 20px;
        position: relative;
        &__close-icon {
          position: absolute;
          right: 20px;
          top: 20px;
        }
        &__left {
          &-logo {
            width: 200px;
            height: 200px;
          }
        }
        &__right {
          padding-left: 10px;
          &-name {
            font-size: 26px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #333333;
            width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
          &-price {
            font-size: 30px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #FF0101;
          }
        }
      }
      &__part-2 {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        &__left {
          font-size: 24px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
        }
      }
      &__part-3 {
        padding: 20px;
        .van-button {
          width: 690px;
          height: 90px;
          background: $themeColor;
          border-radius: 8px;
          font-size: 36px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: #ffffff;
        }
      }
    }
    &__content {
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
      &__part-1 {
        position: relative;
        &__front {
          position: absolute;
          z-index: 1;
          width: 670px;
          height: 160px;
          background-color: $themeColor;
          left: 25px;
          padding: 20px;
          & > div {
            width: 100%;
            text-align: center;
            margin: 2px auto;
            color: #FFFFFF;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &-name, &-price {
            font-size: 30px;
            font-family: HiraginoSansGB-W3;
            font-weight: 400;
          }
          &-introduce {
            font-size: 18px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
          }
        }
        &__behind {
          position: absolute;
          z-index: 0;
          width: 670px;
          height: 160px;
          background-color: #DCDCDC;
          left: 35px;
          top: 10px;
        }
      }
      &__part-2 {
        padding: 20px;
        background-color: white;
        margin-top: 180px;
        display: flex;
        align-items: center;
        &__item {
          flex-grow: 20;
          display: flex;
          justify-content: center;
          overflow: auto;
          & > div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span {
            font-size: 20px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
          }
          span:first-child {
            color: $themeColor;
            margin-right: 10px;
          }
        }
        &__dividing {
          height: 30px;
          width: 1PX;
          background-color: #7D7D7D;
        }
      }
      &__part-3 {
        background-color: white;
        margin-top: 20px;
        width: 720px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        &__item {
          background-color: #F2F2F2;
          width: 600px;
          height: 70px;
          padding: 0 20px 0 200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 30px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #666666;
          }
          &__left {
            .van-icon {
              color: $themeColor;
              font-size: 30px;
            }
          }
          &__right {
            .van-icon {
              color: #000000;
              font-size: 30px;
            }
          }
        }
      }
      &__part-4 {
        background-color: white;
        margin-top: 20px;
        padding: 20px 50px;
        &__header {
          display: flex;
          align-items: center;
          &__left {
            &-logo {
              width: 120px;
              height: 120px;
            }
          }
          &__center {
            width: 360px;
            padding-left: 10px;
            &-shopName {
              font-size: 26px;
              font-family: HiraginoSansGB-W3;
              font-weight: normal;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        &__content {
          &__item {
            & > div {
              text-align: center;
              &:first-child {
                font-size: 20px;
                font-family: HiraginoSansGB-W3;
                font-weight: normal;
                color: #333333;
              }
              &:last-child {
                font-size: 20px;
                font-family: HiraginoSansGB-W3;
                font-weight: normal;
                color: $themeColor;
              }
            }
          }
        }
        &__footer {
          padding: 30px 0;
          &-button {
            width: 450px;
            height: 70px;
            line-height: 70px;
            background-color: $themeColor;
            border-radius: 25px;
            margin: 0 auto;
            font-size: 24px;
            font-weight: normal;
            color: #FFFFFF;
            text-align: center;
          }
        }
      }
      &__part-5 {
        margin-top: 20px;
        background-color: white;
        padding: 20px;
        &__header {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          &__left {
            font-size: 20px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #999999;
          }
          &__right {
            font-size: 20px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #333333;
          }
        }
        &__item {
          padding: 20px 0;
          &__header {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            &--right {
              font-size: 25px;
            }
          }
          &__content {
            padding: 10px 0;
            font-size: 20px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #666666;
          }
          &__footer {
            font-size: 22px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #999999;
          }
        }
      }
    }
  }
</style>

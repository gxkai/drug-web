<template>
  <div id="drug_body">
    <new-layout class="drugs-shops">
      <template slot="top">
        <van-nav-bar
          :title="drugInfo.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center">
        <div class="drugs-shops__top">
          <div class="drugs-shops__top__topbottom">
            <div class="drugs-shops__top__shoplogo">
              <img v-lazy="getImgURL(drugSpec.logo,'LARGE_LOGO')"/>
            </div>
            <div class="drugs-shops__top__shopinfo">
              <p>{{drugInfo.name}}</p>
              <p @click="onSpec">规格:{{drugSpec.spec||'暂无'}}</p>
              <p>剂型/型号:{{drugSpec.form||'暂无'}}</p>
              <!--<p style="display: none">
                       <span class="drugs-shops__top__shopinfo__count">204</span>个商家报价
                       <span>价格指数</span><span class="drugs-shops__top__shopinfo__join">加入同店购</span>
                 </p>-->
            </div>
          </div>
          <div class="drugs-shops__top__shopinform">
            <p class="drugs-shops__top__shopinform__approve"><i>批准文号：</i><span>国药准字{{drugInfo.sfda||'暂无'}}</span></p>
            <p class="drugs-shops__top__shopinform__approve"><i>生产企业：</i><span>{{drugSpec.origin ||'暂无'}}</span></p>
            <p class="drugs-shops__top__shopinform__approve"><i>适&nbsp;&nbsp;应&nbsp;&nbsp;症：</i><span>{{drugInfo.introduce|| '暂无'}}</span>
            </p>
            <!-- <p class="drugs-shops__top__shopinform__instructions">展示商品说明书</p>-->
          </div>
          <!-- <div class="drugs-shops__top__tag">
              <span>正品保证</span>
              <span>闪电发货</span>
              <span>贴心服务</span>
              <span>2小时内送达</span>
           </div>-->
        </div>
        <van-tabs v-model="active">
          <van-tab title="商家报价">
            <div class="shop-price">
              <div v-for="(shop,index) in shops" :key="index" @click="linkToShopDrugSpec(shop.shopDrugId)">
                <new-white-space/>
                <div class="shop-price__item">
                  <div class="shop-price__item1">
                    <span>{{shop.name}}</span>
                    <span> &yen;{{shop.price}}</span>
                  </div>
                  <div class="shop-price__item2">
                    <van-icon name="ditu" color="#F60000" size="3em"></van-icon>
                    <span class="shop-price__item2__address van-ellipsis">地址：{{shop.address}}</span>
                    <span class="shop-price__item2__distance">{{shop.distance | meter}}</span>
                  </div>
                  <div class="shop-price__item3">
                    <van-tag type="danger" plain>可自提</van-tag>
                    <van-tag :type="shop.distribution==true && shop.shopDistance < shop.distance ? 'danger':'' " plain>可配送</van-tag>
                  </div>
                  <div class="shop-price__item4">
                    <van-icon name="gouwuche3" color="#F60000" size="4em" @click.stop="goCar(shop)"></van-icon>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="商品信息">
            <div
              class="drug-info"
            >
              <div class="drug-info--text">
                <div>
                  <span>通用名：</span>
                  <span>{{drugInfo.name||'暂无'}}</span>
                </div>
                <div>
                  <span>商品品牌：</span>
                  <span>{{drugInfo.brand||'暂无'}}</span>
                </div>
                <div>
                  <span>批准文号：</span>
                  <span>国药准字{{drugInfo.sfda||'暂无'}}</span>
                </div>
                <div>
                  <span>包装规格：</span>
                  <span>{{drugSpec.spec||'暂无'}}</span>
                </div>
                <div>
                  <span>剂型/型号：</span>
                  <span>{{drugSpec.form||'暂无'}}</span>
                </div>
                <div>
                  <span>英文名称：</span>
                  <span>{{drugInfo.enName||'暂无'}}</span>
                </div>
                <div>
                  <span>汉语拼音：</span>
                  <span>{{drugInfo.pinyinName||'暂无'}}</span>
                </div>
                <div>
                  <span>有效期：</span>
                  <span>{{drugInfo.validity||'暂无'}}</span>
                </div>
                <div>
                  <span>生产企业：</span>
                  <span>{{drugSpec.origin||'暂无'}}</span>
                </div>
              </div>
              <img v-lazy="getImgURL(pic,'LARGE_PIC')"
                   v-for="pic in drugSpec.pics"
                   class="drug_img drug-info&#45;&#45;pic"
              />
            </div>
          </van-tab>
          <van-tab title="注意事项">
            <div>
              <!--<p>1、 不良反应: 常见为眼部的毒副作用, 过敏反应。 </p>-->
              <!--<p>2、 如眼睑发肿、结膜红斑,发生率低于3%。 </p>-->
              <!--<p>3、 不良反应: 常见为眼部的毒副作用, 过敏反应。 </p>-->
              <!--<p>4、 不良反应: 常见为眼部的毒副作用, 过敏反应。 </p>-->
            </div>
          </van-tab>
          <!--<van-tab title="药品评价">-->
          <!--<div class="appraise">-->
          <!--<div class="appraise-title">-->
          <!--<div class="appraise-title-right">-->
          <!--<div class="text-l-25">-->
          <!--共有{{list.length}}位网友评论-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<van-pull-refresh v-model="isLoading" @refresh="onRefresh">-->
          <!--<van-list-->
          <!--v-model="loading"-->
          <!--:finished="finished"-->
          <!--@load="onLoad">-->
          <!--<new-appraise-item :item="item" v-for="(item,index) in list" :key="index"></new-appraise-item>-->
          <!--<new-no-data v-if="finished"></new-no-data>-->
          <!--</van-list>-->
          <!--</van-pull-refresh>-->
          <!--</div>-->
          <!--</van-tab>-->
          <!--<van-tab title="组合推荐">内容 4</van-tab>-->
        </van-tabs>
        <van-popup
          v-model="show"
          position="bottom">
          <div class="drugs-shops-popup">
            <div class="drugs-shops-popup-header">
              <div class="drugs-shops-popup-header-left">
                <img v-lazy="getImgURL(drugSpec.logo,'LARGE_LOGO')"/>
              </div>
              <div class="drugs-shops-popup-header-center">
                <div class="elpsTwo">{{drugInfo.name}}</div>
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
                  <div>{{item.spec}}</div>
                  <div>
                    <input :id="item.id" type="radio" :value="item.id" v-model="drugSpec.id">
                    <label :for="item.id"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-popup>
        <van-popup position="bottom" v-model="show1">
          <div class="shopDrug__popup">
            <div class="shopDrug__popup__part-1 van-hairline--bottom">
              <div class="shopDrug__popup__part-1__close-icon">
                <van-icon name="close" size="3em" color="#F60000"
                          @click="show1 = false"/>
              </div>
              <div class="shopDrug__popup__part-1__left">
                <img v-lazy="getImgURL(drugSpec.logo,'LARGE_LOGO')" class="shopDrug__popup__part-1__left-logo"/>
              </div>
              <div class="shopDrug__popup__part-1__right">
                <div class="shopDrug__popup__part-1__right-name">
                  {{drugInfo.name}}
                </div>
                <div class="shopDrug__popup__part-1__right-price">
                  &yen;{{shopDrugInfo.price}}
                </div>
              </div>
            </div>
            <div class="shopDrug__popup__part-2">
              <div class="shopDrug__popup__part-2__left">
                购买数量
              </div>
              <div class="shopDrug__popup__part-2__right">
                <new-stepper
                  v-model="number"
                  :min="1"
                  :step="1"
                />
              </div>
            </div>
            <div class="shopDrug__popup__part-3">
              <van-button size="large" @click="onConfirm">确定</van-button>
            </div>
          </div>
        </van-popup>
        <!--购物车弹框结束-->
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
        this.show1 = true;
        this.shopDrugInfo = shopDrugInfo;
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
        this.$toast.loading({ duration: 0, forbidClick: true });
        const data = await this.$http.get('/drugs/' + this.drugId);
        this.$toast.clear();
        this.drugInfo = data;
        this.drugSpecs = data.drugSpecs;
        this.drugSpec = this.drugSpecs[0];
        this.getShops();
      },
      async getShops() {
        this.$toast.loading({ duration: 0, forbidClick: true });
        const data = await this.$http.get(`/drugs/${this.drugId}/shops?sort=${this.sort}&lat=${this.currentAddress.lat}&lng=${this.currentAddress.lng}`);
        this.$toast.clear();
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

  .shop-price {
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

  .drugs-shops__top {
    height: 450px;
    width: 720px;
    background: #ffffff;
    &__topbottom {
      border-bottom: 1px dashed #e0e0e0;
      overflow: hidden;
      height: 17vh;
      background: #ffffff;
    }
    &__shoplogo {
      display: inline-block;
      float: left;
      img {
        width: 150px;
        height: 150px;
        margin: 25px;
      }
    }
    &__shopinfo {
      display: inline-block;
      float: left;
      width: 480px;
      p {

        &:first-child {
          margin-top: 30px;
          margin-bottom: 15px;
          font-size: 28px;
        }
        &:nth-child(2), &:nth-child(3) {
          margin-top: 10px;
          color: #9d9d9d;
          font-size: 25px;
          margin-bottom: 10px;
        }
        &:nth-child(4) {
          margin-top: 10px;
          color: #9d9d9d;
          font-size: 25px;
          margin-bottom: 10px;
          span {
            font-size: 25px;
            :first-child {
              color: #F60000;
            }
            :nth-child(3) {
              display: inline-block;
              border: 1px solid red;
            }
          }
        }
      }
      &__count {
        color: red;
      }
      &__join {
        display: inline-block;
        border: 1px solid red;
        padding: 5px;
        border-radius: 15px;
        color: #F60000;
        float: right;
        margin-right: 10px;
        display: inline-block;
      }

    }
    &__shopinform {
      width: 100%;
      background: #ffffff;
      padding-bottom: 10px;
      p {

        &:first-child {
          margin-top: 10px;
          margin-bottom: 15px;
          font-size: 28px;
        }
        &:nth-child(2), &:nth-child(3) {
          margin-top: 10px;
          color: #9d9d9d;
          font-size: 25px;
          margin-bottom: 10px;

        }
        &:nth-child(4) {
          margin-top: 10px;
          color: #9d9d9d;
          font-size: 25px;
          margin-bottom: 10px;
          span {
            font-size: 25px;
            :first-child {
              color: #F60000;
            }
            :nth-child(3) {
              display: inline-block;
              border: 1px solid red;
            }
          }
        }
      }
      &__approve {
        display: flex;
        align-items: center;
        margin-left: 15px;
        i {
          width: 130px;
          font-style: normal;
          font-size: 25px;
          display: inline-block;
          vertical-align: top;
          color: #666666;
        }
        span {
          display: inline-block;
          font-size: 25px;
          width: 550px;
          color: #666666;
        }
      }
      &__instructions {
        text-align: center;
        color: #F60000 !important;
        margin-top: 30px !important;
      }
    }

    &__tag {
      text-align: center;
      span {
        font-size: 25px;
        display: inline-block;
        margin-right: 15px;
        border: 1px solid red;
      }
    }

  }

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
          font-size: 20px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
        &__price {
          position: absolute;
          right: 20px;
          top: 20px;
          font-size: 20px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: $themeColor;
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
        &__distance {
          padding-top: 20px;
          &__meter {
            font-size: 15px;
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
        border: 1PX solid $themeColor;
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
        border: 1PX solid $themeColor;
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
          color: $themeColor !important;
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
            &:nth-child(3) {
              font-size: 25px;
            }
          }
        }
        &-right {
          position: absolute;
          right: 20px;
          top: 10px;
          i {
            font-size: 40px;
            color: $themeColor;
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
            border: 1PX solid $themeColor;
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
              background-color: $themeColor;
              border: 1PX solid $themeColor;
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

  .red {
    color: $themeColor !important;
  }

  .drugs_one {
    margin-top: 10px;
    p {
      span {
        font-size: 25px;
      }
      span:nth-child(2) {
        float: right;
        margin-right: 15px;
      }
      margin-left: 15px;
    }
    p:first-child {
      height: 50px;
      line-height: 50px;
    }

  }

  .drugs_one_address {
    span {
      font-size: 25px;
    }
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 550px;
    display: inline-block;
  }

  .van-icon-gouwuche3 {
    display: inline-block;
    float: right;
  }

  .van-tab span {
    font-size: 30px !important;
  }

  .drugs_extract {
    margin-left: 15px;
    margin-top: 15px;
    overflow: hidden;
  }

  .drugs-attention {
    background: #ffffff;
    padding-top: 15px;
    padding: 25px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 705px;
      display: inline-block;
      font-size: 25px;
      margin-left: 15px;
      color: #999999;
    }
  }

  .layout--center {
    background: #ffffff !important;
  }

  .appraise {
    padding: 20px;
    &-title {
      width: 100%;
      height: 100px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      &-left {
        display: flex;
        flex-direction: column;
        align-self: center;
        font-family: HiraginoSansGB-W3;
        color: rgba(51, 51, 51, 1);
      }
      &-right {
        font-family: HiraginoSansGB-W3;
        color: rgba(153, 153, 153, 1);
        div {
          margin-top: 15px;
        }
      }
    }
    &-container {
      position: relative;
      width: 100%;
      height: 100vh;
    }
  }

  .rx-since {
    font-size: 20px;
    width: 82px;
    height: 33px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid $themeColor !important;
    border-radius: 7px;
    display: inline-block;
    color: $themeColor !important;
    text-align: center;
    line-height: 33px;
    margin-right: 15px;
  }

  .drugs_one {
    padding: 20px;
  }

  .drug-info {
    background-color: white;
    &--text {
      padding: 25px;
      & > div {
        margin-top: 20px;
        & > span {
          color: #999999;
          font-size: 24px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          &:nth-child(1) {
            display: inline-block;
            width: 150px;
          }
        }
      }
    }
    &--pic {
      width: 500px;
      height: 350px;
      margin: 10px 110px;
    }
  }

  .van-tabs--line {
    border-top: none !important;
    padding-bottom: 20px;

    overflow: hidden;
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

  .drug_img {
    width: 90%;
    margin-left: 5%;
  }
</style>

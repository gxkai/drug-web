<template>
  <div>
    <new-layout class="shopDrug">
      <template slot="top">
        <van-nav-bar
          :title="$route.meta.name"
          left-arrow
          @click-left="$router.go(-1)"
        >
        </van-nav-bar>
      </template>
      <template slot="center">
        <div class="shopDrug__content">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(fileId,index) in shopDrug.fileIds" :key="index">
              <img v-lazy="getImgURL(fileId,'LARGE_PIC')"/>
            </van-swipe-item>
          </van-swipe>
          <div class="shopDrug__content__part-1">
            <div class="shopDrug__content__part-1__front">
              <div class="shopDrug__content__part-1__front-name">
                {{shopDrug.name}}
              </div>
              <div class="shopDrug__content__part-1__front-introduce">
                {{shopDrug.introduce}}
              </div>
              <div class="shopDrug__content__part-1__front-price">
                &yen;{{shopDrug.price}}
              </div>
            </div>
            <div class="shopDrug__content__part-1__behind">
            </div>
          </div>
          <div class="shopDrug__content__part-2">
            <div class="shopDrug__content__part-2__item">
              <span>国药准字:&nbsp;&nbsp;</span>
              <span>{{shopDrug.sfda||'暂无'}}</span>
            </div>
            <div class="shopDrug__content__part-2__item">
              <span>库存:&nbsp;&nbsp; </span>
              <span>{{shopDrug.stock}}</span>
            </div>
            <div class="shopDrug__content__part-2__item">
              <span>包装规格:&nbsp;&nbsp;</span>
              <span>{{shopDrug.spec}}</span>
            </div>
          </div>
          <div class="shopDrug__content__part-3">
            <div class="shopDrug__content__part-3__item"
                 @click="$router.push({name: '/shopDrugs/view', params: {state: 0,shopDrug:shopDrug}})">
              <div class="shopDrug__content__part-3__item__left">
                <van-icon name="liwu-copy"></van-icon>
                <span>商品详情</span>
              </div>
              <div class="shopDrug__content__part-3__item__right">
                <van-icon name="arrow"></van-icon>
              </div>
            </div>
            <div class="shopDrug__content__part-3__item"
                 @click="$router.push({name: '/shopDrugs/view', params: {state: 1,shopDrug:shopDrug}})">
              <div class="shopDrug__content__part-3__item__left">
                <van-icon name="pingjia"></van-icon>
                <span>商品评价</span>
              </div>
              <div class="shopDrug__content__part-3__item__right">
                <van-icon name="arrow"></van-icon>
              </div>
            </div>
          </div>
          <div class="shopDrug__content__part-4">
            <div class="shopDrug__content__part-4__header">
              <div class="shopDrug__content__part-4__header__left">
                <img v-lazy="getImgURL(shopDrug.shopLogo,'LARGE_LOGO')"
                     class="shopDrug__content__part-4__header__left-logo"/>
              </div>
              <div class="shopDrug__content__part-4__header__center">
                <div class="shopDrug__content__part-4__header__center-shopName">
                  {{shopDrug.shopName}}
                </div>
                <div>
                  <!--<van-rate v-model="shopDrug.shopTotalAppraise.score" disabled disabled-color="red" :size="15"/>-->
                </div>
              </div>
              <!--<div class="shopDrug__content__part-4__header__right">-->
                <!--<van-icon name="peisong-" color="#F60000" size="5em"/>-->
                <!--<van-icon name="anquan" color="#F60000" size="5em"/>-->
              <!--</div>-->
            </div>
            <div class="shopDrug__content__part-4__content">
              <van-row gutter="20">
                <van-col span="6" class="shopDrug__content__part-4__content__item">
                  <div>客户服务</div>
                  <!--<div>{{toFixedOne(shopDrug.shopTotalAppraise.serviceScore)}}分</div>-->
                  <div>--</div>
                </van-col>
                <van-col span="6" class="shopDrug__content__part-4__content__item">
                  <div>发货速度</div>
                  <!--<div>{{toFixedOne(shopDrug.shopTotalAppraise.deliveryScore)}}分</div>-->
                  <div>--</div>
                </van-col>
                <van-col span="6" class="shopDrug__content__part-4__content__item">
                  <div>商品包装</div>
                  <!--<div>{{toFixedOne(shopDrug.shopTotalAppraise.packageScore)}}分</div>-->
                  <div>--</div>
                </van-col>
                <van-col span="6" class="shopDrug__content__part-4__content__item">
                  <div>商品描述</div>
                  <!--<div>{{toFixedOne(shopDrug.shopTotalAppraise.describeScore)}}分</div>-->
                  <div>--</div>
                </van-col>
              </van-row>
            </div>
            <div class="shopDrug__content__part-4__footer">
              <div class="shopDrug__content__part-4__footer-button"
                   @click="$router.push({name:'/shops/view',params:{shopId:shopDrug.shopId}})">
                进入店铺
              </div>
            </div>
          </div>
          <div class="shopDrug__content__part-5">
            <div class="shopDrug__content__part-5__header van-hairline--bottom">
              <div class="shopDrug__content__part-5__header__left">
                顾客评论({{shopDrug.drugAppraises.total}})
              </div>
              <div class="shopDrug__content__part-5__header__right"
                   @click="$router.push({name: '/shopDrugs/view', params: {state: 1,shopDrug:shopDrug}})">
                全部评价&gt;
              </div>
            </div>
            <div class="shopDrug__content__part-5__item van-hairline--bottom"
                 v-for="drugAppraise in shopDrug.drugAppraises.list">
              <div class="shopDrug__content__part-5__item__header">
                <van-rate v-model="drugAppraise.score" disabled disabled-color="red" :size="15"/>
                <div
                  class="shopDrug__content__part-5__item__header--right"
                >{{drugAppraise.username|asterisk}}</div>
              </div>
              <div class="shopDrug__content__part-5__item__content">
                {{drugAppraise.content||'没有评论内容'}}
              </div>
              <div class="shopDrug__content__part-5__item__footer">
                {{timeConvert(drugAppraise.createdDate)}}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="bottom">
        <van-goods-action style="position: sticky">
          <van-goods-action-mini-btn icon="chat" text="咨询" @click="onChat"/>
          <van-goods-action-mini-btn icon="cart" text="购物车" to="/carts"/>
          <van-goods-action-mini-btn :icon="collected === true ? 'shoucang1':'shoucang'" text="收藏" :style="{color: collected === true ? 'red': ''}"
                                     @click="onCollect"/>
          <van-goods-action-big-btn text="加入购物车"
                                    :style="{backgroundColor:shopDrug.otc===true && shopDrug.stock > 0?'#f85':'gray',borderColor:shopDrug.otc===true && shopDrug.stock > 0?'#ff976a':'gray'}"
                                    @click="onShow(0)"/>
          <van-goods-action-big-btn text="立即购买" primary
                                    :style="{backgroundColor:shopDrug.otc===true && shopDrug.stock > 0?'#f44':'gray',borderColor:shopDrug.otc===true && shopDrug.stock > 0?'#f44':'gray'}"
                                    @click="onShow(1)"/>
        </van-goods-action>
      </template>
    </new-layout>
    <van-popup position="bottom" v-model="show">
      <div class="shopDrug__popup">
        <div class="shopDrug__popup__part-1 van-hairline--bottom">
          <div class="shopDrug__popup__part-1__close-icon">
            <van-icon name="close" size="3em" color="#F60000"
                      @click="show = false"/>
          </div>
          <div class="shopDrug__popup__part-1__left">
            <img v-lazy="getImgURL(shopDrug.drugLogo,'LARGE_LOGO')" class="shopDrug__popup__part-1__left-logo"/>
          </div>
          <div class="shopDrug__popup__part-1__right">
            <div class="shopDrug__popup__part-1__right-name">
              {{shopDrug.name}}
            </div>
            <div class="shopDrug__popup__part-1__right-price">
              &yen;{{shopDrug.price}}
            </div>
          </div>
        </div>
        <div class="shopDrug__popup__part-2">
          <div class="shopDrug__popup__part-2__left">
            购买数量
          </div>
          <div class="shopDrug__popup__part-2__right">
            <new-stepper v-model="number" :min="1" :max="shopDrug.stock"/>
          </div>
        </div>
        <div class="shopDrug__popup__part-3">
          <van-button size="large" @click="onConfirm" :loading="loading">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-icon-shoucang1 {
    color: red!important;
  }
</style>
<style scoped type="text/scss" lang="scss">
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
            font-size:26px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color: #333333;
            width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
          &-price {
            font-size:30px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color: #FF0101;
          }
        }
      }
      &__part-2 {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        &__left {
          font-size:24px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;}
      }
      &__part-3 {
        padding: 20px;
        .van-button {
          width:690px;
          height:90px;
          background:$themeColor;
          border-radius:8px;
          font-size:36px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
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
        margin-top: 190px;
        display: grid;
        grid-template-columns: 240px 150px auto;
        grid-template-rows: auto;
        grid-column-gap: 5px;
        &__item {
          padding: 20px 5px;
          background-color: white;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          &>span {
            font-size: 20px;
            &:nth-child(1) {
              color: $themeColor;
            }
          }
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
        margin-bottom: 130px;
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
            font-size: 16px!important;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #666666;
          }
          &__footer {
            font-size: 18px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #999999;
          }
        }
      }
    }
  }
  #shoucang1 {
    .van-icon-shoucang1 {
      color: green!important;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        shopDrug: {
          shopTotalAppraise: {},
          drugAppraises: {}
        },
        show: false,
        type: 0,
        number: 1,
        collected: false,
        loading: false,
        shopDrugId: this.$route.params.shopDrugId,
        pharmacist: ''
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      onShow(type) {
        if (this.shopDrug.otc && this.shopDrug.stock > 0) {
          this.show = true;
          this.type = type;
        }
        if (this.shopDrug.otc === false) {
          switch (type) {
            case 0:
              this.$toast('处方药无法加入购物车');
              break;
            case 1:
              this.$toast('处方药无法立即购买');
              break;
            default:
              break;
          }
        } else if (this.shopDrug.stock === 0) {
          switch (type) {
            case 0:
              this.$toast('库存不足，无法加入购物车');
              break;
            case 1:
              this.$toast('库存不足，无法立即购买');
              break;
            default:
              break;
          }
        }
      },
      onChat() {
        this.$dialog.confirm({ message: `打电话给${this.shopDrug.phone}` }).then(() => {
          window.location.href = `tel:${this.shopDrug.phone}`;
        }).catch(() => {
        });
      },
      async initData() {
        this.$loading();
        this.shopDrug = await this.$http.get(`/shopDrugs/${this.shopDrugId}`);
        this.collected = await this.$http.get(`/collects/drug/one?shopDrugId=${this.shopDrug.id}`);
      },
      async onCollect() {
        let data = {
          'shopId': this.shopDrug.shopId,
          'drugId': this.shopDrug.drugId,
          'shopDrugId': this.shopDrug.id,
          'collected': !this.collected
        };
        this.$toast.loading({ duration: 0, forbidClick: true });
        await this.$http.post('/collects/drug', data);
        this.collected = !this.collected;
        if (this.collected) {
          this.$toast('收藏成功');
        } else {
          this.$toast('取消收藏成功');
        }
      },
      async onConfirm() {
        if (this.type === 0) {
          const data = [{
            shopId: this.shopDrug.shopId,
            drugId: this.shopDrug.drugId,
            shopDrugId: this.shopDrug.id,
            quantity: this.number
          }];
          this.$toast.loading({ duration: 0, forbidClick: true });
          await this.$http.post('/carts', data);
          this.$toast('加入购物车成功');
          this.show = false;
        } else {
          let drugInfoList = [];
          drugInfoList.push({
            shopDrugId: this.shopDrug.id,
            quantity: this.number
          });
          let json = {
            'shopId': this.shopDrug.shopId,
            'shopName': this.shopDrug.shopName,
            'drugs': drugInfoList,
            'type': 'SIMPLE'
          };
          this.$toast.loading({ duration: 0, forbidClick: true });
          const shopDrugOrderDTO = await this.$http.post('orders/shop/preClose', json);
          this.$router.push({ name: '/orders/create/fromShop', params: { orderShopDrugDTO: json, shopDrugOrderDTO: shopDrugOrderDTO } });
        }
      }
    }
  };
</script>

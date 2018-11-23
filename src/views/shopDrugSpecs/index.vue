<template>
  <div>
    <new-layout class="shopDrugSpec">
      <template slot="top">
        <van-nav-bar
          :title="$route.name"
          left-arrow
          @click-left="$router.go(-1)"
        >
        </van-nav-bar>
      </template>
      <template slot="center">
        <div class="shopDrugSpec__content">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(fileId,index) in shopDrugSpec.fileIds" :key="index">
              <img v-lazy="getImgURL(fileId,'LARGE_PIC')"/>
            </van-swipe-item>
          </van-swipe>
          <div class="shopDrugSpec__content__part-1">
            <div class="shopDrugSpec__content__part-1__front">
              <div class="shopDrugSpec__content__part-1__front-name">
                {{shopDrugSpec.name}}
              </div>
              <div class="shopDrugSpec__content__part-1__front-introduce">
                {{shopDrugSpec.introduce}}
              </div>
              <div class="shopDrugSpec__content__part-1__front-price">
                &yen;{{shopDrugSpec.price}}
              </div>
            </div>
            <div class="shopDrugSpec__content__part-1__behind">
            </div>
          </div>
          <div class="shopDrugSpec__content__part-2">
            <div class="shopDrugSpec__content__part-2__item">
              <span>国药准字</span>
              <span>{{shopDrugSpec.sfda}}</span>
            </div>
            <div class="shopDrugSpec__content__part-2__dividing">
            </div>
            <div class="shopDrugSpec__content__part-2__item">
              <span>库存</span>
              <span>{{shopDrugSpec.stock}}</span>
            </div>
            <div class="shopDrugSpec__content__part-2__dividing">
            </div>
            <div class="shopDrugSpec__content__part-2__item">
              <span>包装规格</span>
              <span>{{shopDrugSpec.spec}}</span>
            </div>
          </div>
          <div class="shopDrugSpec__content__part-3">
            <div class="shopDrugSpec__content__part-3__item"
                 @click="$router.push({path: '/shopDrugSpecs/view', query: {state: 0,shopDrugSpec:JSON.stringify(shopDrugSpec)}})">
              <div class="shopDrugSpec__content__part-3__item__left">
                <van-icon name="liwu-copy"></van-icon>
                <span>商品详情</span>
              </div>
              <div class="shopDrugSpec__content__part-3__item__right">
                <van-icon name="arrow"></van-icon>
              </div>
            </div>
            <div class="shopDrugSpec__content__part-3__item"
                 @click="$router.push({path: '/shopDrugSpecs/view', query: {state: 1,shopDrugSpec:JSON.stringify(shopDrugSpec)}})">
              <div class="shopDrugSpec__content__part-3__item__left">
                <van-icon name="pingjia"></van-icon>
                <span>商品评价</span>
              </div>
              <div class="shopDrugSpec__content__part-3__item__right">
                <van-icon name="arrow"></van-icon>
              </div>
            </div>
          </div>
          <div class="shopDrugSpec__content__part-4">
            <div class="shopDrugSpec__content__part-4__header">
              <div class="shopDrugSpec__content__part-4__header__left">
                <img v-lazy="getImgURL(shopDrugSpec.shopLogo,'LARGE_LOGO')"
                     class="shopDrugSpec__content__part-4__header__left-logo"/>
              </div>
              <div class="shopDrugSpec__content__part-4__header__center">
                <div class="shopDrugSpec__content__part-4__header__center-shopName">
                  {{shopDrugSpec.shopName}}
                </div>
                <div>
                  <van-rate v-model="shopDrugSpec.shopTotalAppraise.score" disabled disabled-color="red" :size="15"/>
                </div>
              </div>
              <div class="shopDrugSpec__content__part-4__header__right">
                <van-icon name="peisong-" color="#13C1FE" size="5em"/>
                <van-icon name="anquan" color="#13C1FE" size="5em"/>
              </div>
            </div>
            <div class="shopDrugSpec__content__part-4__content">
              <van-row gutter="20">
                <van-col span="6" class="shopDrugSpec__content__part-4__content__item">
                  <div>客户服务</div>
                  <div>{{toFixedOne(shopDrugSpec.shopTotalAppraise.serviceScore)}}分</div>
                </van-col>
                <van-col span="6" class="shopDrugSpec__content__part-4__content__item">
                  <div>发货速度</div>
                  <div>{{toFixedOne(shopDrugSpec.shopTotalAppraise.deliveryScore)}}分</div>
                </van-col>
                <van-col span="6" class="shopDrugSpec__content__part-4__content__item">
                  <div>商品包装</div>
                  <div>{{toFixedOne(shopDrugSpec.shopTotalAppraise.packageScore)}}分</div>
                </van-col>
                <van-col span="6" class="shopDrugSpec__content__part-4__content__item">
                  <div>商品描述</div>
                  <div>{{toFixedOne(shopDrugSpec.shopTotalAppraise.describeScore)}}分</div>
                </van-col>
              </van-row>
            </div>
            <div class="shopDrugSpec__content__part-4__footer">
              <div class="shopDrugSpec__content__part-4__footer-button"
                   @click="$router.push({path:'/shops/view',query:{shopId:shopDrugSpec.shopId}})">
                进入店铺
              </div>
            </div>
          </div>
          <div class="shopDrugSpec__content__part-5">
            <div class="shopDrugSpec__content__part-5__header van-hairline--bottom">
              <div class="shopDrugSpec__content__part-5__header__left">
                顾客评论({{shopDrugSpec.drugAppraises.total}})
              </div>
              <div class="shopDrugSpec__content__part-5__header__right"
                   @click="$router.push({path: '/shopDrugSpecs/view', query: {state: 1,shopDrugSpec:JSON.stringify(shopDrugSpec)}})">
                全部评价&gt;
              </div>
            </div>
            <div class="shopDrugSpec__content__part-5__item van-hairline--bottom"
                 v-for="drugAppraise in shopDrugSpec.drugAppraises.list">
              <div class="shopDrugSpec__content__part-5__item__header">
                <van-rate v-model="drugAppraise.score" disabled disabled-color="red" :size="15"/>
                <div
                  class="shopDrugSpec__content__part-5__item__header--right"
                >{{drugAppraise.username|asterisk}}</div>
              </div>
              <div class="shopDrugSpec__content__part-5__item__content">
                {{drugAppraise.content||'没有评论内容'}}
              </div>
              <div class="shopDrugSpec__content__part-5__item__footer">
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
          <van-goods-action-mini-btn icon="shoucang" text="收藏" :style="{color: collected === true? 'red': ''}"
                                     @click="onCollect"/>
          <van-goods-action-big-btn text="加入购物车"
                                    :style="{backgroundColor:shopDrugSpec.otc===false?'gray':'#f85'}"
                                    @click="shopDrugSpec.otc===false? '' : show=true;type=0"/>
          <van-goods-action-big-btn text="立即购买" primary
                                    :style="{backgroundColor:shopDrugSpec.otc===false?'gray':'#f44'}"
                                    @click="shopDrugSpec.otc===false? '' : show=true;type=1"/>
        </van-goods-action>
      </template>
    </new-layout>
    <van-popup position="bottom" v-model="show">
      <div class="shopDrugSpec__popup">
        <div class="shopDrugSpec__popup__part-1 van-hairline--bottom">
          <div class="shopDrugSpec__popup__part-1__close-icon">
            <van-icon name="close" size="3em" color="#13C1FE"
                      @click="show = false"/>
          </div>
          <div class="shopDrugSpec__popup__part-1__left">
            <img v-lazy="getImgURL(shopDrugSpec.drugLogo,'LARGE_LOGO')" class="shopDrugSpec__popup__part-1__left-logo"/>
          </div>
          <div class="shopDrugSpec__popup__part-1__right">
            <div class="shopDrugSpec__popup__part-1__right-name">
              {{shopDrugSpec.name}}
            </div>
            <div class="shopDrugSpec__popup__part-1__right-price">
              &yen;{{shopDrugSpec.price}}
            </div>
          </div>
        </div>
        <div class="shopDrugSpec__popup__part-2">
          <div class="shopDrugSpec__popup__part-2__left">
            购买数量
          </div>
          <div class="shopDrugSpec__popup__part-2__right">
            <new-stepper
              v-model="number"
              :min="1"
              :step="1"
            />
          </div>
        </div>
        <div class="shopDrugSpec__popup__part-3">
          <van-button size="large" @click="onConfirm" :loading="loading">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .shopDrugSpec {
    background-color: #f5f5f5;
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
          background:#13C1FE;
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
          background-color: #13C1FE;
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
        justify-content: space-between;
        align-items: center;
        &__item {
          &:last-child {
            max-width: 300px;
          }
          &:first-child {
            max-width: 300px;
          }
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            font-size: 20px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
          }
          span:first-child {
            color: #13C1FE;
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
              color: #13C1FE;
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
                color: #F02B2B;
              }
            }
          }
        }
        &__footer {
          padding: 30px 0;
          &-button {
            width: 450px;
            height: 50px;
            background-color: #13C1FE;
            border-radius: 25px;
            margin: 0 auto;
            font-size: 24px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #FFFFFF;
            text-align: center;
            line-height: 50px;
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
<script>
  export default {
    data() {
      return {
        shopDrugSpec: {
          shopTotalAppraise: {},
          drugAppraises: {}
        },
        show: false,
        type: 0,
        number: 1,
        collected: false,
        loading: false,
        shopDrugId: this.$route.query.shopDrugId
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      onChat() {
        this.$dialog.alert({message: '打电话给110'}).then(() => {
          window.location.href = 'tel:110';
        });
      },
      async initData() {
        this.shopDrugSpec = await this.$http.get(`/shopDrugSpecs/${this.shopDrugId}`);
        this.collected = await this.$http.get(`/collects/drug/one?shopDrugId=${this.shopDrugSpec.id}`);
      },
      async onCollect() {
        let data = {
          'shopId': this.shopDrugSpec.shopId,
          'drugId': this.shopDrugSpec.drugId,
          'shopDrugId': this.shopDrugSpec.id,
          'collected': !this.collected
        };
        await this.$http.post('/collects/drug', data);
        this.collected = !this.collected;
        if (this.collected) {
          this.$toast('收藏成功');
        } else {
          this.$toast('取消收藏成功');
        }
      },
      async onConfirm() {
        this.loading = true;
        if (this.type === 0) {
          const data = [{
            shopId: this.shopDrugSpec.shopId,
            drugId: this.shopDrugSpec.drugId,
            shopDrugId: this.shopDrugSpec.id,
            quantity: this.number
          }];
          await this.$http.post('/carts', data);
          this.loading = false;
          this.$toast('加入购物车成功');
          this.show = false;
        } else {
          let drugInfoList = [];
          drugInfoList.push({
            shopDrugId: this.shopDrugSpec.id,
            quantity: this.number
          });
          let data = {
            'shopId': this.shopDrugSpec.shopId,
            'shopName': this.shopDrugSpec.shopName,
            'orderShopDrugSpecInfoDTOList': drugInfoList,
            'type': 'SIMPLE'
          };
          this.$router.push('/orders/create/fromShop?orderShopDrugSpecDTO=' + JSON.stringify(data));
        }
      }
    }
  };
</script>

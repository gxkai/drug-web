<template>
  <div>
    <new-layout>
      <template slot="center" style="position: relative">
        <van-tabs v-model="active">
          <van-tab title="商品">
            <div class="wrapper">
              <div class="wrapper1">
                <van-swipe :autoplay="3000">
                  <van-swipe-item v-for="(fileId,index) in shopDrug.fileIds" :key="index">
                    <img v-lazy="getImgURL(fileId,'LARGE_PIC')" class="swipe__image"/>
                  </van-swipe-item>
                </van-swipe>
              </div>
              <div class="wrapper2">
                  <new-wing-blank class="content1">
                    <p class="price">
                      {{`&yen;${shopDrug.price}`}}
                    </p>
                    <p class="name">
                      {{`${shopDrug.name}`}}
                    </p>
                    <p class="introduce">
                      {{`${shopDrug.introduce||'暂无介绍'}`}}
                    </p>
                  </new-wing-blank>
                  <new-wing-blank class="content2">
                    <div class="item1">
                      <div>
                        国药准字：
                      </div>
                      <div>
                        剂型/型号：
                      </div>
                      <div>
                        包装规格：
                      </div>
                    </div>
                    <div class="item2">
                      <div>
                        {{`${shopDrug.sfda||'暂无介绍'}`}}
                      </div>
                      <div>
                        {{`${shopDrug.form||'暂无介绍'}`}}
                      </div>
                      <div>
                        {{`${shopDrug.spec||'暂无介绍'}`}}
                      </div>
                    </div>
                  </new-wing-blank>
              </div>
              <div class="wrapper3">
                  <new-wing-blank class="content1">
                    <div class="item1">
                      <img v-lazy="getImgURL(shopDrug.shopLogo,'LARGE_LOGO')"/>
                    </div>
                    <div class="item2">
                        <span class="name van-ellipsis">
                          {{shopDrug.shopName}}
                        </span>
                    </div>
                    <div class="item3">
                        <span class="name"
                              @click="$router.push({name:'/shops/view',params:{shopId:shopDrug.shopId}})"
                        >进入药店</span>
                    </div>
                  </new-wing-blank>
                  <div class="content2">
                    <div class="item">
                      <div class="name">
                        客户服务
                      </div>
                      <div class="score">
                        ----
                      </div>
                    </div>
                    <div class="item">
                      <div class="name">
                        发货速度
                      </div>
                      <div class="score">
                        ----
                      </div>
                    </div>
                    <div class="item">
                      <div class="name">
                        物流速度
                      </div>
                      <div class="score">
                        ----
                      </div>
                    </div>
                    <div class="item">
                      <div class="name">
                        商品包装
                      </div>
                      <div class="score">
                        ----
                      </div>
                    </div>
                  </div>
              </div>
              <div class="wrapper4">
                  <new-wing-blank class="content1">
                    <div class="name">
                      顾客评价({{shopDrug.drugAppraises.total}})
                    </div>
                    <div class="link"  @click="active=2">
                      查看全部评价>
                    </div>
                  </new-wing-blank>
                  <new-wing-blank class="content2">
                    <div  v-for="(drugAppraise, index) in shopDrug.drugAppraises.list" :key="index" class="item">
                      <header>
                        <new-star :score="drugAppraise.score" size="small" disabled/>
                        <span class="username">{{drugAppraise.username|asterisk}}</span>
                      </header>
                      <article>
                        {{drugAppraise.content||'没有评论内容'}}
                      </article>
                      <footer>
                        {{timeConvert(drugAppraise.createdDate)}}
                      </footer>
                    </div>
                  </new-wing-blank>
              </div>
            </div>
          </van-tab>
          <van-tab title="详情">
            <component is="info" :shopDrug="shopDrug"></component>
          </van-tab>
          <van-tab title="评价">
            <component is="appraise" :shopDrug="shopDrug"></component>
          </van-tab>
        </van-tabs>
        <new-white-space size="2em"/>
        <van-icon name="arrow-left" class="arrow-left" size="3.5em" @click.native="$router.go(-1)"/>
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
      <div class="popup-wrapper">
        <new-wing-blank class="content1">
          <div class="item1">
            <img v-lazy="getImgURL(shopDrug.drugLogo,'LARGE_LOGO')"/>
          </div>
          <div class="item2">
            <div class="name text van-ellipsis">
              {{shopDrug.name}}({{shopDrug.stock}})
            </div>
            <div class="price text van-ellipsis">
              &yen;{{shopDrug.price}}
            </div>
          </div>
          <div class="item3">
            <van-icon name="close" size="3em" color="#F60000" @click="show = false"/>
          </div>
        </new-wing-blank>
        <new-white-space size="2em"/>
        <new-wing-blank class="content2">
          <div class="name">
            购买数量
          </div>
          <new-stepper v-model="number" :min="1" :max="shopDrug.stock"/>
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
  </div>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-icon-shoucang1 {
    color: red!important;
  }
</style>
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
  /deep/ .van-swipe__indicator {
    background-color: $themeColor!important;
  }
  .arrow-left {
    position: absolute;
    left: 10px;
    top: 30px;
    z-index: 999;
  }

  .swipe__image {
    width: 720px;
    height: 500px;
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
  .wrapper {
    width: 720px;
    display: grid;
    grid-row-gap: 20px;
    .wrapper4 {
      width: 720px;
      background-color: white;
      .content1 {
        display: flex;
        justify-content: space-between;
        border-bottom: 1PX solid #999999;
        .name {
          font-size: 25px;
          color: #999999;
        }
        .link {
          font-size: 25px;
        }
      }
      .content2 {
        .item {
          margin-top: 10px;
          border-bottom: 1PX solid #999999;
          header {
            display: flex;
            justify-content: space-between;
            .username {
              font-size: 25px;
            }
          }
          article {
            font-size: 20px;
            margin: 10px 0;
          }
          footer{
            font-size: 15px;
            color: #999999;
          }
        }
      }
    }
    .wrapper3 {
      background-color: white;
      width: 720px;
      .content1 {
        display: grid;
        grid-template-columns: 150px 400px  150px;
        border-bottom: 1PX solid #999999;
        .item1 {
          img {
            width: 100px;
            height: 100px;
          }
        }
        .item2 {
          display: flex;
          align-items: center;
          .name {
            font-size: 30px;
          }
        }
        .item3 {
          display: flex;
          align-items: center;
          .name {
            font-size: 25px;
            background-color: $themeColor;
            color: white;
            padding: 3px 10px;
            border-radius: 3em;
          }
        }
      }
      .content2 {
        display: grid;
        grid-template-columns: 180px 180px 180px 180px;
        .item {
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .name {
            font-size: 25px;
          }
          .score {
            font-size: 25px;
            color: $themeColor;
          }
        }
      }
    }
    .wrapper2 {
      background-color: white;
      width: 720px;
      .content1 {
        border-bottom: 1Px solid #999999;
        .price {
          font-size: 30px;
          color: $themeColor;
        }
        .name {
          font-size: 30px;
          font-weight: 100;
        }
        .introduce {
          font-size: 25px;
          color: #999999;
        }
      }
      .content2 {
        display: grid;
        grid-template-columns: 150px auto;
        .item1 {
          &>div {
            font-size: 25px;
            margin-top: 20px;
            color: #999999;
          }
        }
        .item2 {
          &>div {
            font-size: 25px;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
<script>
  import appraise from './appraise';
  import info from './info';
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
        pharmacist: '',
        active: 0
      };
    },
    components: {
      appraise,
      info
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

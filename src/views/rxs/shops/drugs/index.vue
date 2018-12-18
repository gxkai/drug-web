<template>
  <div class="rx">

    <new-layout>
      <template slot="top">
        <van-nav-bar
          :title="$route.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center">

        <div class="rx__content">
          <div class="rx__content__item"
               v-for="(drug,index) in drugs" :key="index">

            <div class="rx__content__item--content">
              <div class="rx__content__item--content__left">
                <!--<div class="rx_mark"-->
                     <!--v-if="!carts[index].otc">处-->
                <!--</div>-->
                <img v-lazy="getImgURL(carts[index].fileId, 'LARGE_LOGO')"
                     class="rx__content__item--content__left-logo">
              </div>
              <div class="rx__content__item--content__right">
                <div class="rx__content__item--content__right-originName"
                     @click="lookMore(index)"
                >
                  <!--<van-icon name="changfang" color="#13C1FE" size="3em"></van-icon>-->
                  <span>名称 : </span>
                  <!--<span>{{carts[index].originName}}</span>-->
                  <span>抗骨质增生丸-({{carts[index].spec}})</span>
                </div>
                <div class="rx__content__item--content__right-spec">
                  <!--<van-icon name="yaopinshuju" color="#13C1FE" size="3em"></van-icon>-->
                  <span>用量 : </span>
                  <span>一次一颗/一日三次</span>
                </div>

                <div class="rx__content__item--content__right-originName"
                     @click="lookMore(index)"
                >
                  <!--<van-icon name="changfang" color="#13C1FE" size="3em"></van-icon>-->
                  <span>厂商 : </span>
                  <span>{{carts[index].originName}}</span>
                </div>

                <div class="rx__content__item--content__right-price">
                  <!--<van-icon name="qian" color="#13C1FE" size="3em"></van-icon>-->
                  <!--<span>最低价</span>-->
                  <span>&yen;{{ carts[index].price }}</span>
                  <span>( 医保报销金额&yen;10.2 )</span>
                  <!--<span>X{{carts[index].quantity}}</span>-->
                </div>
              </div>
            </div>
            <van-collapse v-model="activeNames" class="rx__content__item--companies">
              <van-collapse-item
                title = "4个厂商报价"
                :name = index
                icon = "dianpu-copy"
              >
                <div class="rx__popup">
                  <div class="rx__popup__content">
                    <div class="rx__popup__content__item van-hairline--bottom"
                       v-for="(origin,key) in origins"
                       :key="key"
                       @click="choose(key)">
                      <div class="rx__popup__content__item__left">
                        <new-radio v-model="carts[index].drugSpecId" disabled></new-radio>
                        <span :style="{color: origin.drugSpecId === carts[index].drugSpecId ? '#12C1FF' : 'black'}">
                          {{origin.originName}}
                        </span>
                      </div>
                      <span>
                        &yen;{{origin.price}}
                      </span>
                    </div>
                  </div>
                </div>

              </van-collapse-item>
            </van-collapse>
            <!--<div class="rx__content__item&#45;&#45;title">-->
              <!--<div class="rx__content__item&#45;&#45;title__left">-->
                <!--<van-icon name="yao" color="#13C1FE" size="3em"></van-icon>-->
                <!--<span>{{carts[index].name}}</span>-->
              <!--</div>-->
              <!--<div class="rx__content__item&#45;&#45;title__right"-->
                   <!--@click="lookMore(index)"-->
              <!--&gt;-->
                <!--选择厂商-->
              <!--</div>-->
            <!--</div>-->
          </div>


        </div>
        <div class="rx__content__total">
          <van-icon name="qian" color="#F60032" size="4em"></van-icon>
          <div class="total--prices">
            <span class="ml-l-10">总计{{quantity}}件商品：</span>
            <span>共计</span>
            <span class="price ml-l-5">&yen;{{toFixedTwo(amount)}}</span>
            <span class="ml-l-20">医保扣除</span>
            <span class="price ml-l-5">&yen;0</span>
            <p class="remark">（ 实际医保报销金额, 请以提交订单显示为准。）</p>
          </div>

        </div>
      </template>
      <template slot="bottom">
        <van-goods-action>
          <van-goods-action-mini-btn icon="shop" text="药店" :to="{path:'/shops/view',query:{shopId:shopId}}"/>
          <van-goods-action-mini-btn icon="cart" text="购物车" to="/carts"/>
          <van-goods-action-big-btn class="add-to-cart" text="加入购物车" @click="type==='HOSPITAL'? '' : createCart()"
                                    :style="{backgroundColor:type==='HOSPITAL'?'gray':'#13C1FE'}"/>
          <van-goods-action-big-btn class="buy-now" text="立即购买" primary @click="onBuy"/>
        </van-goods-action>
      </template>
    </new-layout>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
        shopId: this.$route.query.shopId,
        shopName: this.$route.query.shopName,
        type: this.$route.query.type,
        drugs: [],
        show: false,
        origins: [],
        index: 0,
        carts: [],
        isActive: true,
        amount: 0,
        quantity: 0,
        activeNames: []
      };
    },
    computed: {
      account() {
        return this.$store.getters.account;
      }
    },
    created() {
      this.getDrugs();
    },
    mounted() {
    },
    methods: {
      async getDrugs() {
        this.drugs = await this.$http.get('/rxs/' + this.rxId + '/shops/' + this.shopId + '/drugs');
        this.initCart();
      },
      lookMore(index) {
        this.origins = this.drugs[index].drugs;
        this.index = index;
        this.show = true;
        this.isActive = !this.isActive;
      },
      takeUp() {
        this.show = !this.show;
        this.isActive = !this.isActive;
      },
      initCart() {
        this.drugs.forEach(drug => {
          this.carts.push({
            accountId: this.account.id,
            shopId: this.shopId,
            rxId: this.rxId,
            drugId: drug.drugs[0].drugId,
            shopDrugId: drug.drugs[0].shopDrugId,
            name: drug.name,
            spec: drug.spec,
            price: drug.drugs[0].price,
            quantity: drug.quantity,
            fileId: drug.drugs[0].fileId,
            otc: drug.otc,
            originName: drug.drugs[0].originName,
            rxItemId: drug.rxItemId
          });
        });
        this.carts.forEach(e => {
          this.amount += e.price * e.quantity;
          this.quantity += e.quantity;
        });
      },
      choose(index) {
        let cart = this.carts[this.index];
        cart.drugId = this.origins[index].drugId;
        cart.shopDrugId = this.origins[index].shopDrugId;
        cart.price = this.origins[index].price;
        cart.fileId = this.origins[index].fileId;
        cart.originName = this.origins[index].originName;
        this.amount = 0;
        this.quantity = 0;
        this.carts.forEach(e => {
          this.amount += e.price * e.quantity;
          this.quantity += e.quantity;
        });
        this.show = !this.show;
        this.isActive = !this.isActive;
      },
      async createCart() {
        await this.$http.post('/carts', this.carts);
        this.$toast('加入成功');
      },
      async onBuy() {
        let json = {
          'rxId': this.rxId,
          'shopId': this.shopId,
          'shopName': this.shopName,
          'type': this.type,
          'orderShopDrugSpecInfoDTOList': this.carts
        };
        // await this.$http.post('orders/shop/pre-close', json);
        this.$router.push('/orders/create/fromShop?orderShopDrugSpecDTO=' + JSON.stringify(json));
      }
    }
  };
</script>

<style scope type="text/scss" lang="scss">

  .van-cell__left-icon{
    color: #F60032;
    font-size: 32px !important;
  }
  .van-cell__right-icon{
    font-size: 30px !important;
  }

  .van-cell__title span{
    padding-left: 15px;
    font-size: 28px !important;
  }
  .van-goods-action-mini-btn__icon{
    font-size: 35px;
    color: #000;
    padding-bottom: 3px;
  }
  .buy-now{
    background: #F02B2B;
    border-color: #F02B2B;
  }
  .add-to-cart{
    border-color: #13C1FE;
  }


  .text-a6a6a6 {
    color: #a6a6a6;
  }

  .rx {
    &__content {
      &__item {
        background-color: white;
        margin-top: 20px;
        &--title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          width: 680px;
          margin: 0 auto;
          border-bottom: dashed 2PX rgba(18,193,255,1);
          &__left {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span {
              font-size:28px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(0,0,0,1);
            }
          }
          &__right {
            font-size:18px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
            text-align: center;
            width:130px;
            height:40px;
            line-height: 40px;
            background:rgba(18,193,255,1);
            box-shadow:0px 3px 2px 0px rgba(22,157,204,1);
            border-radius:17px;
          }
        }
        &--content {
          display: flex;
          padding: 20px 0;
          margin: 20px 20px 0 20px;
          border-bottom: 1px solid #EEE;
          &__left {
            position: relative;
            padding-right: 20px;
            &-logo {
              width: 200px;
              height: 200px;
            }
          }
          &__right {
            padding-left: 20px;
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            & > div {
              padding: 2px 0;
              display: flex;
              align-items: baseline;
              & > span {
                font-size: 25px;
                font-family: HiraginoSansGB-W3;
                font-weight: normal;
                color: #000000;
                display: inline-block;
                padding-left: 10px;
                &:nth-of-type(1) {
                  width: 80px;
                }
                &:nth-of-type(2) {
                  width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
            &-price {
              & > span {
                &:first-child {
                  width: auto !important;
                  color: #F00;
                  font-size: 30px;
                }
                &:nth-child(2) {
                  color: #777;
                  font-size: 25px;
                }
              }
            }
          }
        }
      }
      &__total {
        padding: 0 20px 20px;
        margin-top: 20px;
        display: flex;
        align-items: baseline;
        background: #FFF;
        .total--prices{
          span {
            font-size: 28px;
            &.ml-l-10 {
              font-size: 30px;
            }
            &.price {
              font-size: 30px;
              color: #F00;
            }
          }

          p.remark{
            font-size: 25px;
            color: #777;
            padding-top: 5px;
          }
        }
      }
    }
    &__popup {
      height: 50vh;
      &__header {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        align-items: center;
        &__left {
          span {
            font-size:26px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(0,0,0,1);
          }
        }
      }
      &__content {
        padding: 20px 40px;
        &__header {
          display: flex;
          justify-content: space-between;
          span {
            font-size: 28px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #13C1FE;
          }
        }
        &__item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          &__left {
            display: flex;
            align-items: center;
            span {
              margin-left: 10px;
            }
          }
          span {
            font-size: 28px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            display: inline-block;
            &:first-child {
              width: 400px;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              line-clamp: 2;
            }
            &:last-child {
              color: #FF0000;
            }
          }
        }
      }
    }
  }
</style>

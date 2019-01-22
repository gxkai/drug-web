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
                <div class="rx__content__item--content__right-medicine-Name">
                  <!--<van-icon name="changfang" color="#F60000" size="3em"></van-icon>-->
                  <span>名称 : </span>
                  <!--<span>{{carts[index].originName}}</span>-->
                  <span class="ml-l-10">{{carts[index].name}}-({{carts[index].spec}})</span>
                  <span class="num">X{{carts[index].quantity}}</span>
                </div>
                <div class="rx__content__item--content__right-spec">
                  <!--<van-icon name="yaopinshuju" color="#F60000" size="3em"></van-icon>-->
                  <span>用量 : </span>
                  <span class="ml-l-10">{{ carts[index].usage }}</span>
                </div>

                <div class="rx__content__item--content__right-originName">
                  <!--<van-icon name="changfang" color="#F60000" size="3em"></van-icon>-->
                  <span>厂商 : </span>
                  <span class="ml-l-10">{{carts[index].originName}}</span>
                </div>

                <div class="rx__content__item--content__right-price">
                  <!--<van-icon name="qian" color="#F60000" size="3em"></van-icon>-->
                  <!--<span>最低价</span>-->
                  <span>&yen;{{ carts[index].price }}</span>
                  <span class="ml-l-10">( 医保报销金额 <span style="font-size: 1em">&yen;{{ carts[index].medicaidPrice }}</span> )</span>
                </div>
              </div>
            </div>
            <van-collapse v-model="activeNames" class="rx__content__item--companies">
              <van-collapse-item
                :name = index
                icon = "dianpu-copy"
              >
                <div slot="title" class="slot__title">
                  <span class="vendor__count">{{ drugs[index].drugs.length }}个</span>
                  厂商报价
                </div>
                <ul class="vendor__list">
                  <li
                    v-for="(origin,key) in drugs[index].drugs"
                    :key="key"
                    @click="origin.flag && choose(key,index)">

                    <div
                        :class="{vendor__checked: key === origin.selectedKey}"
                        @click="changeVendor(index, key)"
                      >
                      <!--<span :style="{color: origin.drugSpecId === carts[index].drugSpecId ? '#12C1FF' : 'black'}">-->
                        <!--{{origin.originName}}-->
                      <!--</span>-->

                      <van-icon class="ml-l-10" name="radiobox" v-show="!(key === origin.selectedKey)"/>
                      <van-icon class="ml-l-10" name="radiochecked" v-show="key === origin.selectedKey"/>
                      <span class="ml-l-20">{{origin.originName}}</span>
                      <span>&yen;{{origin.price}}</span>
                    </div>
                    <p class="remark vendor__remark">
                      ( 医保报销金额 &yen;{{ origin.medicaidPrice }} )
                    </p>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </template>
      <template slot="bottom">
        <div class="rx__content__total">
          <van-icon name="qian" color="#F60032" size="4em"></van-icon>
          <div class="total--prices">
            <span class="ml-l-10">总计{{quantity}}件商品 : </span>
            <span>共计</span>
            <span class="price">&yen;{{toFixedTwo(amount)}}</span>
            <span class="ml-l-8">医保扣除</span>
            <span class="price">&yen;{{toFixedTwo(totalMedicaidPrice)}}</span>
            <p class="remark">（ 实际医保报销金额, 请以提交订单显示为准。）</p>
          </div>
        </div>
        <van-goods-action style="position: static">
          <van-goods-action-mini-btn icon="shop" text="药房" :to="{path:'/shops/view',query:{shopId:shopId}}"/>
          <van-goods-action-mini-btn icon="cart" text="购物车" to="/carts"/>
          <van-goods-action-big-btn class="add-to-cart" text="加入购物车" @click="type==='HOSPITAL'? '' : createCart()"
                                    :style="{backgroundColor:type==='HOSPITAL'?'gray':'#ff976a'}"/>
          <van-goods-action-big-btn class="buy-now" text="立即购买" primary @click="onBuy"/>
        </van-goods-action>
      </template>
    </new-layout>
  </div>
</template>

<script>
  import { getAccount } from '@/storage';

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
        totalMedicaidPrice: 0,
        activeNames: ['0'],
        account: getAccount()
      };
    },
    computed: {
    },
    created() {
      this.getDrugs();
    },
    mounted() {
    },
    methods: {

      changeVendor(index, key) {
        this.drugs[index].drugs.forEach(item => {
          item.selectedKey = '';
        });
        this.drugs[index].drugs[key].selectedKey = key;
        this.drugs[index].drugs[key].flag = true;
      },
      async getDrugs() {
        this.drugs = await this.$http.get('/rxs/' + this.rxId + '/shops/' + this.shopId + '/drugs');
        this.initCart();
      },
      initCart() {
        this.drugs.forEach(drug => {
          drug.drugs.forEach(origin => {
            origin.selectedKey = 0;
            origin.flag = false;
            console.log(origin);
          });
          this.carts.push({
            accountId: this.account.id,
            shopId: this.shopId,
            rxId: this.rxId,
            drugId: drug.drugs[0].drugId,
            shopDrugId: drug.drugs[0].shopDrugId,
            name: drug.name,
            spec: drug.spec,
            usage: drug.usage,
            price: drug.drugs[0].price,
            quantity: drug.quantity,
            fileId: drug.drugs[0].fileId,
            otc: drug.otc,
            originName: drug.drugs[0].originName,
            rxItemId: drug.rxItemId,
            medicaidPrice: drug.drugs[0].medicaidPrice
          });
          this.totalMedicaidPrice += drug.drugs[0].medicaidPrice;
        });
        this.carts.forEach(e => {
          this.amount += e.price * e.quantity;
          this.quantity += e.quantity;
        });
        console.log(this.totalMedicaidPrice);
      },
      choose(key, index) {
        let cart = this.carts[index];
        cart.drugId = this.drugs[index].drugs[key].drugId;
        cart.shopDrugId = this.drugs[index].drugs[key].shopDrugId;
        cart.price = this.drugs[index].drugs[key].price;
        cart.fileId = this.drugs[index].drugs[key].fileId;
        cart.originName = this.drugs[index].drugs[key].originName;
        cart.medicaidPrice = this.drugs[index].drugs[key].medicaidPrice;
        this.amount = 0;
        this.quantity = 0;
        this.totalMedicaidPrice = 0;
        this.totalMedicaidPrice += this.drugs[index].drugs[key].medicaidPrice;
        this.carts.forEach(e => {
          this.amount += e.price * e.quantity;
          this.quantity += e.quantity;
        });
      },
      async createCart() {
        this.$toast.loading({duration: 0, forbidClick: true});
        await this.$http.post('/carts', this.carts);
        this.$toast('加入成功');
      },
      async onBuy() {
        let json = {
          'rxId': this.rxId,
          'shopId': this.shopId,
          'shopName': this.shopName,
          'type': this.type,
          'drugs': this.carts
        };
        this.$toast.loading({duration: 0, forbidClick: true});
        const shopDrugSpecOrderDTO = await this.$http.post('orders/shop/preClose', json);
        this.$toast.clear();
        this.$router.push({ path: '/orders/create/fromShop', query: { orderShopDrugSpecDTO: JSON.stringify(json), shopDrugSpecOrderDTO: JSON.stringify(shopDrugSpecOrderDTO) } });
      }
    }
  };
</script>

<style scope type="text/scss" lang="scss">
  p.remark{
    font-size: 25px;
    color: #777;
    padding-top: 5px;
  }

  .slot__title{
    font-size: 26px !important;
  }

  .vendor{
    &__list{
      li{
        list-style: none;
        padding: 15px 0;
        &:not(:last-child){
          border-bottom: 1px solid #EEE;
        }
        span{
          font-size: 26px;
          vertical-align: middle;
          &:last-child{
            float: right;
          }
        }
        .van-icon{
          font-size: 20px;
          /*vertical-align: middle;*/

          &-radiochecked{
            color: $themeColor;
          }
        }
      }
    }
    &__checked{
      pointer-events: none;
      span{
        color: #F00;
      }

    }
    &__remark{
      text-align: right;
    }
    &__count{
      color: $themeColor !important;
    }
  }

  .van-cell__left-icon{
    color: $themeColor;
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
    background: $themeColor;
    border-color: $themeColor;
  }
  .add-to-cart{
    border-color: #ff976a;
    background: #ff976a;
  }

  .text-a6a6a6 {
    color: #A6A6A6;
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
          /*border-bottom: 1px solid #EEE;*/
          position: relative;

          &__left {
            position: relative;
            padding-right: 20px;
            &-logo {
              width: 200px;
              height: 200px;
            }
          }
          &__right {
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
                color: #000;
                display: inline-block;
                padding-left: 10px;
                /*&:nth-of-type(1) {*/
                  /*width: 80px;*/
                /*}*/
                &:nth-of-type(2) {
                  width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                &.num{
                  color: $themeColor;
                  position: absolute;
                  right: 0;
                }
              }
            }
            &-price {
              & > span {
                &:first-child {
                  width: auto !important;
                  color: $themeColor;
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
        width: 100%;
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
              color: $themeColor;
            }
          }

        }
      }
    }
  }
</style>

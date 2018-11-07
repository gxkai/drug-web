<template>
  <div class="rx">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <van-popup v-model="show">
      <div class="rx__popup">
        <div class="rx__popup__header van-hairline--bottom">
          <div class="rx__popup__header__left">
            <van-icon name="changshangbaojia" color="#13C1FE" size="3em"/>
            <span>选择厂商</span>
          </div>
          <div class="rx__popup__header__right">
            <van-icon name="arrowdown" color="#13C1FE" size="3em"/>
          </div>
        </div>
        <div class="rx__popup__content">
          <div class="rx__popup__content__header van-hairline--bottom">
            <div class="rx__popup__content__header__left">
              <van-icon name="changfang" color="#13C1FE" size="3em"/>
              <span>厂商名称</span>
            </div>
            <div class="rx__popup__content__header__right">
              <van-icon name="jiage" color="#13C1FE" size="3em"/>
              <span>价格</span>
            </div>
          </div>
          <div class="rx__popup__content__item van-hairline--bottom"
               v-for="(origin,index) in origins"
               :key="index"
               @click="choose(index)">
            <span>
              {{origin.originName}}
            </span>
            <span>
              &yen;{{origin.price}}
            </span>
          </div>
        </div>
      </div>
    </van-popup>

    <div class="rx__content" ref="content">
      <div class="rx__content__item"
           v-for="(drug,index) in drugs" :key="index">
        <div class="rx__content__item__left">
          <div class="rx_mark"
               v-if="!carts[index].otc">处</div>
          <img  v-lazy="getImgURL(carts[index].fileId, 'LARGE_LOGO')"
          class="rx__content__item__left-logo">
        </div>
        <div class="rx__content__item__right">
          <div class="rx__content__item__right-originName"
               @click="lookMore(index)"
          >
            <van-icon name="changfang" color="#13C1FE" size="3em"></van-icon>
            <span>厂商</span>
            <span>{{carts[index].originName}}</span>
            <van-icon name="arrow"  size="2em"></van-icon>
          </div>
          <div class="rx__content__item__right-name">
            <van-icon name="yao" color="#13C1FE" size="3em"></van-icon>
            <span>名称</span>
            <span>{{carts[index].name}}</span>
          </div>
          <div class="rx__content__item__right-spec">
            <van-icon name="yaopinshuju" color="#13C1FE" size="3em"></van-icon>
            <span>规格</span>
            <span>{{carts[index].spec}}</span>
          </div>
          <div class="rx__content__item__right-price">
            <van-icon name="qian" color="#13C1FE" size="3em"></van-icon>
            <span>最低价</span>
            <span>&yen;{{carts[index].price}}</span>
            <span>X{{carts[index].quantity}}</span>
          </div>
        </div>
      </div>
      <div class="rx__content__total">
        <van-icon name="qian" color="#13C1FE" size="3em"></van-icon>
        <span class="ml-l-20">总计{{quantity}}件商品</span>
        <span class="ml-l-20">合计</span>
        <span class="ml-l-20">&yen;{{toFixedTwo(amount)}}</span>
      </div>
    </div>
    <van-goods-action
    ref="footer">
      <van-goods-action-mini-btn icon="cart" text="购物车" to="/carts" />
      <van-goods-action-mini-btn icon="shop" text="店铺" :to="{path:'/shops/view',query:{shopId:shopId}}"/>
      <!--<van-goods-action-big-btn text="加入购物车" @click="createCart()"-->
      <!--:style="{backgroundColor:type==='HOSPITAL'?'gray':'#f85'}"/>-->
      <van-goods-action-big-btn text="立即购买" primary @click="onBuy"/>
    </van-goods-action>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

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
        quantity: 0
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
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight -
      this.$refs.footer.$el.clientHeight) + 'px';
      this.$refs.content.style.overflow = 'auto';
    },
    methods: {
      getDrugs() {
        this.$http.get('/rxs/' + this.rxId + '/shops/' + this.shopId + '/drugs')
          .then(res => {
            console.log(res.data);
            this.drugs = res.data;
            this.initCart();
          }).catch(error => {
            this.exception(error);
          });
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
            drugSpecId: drug.drugs[0].drugSpecId,
            shopDrugSpecId: drug.drugs[0].shopDrugSpecId,
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
        cart.drugSpecId = this.origins[index].drugSpecId;
        cart.shopDrugSpecId = this.origins[index].shopDrugSpecId;
        cart.price = this.origins[index].price;
        cart.fileId = this.origins[index].fileId;
        cart.originName = this.origins[index].originName;
        this.amount = 0;
        this.carts.forEach(e => {
          this.amount += e.price * e.quantity;
          this.quantity += e.quantity;
        });
        this.show = !this.show;
        this.isActive = !this.isActive;
      },
      createCart() {
        this.$http.post('/carts', this.carts)
          .then(res => {
            Toast({
              message: '加入购物车成功',
              position: 'middle',
              duration: 2000
            });
          })
          .catch(err => {
            this.exception(err);
          });
      },
      onBuy() {
        let json = {
          'rxId': this.rxId,
          'shopId': this.shopId,
          'shopName': this.shopName,
          'type': this.type,
          'orderShopDrugSpecInfoDTOList': this.carts
        };
        this.$http.post('orders/shop/get', json)
          .then(res => {
            this.$router.push('/orders/create/fromShop?orderShopDrugSpecDTO=' + JSON.stringify(json));
          })
          .catch(err => {
            this.exception(err);
          });
      }
    }
  };
</script>

<style scope type="text/less" lang="less">
  @import "../../../../assets/less/index";
  .bg-red {
    background-color: red;
  }
  .text-a6a6a6 {
    color: #a6a6a6;
  }

  .rx {
    background-color: #f5f5f5;
    &__content{
      position: relative;
      &__item {
        background-color: white;
        margin-top: 20px;
        display: flex;
        &__left {
          position: relative;
          padding: 20px;
          &-logo {
            width: 200px;
            height: 200px;
          }
        }
        &__right {
          padding: 20px;
          &>div {
            padding: 2px 0;
            display: flex;
            align-items: baseline;
            &>span {
              font-size: 25px;
              font-family:HiraginoSansGB-W3;
              font-weight:normal;
              color: #000000;
              display: inline-block;
              padding-left: 10px;
              &:nth-of-type(1) {
                width: 100px;
              }
              &:nth-of-type(2) {
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          &-price {
            &>span {
              &:last-of-type {
                color: #FF0000;
              }
            }
          }
        }
      }
      &__total {
        padding: 20px;
        display: flex;
        align-items: baseline;
        span {
          &:not(:last-child) {
            font-size: 25px;
          }
          &:last-child {
            font-size: 30px;
            color: #FF0000;
          }
        }
      }
    }
    .van-popup {
      top: 30%;
    }
    &__popup {
      width: 680px;
      &__header {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        &__left {
          span {
            font-size: 30px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color: #000000;
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
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color: #13C1FE;
          }
        }
        &__item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          span {
            font-size: 28px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
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

<template>
  <new-layout class="cart" centerColor="white">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        right-text="删除"
        @click-left="$router.go(-1)"
        @click-right="onRemoveBatch()"
      />
    </template>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="cart-list">
          <new-no-data v-if="cartShops.length === 0"></new-no-data>
          <div v-for="(cartShop, cartShopIndex) in cartShops" :key="cartShopIndex">
            <div class="cart-list-shop"
                 @click="linkToShopView(cartShop.id)">
              <van-icon name="yaodian" size="4em"></van-icon>
              <div class="cart-list-shop_name" v-text="cartShop.shopName"></div>
            </div>
            <div v-for="(cartRx, cartRxIndex) in cartShop.rxs" :key="cartRxIndex">
              <div class="cart-list-rx"
                   v-if="isRx(cartRx.rxId)">
                <div class="cart-list-rx-left">
                  <div class="cart-list-rx-left_radio"
                       @click.stop="onRadio(RX,cartShop,cartRx)">
                    <new-radio :radio="cartRx.radio" size="3em"/>
                  </div>
                  <van-icon name="chufangdanluru" size="4em"></van-icon>
                  <div class="cart-list-rx-left_name">
                    处方单
                  </div>
                </div>
                <div class="cart-list-rx-right"
                     @click="linkToRxView(cartRx.rxId)">
                  查看处方&gt;
                </div>
              </div>
              <div class="cart-list-rx"
                   v-else>
                <div class="cart-list-rx-left">
                  <div class="cart-list-rx-left_radio"
                       @click.stop="onRadio(RX,cartShop,cartRx)">
                    <new-radio :radio="cartRx.radio" size="3em"/>
                  </div>
                  <van-icon name="jisongchufangdan" size="4em"></van-icon>
                  <div class="cart-list-rx-left_name">
                    非处方单
                  </div>
                </div>
              </div>
              <div class="cart-list-drugs">
                  <new-swipe-cell class="cart-list-drugs-item"  v-for="(cartDrug, cartDrugIndex) in cartRx.drugs"
                       :key="cartDrugIndex" @click-right = "onRemove(cartShop,cartShopIndex,cartRx,cartRxIndex,cartDrug,cartDrugIndex)">
                    <div class="cart-list-drugs-item-left">
                      <div class="cart-list-drugs-item-left_radio"
                           @click.stop="onRadio(DRUG,cartShop,cartRx,cartDrug)">
                        <new-radio :radio="cartDrug.radio" size="3em"/>
                      </div>
                      <div class="cart-list-drugs-item-left_logo"
                           @click="linkToShopDrugSpec(cartDrug.id)">
                        <div class="rx_mark"
                             v-if="!cartDrug.otc">
                          处
                        </div>
                        <img v-lazy="getImgURL(cartDrug.fileId,'LARGE_LOGO')">
                      </div>
                    </div>
                    <div class="cart-list-drugs-item-right">
                      <div>
                        <div class="cart-list-drugs-item-right_name">
                          {{cartDrug.name}}
                        </div>
                        <div class="cart-list-drugs-item-right_spec">
                          规格：{{cartDrug.spec}}
                        </div>
                      </div>
                      <div>
                        <div class="cart-list-drugs-item-right_price">
                          &yen;{{cartDrug.price}}
                        </div>
                        <div>
                      <span class="cart-list-drugs-item-right_quantity"
                            v-if="isRx(cartRx.rxId)">x{{cartDrug.quantity}}</span>
                          <new-stepper
                            v-model="cartDrug.quantity"
                            v-on:change="changeQuantity(cartDrug)"
                            v-else
                          />
                        </div>
                      </div>
                    </div>
                    <template slot="right">
                      删除
                    </template>
                  </new-swipe-cell>
              </div>
            </div>
            <van-submit-bar
              :price="cartShop.allPrice*100"
              :button-text="'结算('+cartShop.allQuantity+')'"
              @submit="onOrder(cartShop)"
              :loading="loading"
              :style="{'display': cartShop.rxs.length === 0 ? 'none':''}"
              style="position: static"
            >
            </van-submit-bar>
          </div>
        </div>
      </van-pull-refresh>
    </template>
    <template slot="bottom">
      <van-tabbar
        :value="3"
        :fixed="Boolean(false)"
      >
        <van-tabbar-item icon="icon"
                         to="/home">首页
        </van-tabbar-item>
        <van-tabbar-item icon="chufang"
                         to="/rxs">处方单
        </van-tabbar-item>
        <van-tabbar-item icon="fenlei"
                         to="/drugTypes">分类
        </van-tabbar-item>
        <van-tabbar-item icon="gouwuche2"
                         to="/carts">购物车
        </van-tabbar-item>
        <van-tabbar-item icon="wo"
                         to="/accounts">我
        </van-tabbar-item>
      </van-tabbar>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .van-tabbar-item--active {
    color: $themeColor !important;
  }
  .cart {
    &-list {
      width: 720px;
      margin-top: 20px;
      &-shop {
        width: 720px;
        padding: 20px 20px;
        display: flex;
        background-color: white;
        &_name {
          font-size: 30px;
          align-self: flex-end;
        }
      }
      &-rx {
        width: 720px;
        padding: 20px 20px;
        display: flex;
        align-items: center;
        background-color: white;
        justify-content: space-between;
        &-left {
          display: flex;
          align-items: center;
          &_name {
            font-size: 30px;
            align-self: flex-end;
          }
        }
        &-right {
          font-size: 30px;
          color: $themeColor;
        }
      }
      &-drugs {
        width: 720px;
        &-item {
          width: 720px;
          display: flex;
          background-color: #f5f5f5;
          margin-bottom: 10px;
          padding-left: 20px;
          &-left {
            display: flex;
            &_logo {
              padding: 20px;
              img {
                width: 200px;
                height: 200px;
              }
            }
          }
          &-right {
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 430px;
            & > div {
              &:nth-child(1) {
                & > div {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                }
              }
              &:nth-child(2) {
                display: flex;
                justify-content: space-between;
              }
            }
            &_name {
              font-size: 30px;
            }
            &_spec {
              font-size: 25px;
              color: #999999;
            }
            &_price {
              font-size: 30px;
              color: $themeColor;
            }
            &_quantity {
              font-size: 30px;
              color: #999999;
            }
          }
        }
      }
    }
    .van-submit-bar {
      bottom: 100px;
    }
  }
</style>
<script>
  export default {
    name: 'carts',
    data() {
      return {
        chooseAll: false,
        All: 'ALL',
        SHOP: 'SHOP',
        RX: 'RX',
        DRUG: 'DRUG',
        cartShops: [],
        loading: false,
        isLoading: false
      }
      ;
    },
    components: {},
    computed: {
      allPrice() {
        let sum = 0;
        this.cartShops.forEach(e => {
          e.rxs.forEach(e => {
            e.drugs.forEach(e => {
              if (e.radio) {
                sum += e.price * e.quantity;
              }
            });
          });
        });
        return sum;
      },
      allQuantity() {
        let sum = 0;
        this.cartShops.forEach(e => {
          e.rxs.forEach(e => {
            e.drugs.forEach(e => {
              if (e.radio) {
                sum += e.quantity;
              }
            });
          });
        });
        return sum;
      }
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async onRefresh() {
        await this.initData();
        this.isLoading = false;
      },
      async initData() {
        this.$toast.loading();
        const data = await this.$http.get('/carts');
        this.$toast.clear();
        data.cartShops.forEach(e => {
          e.allPrice = 0;
          e.allQuantity = 0;
          e.radio = false;
          e.rxs.forEach(e => {
            e.radio = false;
            e.drugs.forEach(e => {
              e.radio = false;
            });
          });
        });
        this.cartShops = data.cartShops;
      },
      changeQuantity(cartDrug) {
        this.$http.put(`/carts/${cartDrug.cartId}?quantity=${cartDrug.quantity}`);
      },
      /**
       * 单个删除
       */
      onRemove(cartShop, cartShopIndex, cartRx, cartRxIndex, cartDrug, cartDrugIndex) {
        if (cartRx.rxId !== '0') {
          this.$dialog.confirm({ message: '改处方单中药品会一起删除' }).then(async () => {
            let cartIds = [];
            cartRx.drugs.forEach(e => {
              cartIds.push(e.cartId);
            });
            await this.$http.delete('carts?cartIds=' + cartIds);
            cartShop.rxs.splice(cartRxIndex, 1);
            if (cartShop.rxs.length === 0) {
              this.cartShops.splice(cartShopIndex, 1);
            }
          });
        } else {
          this.$dialog.confirm({ message: '确定删除？' }).then(async () => {
            await this.$http.delete('carts/' + cartDrug.cartId);
            cartRx.drugs.splice(cartDrugIndex, 1);
            if (cartRx.drugs.length === 0) {
              cartShop.rxs.splice(cartRxIndex, 1);
              if (cartShop.rxs.length === 0) {
                this.cartShops.splice(cartShopIndex, 1);
              }
            }
          });
        }
      },
      /**
       * 批量删除
       */
      onRemoveBatch() {
        let cartIds = this.getCartIds();
        if (cartIds.length === 0) {
          this.$toast('请选择药品');
          return;
        }
        this.$dialog.confirm({ message: '确定删除?' }).then(async () => {
          const params = {
            cartIds: cartIds
          };
          await this.$http.delete('/carts', params);
          this.remove();
        });
      },
      /**
       * 通用删除方法
       */
      remove() {
        for (let i = this.cartShops.length; i > 0; i--) {
          for (let j = this.cartShops[i - 1].rxs.length; j > 0; j--) {
            for (let k = this.cartShops[i - 1].rxs[j - 1].drugs.length; k > 0; k--) {
              if (this.cartShops[i - 1].rxs[j - 1].drugs[k - 1].radio) {
                this.cartShops[i - 1].rxs[j - 1].drugs.splice(k - 1, 1);
              }
            }
            if (this.cartShops[i - 1].rxs[j - 1].drugs.length === 0) {
              this.cartShops[i - 1].rxs.splice(j - 1, 1);
            }
          }
          if (this.cartShops[i - 1].rxs.length === 0) {
            this.cartShops.splice(i - 1, 1);
          }
        }
      },
      /**
       * 获取已选购物车ID
       * @returns {Array}
       */
      getCartIds() {
        let cartIds = [];
        this.cartShops.forEach(e => {
          e.rxs.forEach(e => {
            e.drugs.forEach(e => {
              if (e.radio) {
                cartIds.push(e.cartId);
              }
            });
          });
        });
        return cartIds;
      },
      /**
       * 获取已选药房购物车ID
       */
      getShopCartIds(cartShop) {
        let cartIds = [];
        let rxDrugNum = 0;
        let nRxDrugNum = 0;
        cartShop.rxs.forEach(rx => {
          rx.drugs.forEach(drug => {
            if (drug.radio) {
              cartIds.push(drug.cartId);
              if (rx.rxId === '0') {
                rxDrugNum++;
              } else {
                nRxDrugNum++;
              }
            }
          });
        });
        if (rxDrugNum > 0 && nRxDrugNum > 0) {
          this.$toast('处方单药品和非处方单药品不能同时结算');
          return;
        }
        return cartIds;
      },
      /**
       * 订单结算
       */
      async onOrder(cartShop) {
        let cartIds = this.getShopCartIds(cartShop);
        if (cartIds.length === 0) {
          this.$toast('请选择药品');
          return;
        }
        let isRx = cartShop.rxs.some(rx => {
          return rx.rxId !== '0' && rx.radio === true;
        });
        this.$toast.loading({duration: 0, forbidClick: true, message: '结算中'});
        const data = await this.$http.get(`/orders/cart?cartIds=${cartIds}&isRx=${isRx}`);
        this.$toast.clear();
        this.$router.push({ name: '购物车结算', params: { cartShop: data, isRx: isRx } });
      },
      /**
       * 计算总价和总数
       */
      calculate(cartShop) {
        let allPrice = 0;
        let allQuantity = 0;
        cartShop.rxs.forEach(e => {
          e.drugs.forEach(e => {
            if (e.radio === true) {
              allPrice += e.price * e.quantity;
              allQuantity += e.quantity;
            }
          });
        });
        cartShop.allPrice = allPrice;
        cartShop.allQuantity = allQuantity;
      },
      /**
       * 选中raido
       * @param type
       * @param cartShop
       * @param cartRx
       * @param cartDrug
       */
      onRadio(type, cartShop, cartRx, cartDrug) {
        switch (type) {
          case 'RX':
            cartRx.radio = !cartRx.radio;
            cartRx.drugs.forEach(e => {
              e.radio = cartRx.radio;
            });
            if (cartShop.rxs.some(e => {
              return e.radio === !cartRx.radio;
            })) {
              cartShop.radio = cartRx.radio;
            }
            break;
          case 'DRUG':
            cartDrug.radio = !cartDrug.radio;
            if (cartRx.rxId !== '0') {
              cartRx.drugs.forEach(e => {
                e.radio = cartDrug.radio;
              });
              cartRx.radio = cartDrug.radio;
              if (cartShop.rxs.some(e => {
                return e.radio === !cartDrug.radio;
              }) === false) {
                cartShop.radio = cartDrug.radio;
              }
            } else {
              if (cartRx.drugs.some(e => {
                return e.radio === !cartDrug.radio;
              }) === false) {
                cartRx.radio = cartDrug.radio;
                if (cartShop.rxs.some(e => {
                  return e.radio === !cartDrug.radio;
                }) === false) {
                  cartShop.radio = cartDrug.radio;
                }
              }
            }
        }
        this.calculate(cartShop);
      }
    }
  };
</script>


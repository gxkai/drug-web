<template>
  <new-layout class="cart" centerColor="white">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        :right-text="cartShops.length === 0 ? '': '删除'"
        @click-left="$router.go(-1)"
        @click-right="onRemoveBatch()"
      />
    </template>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="cart">
          <new-white-space/>
          <div v-for="(cartShop, cartShopIndex) in cartShops" :key="cartShopIndex">
            <div class="shop"  @click="linkToShopView(cartShop.id)">
              <van-icon name="yaodian" size="4em"></van-icon>
              <span class="shop__name" v-text="cartShop.shopName"></span>
            </div>
            <div v-for="(cartRx, cartRxIndex) in cartShop.rxs" :key="cartRxIndex">
              <div class="rx" v-if="isRx(cartRx.rxId)">
                <div class="rx__left">
                  <new-radio :radio="cartRx.radio" size="2.5em"  @click.native.stop="onRadio(RX,cartShop,cartRx)"/>
                  <van-icon name="chufangdanluru" size="4em"></van-icon>
                </div>
                <div @click="linkToRxView(cartRx.rxId)" class="rx__name">
                  查看处方&gt;
                </div>
              </div>
              <div class="rx" v-else>
                <div class="rx__left">
                  <new-radio :radio="cartRx.radio" size="2.5em" @click.native.stop="onRadio(RX,cartShop,cartRx)"/>
                  <van-icon name="jisongchufangdan" size="4em"></van-icon>
                </div>
              </div>
              <div class="drug">
                  <new-swipe-cell   v-for="(cartDrug, cartDrugIndex) in cartRx.drugs"
                       :key="cartDrugIndex" @click-right = "onRemove(cartShop,cartShopIndex,cartRx,cartRxIndex,cartDrug,cartDrugIndex)">
                    <div class="drug__item">
                      <div class="drug__item1">
                        <new-radio :radio="cartDrug.radio" size="2.5em"  @click.native.stop="onRadio(DRUG,cartShop,cartRx,cartDrug)"/>
                      </div>
                      <div class="drug__item2" @click="linkToShopDrugSpec(cartDrug.id)">
                        <div class="drug__image">
                        <van-tag type="danger" round v-if="!cartDrug.otc" class="drug__tag">处</van-tag>
                        <img v-lazy="getImgURL(cartDrug.fileId,'LARGE_LOGO')">
                        </div>
                      </div>
                      <div class="drug__item3" @click="linkToShopDrugSpec(cartDrug.id)">
                        <div class="drug__name">{{cartDrug.name}}</div>
                        <div class="drug__spec"> 规格：{{cartDrug.spec}}</div>
                      </div>
                      <div class="drug__item4">
                        <span class="drug__price"> &yen;{{cartDrug.price}}</span>
                        <span v-if="isRx(cartRx.rxId)" class="drug__quantity">x{{cartDrug.quantity}}</span>
                        <new-stepper
                          v-model="cartDrug.quantity"
                          v-on:change="changeQuantity(cartDrug, cartShop)"
                          v-else
                        />
                      </div>
                    </div>
                    <template slot="right">
                      删除
                    </template>
                  </new-swipe-cell>
              </div>
            </div>
            <new-white-space/>
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
  /deep/ .van-tag {
    font-size: 20px!important;
    padding: 5px 20px;
    margin-left: 10px;
  }
  /**
  药品标签
   */
  .drug{
    &__tag {
      position: absolute;
      top: 0;
    }
    &__image {
      position: relative;
      img {
        width: 180px;
      }
    }
    &__name {
      font-size: 30px;
    }
    &__spec {
      font-size: 25px;
      color: #999999;
    }
    &__price {
      font-size: 30px;
      color: $themeColor;
    }
    &__quantity {
      font-size: 30px;
      color: #999999;
    }
    &__item {
      width: 720px;
      padding: 5px 20px;
      display: grid;
      grid-template-columns: 50px 200px auto;
      grid-template-rows: 180px auto;
    }
    &__item1 {
      grid-row: 1/3;
      grid-column: 1/2;
      display: flex;
      align-items: center;
    }
    &__item2 {
      grid-row: 1/3;
      grid-column: 2/3;
      display: flex;
      align-items: center;
    }
    &__item3 {
      grid-row: 1/2;
      grid-column: 3/4;
    }
    &__item4 {
      grid-row: 2/3;
      grid-column: 3/4;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  /**
  药店标签
   */
  .shop {
    padding: 5px 20px;
    display: flex;
    align-items: flex-end;
    &__name {
      font-size: 30px;
    }
  }
  /**
  处方标签
   */
  .rx {
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__left {
      display: flex;
      align-items: flex-end;
    }
    &__name {
      font-size: 25px;
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
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initData();
      });
    },
    created() {
    },
    mounted() {
    },
    methods: {
      async onRefresh() {
        await this.initData();
        this.isLoading = false;
      },
      async initData() {
        this.$loading();
        const data = await this.$http.get('/carts');
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
      changeQuantity(cartDrug, cartShop) {
        this.$http.put(`/carts/${cartDrug.cartId}?quantity=${cartDrug.quantity}`);
        this.calculate(cartShop);
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
        this.$toast.loading({ duration: 0, forbidClick: true, message: '结算中' });
        const data = await this.$http.get(`/orders/cart?cartIds=${cartIds}&isRx=${isRx}`);
        this.$router.push({ name: '/orders/create/fromCart', params: { cartShop: data, isRx: isRx } });
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

